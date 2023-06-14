import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import * as Contacts from "expo-contacts";

// Components
import CustomButton from "../../components/CustomButton";
import Checkbox from "../../components/Checkbox";
import Container from "../../components/Container";
import CustomTextInput from "../../components/CustomTextInput";

// Assets
import { Ionicons } from "@expo/vector-icons";

// Containers
import { ApiContainer } from "../../container/container";

interface addContactsProps {
  name: string;
  position: number;
  onClick: () => void;
  clicked: boolean;
  id: string | number;
}

export const addContacts: React.FC<addContactsProps> = ({
  onClick,
  clicked,
  name,
  position,
}) => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [search, setSearch] = useState("");
  const guestContainer = ApiContainer.useContainer();
  const [selectStatus, setSelectStatus] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.LastName,
        });
        const items = data.filter(
          (item) => item.phoneNumbers && item.phoneNumbers.length > 0
        );
        if (data.length > 0) {
          setFilteredDataSource(items);
          setContacts(items);
          setSelectStatus(true);
        }
      }
    })();
  }, []);

  const handleCheckbox = (position: number) => {
    const selectedUserIndex = selectedContacts.findIndex(
      (item) => item.id === contactsFilter[position].id
    );

    if (selectedUserIndex !== -1) {
      const newSelected = [...selectedContacts];

      newSelected.splice(selectedUserIndex, 1);
      setSelectedContacts(newSelected);
    } else {
      setSelectedContacts([...selectedContacts, contactsFilter[position]]);
    }
  };

  const createGuests = () => {
    guestContainer.createGuestBatch(selectedContacts, "rsvps");
  };

  const contactsFilter = filteredDataSource.filter((item) => {
    return (
      item.name && item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });

  return (
    <Container link="/onboarding/attending">
      <View style={styles.container}>
        <Text style={styles.title}>Create your guest list</Text>
        <Text style={styles.subtitle}>
          Select contacts from your phone to add to your wedding guest list.
        </Text>
        <View>
          <CustomTextInput
            placeholder="Search contact"
            leftIcon={<Ionicons name="ios-search" size={24} color="black" />}
            onChange={(value) => setSearch(value)}
            value={search}
          />
        </View>
        <FlatList
          style={{
            height: "100%",
            width: "100%",
            marginTop: 20,
          }}
          data={contactsFilter.sort((a, b) => (a.name > b.name ? 1 : -1))}
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
        <View style={{ height: 160 }} />
      </View>
      <View style={styles.button}>
        <CustomButton onPress={createGuests} title="Next" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: "10%",
    minHeight: "100%",
    gap: 10,
    flex: 1,
  },
  title: {
    color: "black",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    width: 250,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  button: {
    width: "100%",
    height: 50,
    position: "absolute",
    bottom: "3%",
    left: "5%",
    zIndex: 880,
  },
});

export default addContacts;
