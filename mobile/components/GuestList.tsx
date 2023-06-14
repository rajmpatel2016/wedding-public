import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Components
import { ApiContainer } from "../container/container";
import CustomButton from "./CustomButton";
import Checkbox from "./Checkbox";
import * as Contacts from "expo-contacts";
import Container from "./Container";

export const GuestList = () => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const container = ApiContainer.useContainer();
  const [selectStatus, setSelectStatus] = useState(false);

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
          setContacts(data);
          setSelectStatus(true);
        }
      }
    })();
  }, []);

  const handleCheckbox = (position: number) => {
    const selectedUserIndex = selectedContacts.findIndex(
      (item) => item.id === filteredDataSource[position].id
    );
    if (selectedUserIndex !== -1) {
      const newSelected = [...selectedContacts];

      newSelected.splice(selectedUserIndex, 1);
      setSelectedContacts(newSelected);
    } else {
      setSelectedContacts([...selectedContacts, filteredDataSource[position]]);
    }
  };

  const createGuests = () => {
    container.createGuestBatch(selectedContacts);
  };

  return (
    <Container link="/onboarding/attending">
      <View style={styles.container}>
        <Text style={styles.title}>Create your guest list</Text>
        <Text style={styles.subtitle}>
          Select contacts from your phone to add to your wedding guest list.
        </Text>

        <View>
          <FlatList
            style={{
              width: "100%",
              marginTop: 20,
            }}
            data={filteredDataSource}
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
        </View>
      </View>
      <View style={styles.button}>
        <CustomButton onPress={createGuests} title="Next" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  Container2: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
    width: "100%",
  },
  container: {
    display: "flex",
    paddingTop: "10%",
    minHeight: "100%",
    gap: 10,
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

export default GuestList;
