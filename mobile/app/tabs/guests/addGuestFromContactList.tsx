import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

// Assets
import { Ionicons } from "@expo/vector-icons";

// Components
import CustomModal from "../../../components/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import Checkbox from "../../../components/Checkbox";
import CustomButton from "../../../components/CustomButton";

// Containers
import { ApiContainer } from "../../../container/container";

interface AddGuestFromContactListProps {
  open?: boolean;
  close?: () => void;
}

export const AddGuestFromContactList: React.FC<
  AddGuestFromContactListProps
> = ({ open, close }) => {
  const [contact, setContact] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const guestContainer = ApiContainer.useContainer();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.LastName,
        });
        if (data.length > 0) {
          setFilteredDataSource(data);
        }
      }
    })();
  }, []);

  const createGuests = () => {
    guestContainer.createGuestBatch(selectedContacts, "", close);
  };

  const filteredContactList = filteredDataSource.filter((item) => {
    const match = guestContainer.guests.find(
      (guest) =>
        guest &&
        item.phoneNumbers?.length > 0 &&
        guest.phoneNumber === item.phoneNumbers[0].digits
    );
    return (
      !match &&
      item.name &&
      item.name.toLowerCase().indexOf(contact.toLowerCase()) !== -1
    );
  });

  const handleCheckbox = (position: number) => {
    const selectedUserIndex = selectedContacts.findIndex(
      (item) => item.id === filteredContactList[position].id
    );
    if (selectedUserIndex !== -1) {
      const newSelected = [...selectedContacts];

      newSelected.splice(selectedUserIndex, 1);
      setSelectedContacts(newSelected);
    } else {
      setSelectedContacts([...selectedContacts, filteredContactList[position]]);
    }
  };

  return (
    <CustomModal close={close} title="Add to your guest list" open={open}>
      <View>
        <CustomTextInput
          customStyles={styles.shadow}
          placeholder=""
          value={contact}
          onChange={(value) => setContact(value)}
          leftIcon={<Ionicons name="ios-search" size={24} color="black" />}
        />
      </View>
      <FlatList
        style={{
          width: "100%",
          marginTop: 30,
          marginBottom: 70,
        }}
        data={filteredContactList.sort((a, b) => (a.name > b.name ? 1 : -1))}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <>
              <Checkbox
                onClick={() => handleCheckbox(index)}
                text={item.name}
                clicked={
                  selectedContacts.find(
                    (element: any) => element.id === item.id
                  )
                    ? true
                    : false
                }
              />
            </>
          );
        }}
      />
      <CustomButton
        title="Done"
        onPress={() => {
          createGuests();
        }}
        customStyles={styles.floatButton}
      />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 9,
  },
  floatButton: {
    display: "flex",
    position: "absolute",
    bottom: 10,
    left: 20,
  },
});
