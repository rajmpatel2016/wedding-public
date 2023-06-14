import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import * as Contacts from "expo-contacts";

// Assets
import { Ionicons } from "@expo/vector-icons";

// Components
import { useNavigation } from "expo-router";
import { AddGuestFromContactList } from "./addGuestFromContactList";
import CustomDial from "../../../components/CustomDial";
import CustomModal from "../../../components/CustomModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomTextInput from "../../../components/CustomTextInput";
import GuestsFilters from "./guestsFilters";

// Containers
import { ApiContainer } from "../../../container/container";

export const Guests = () => {
  const guestContainer = ApiContainer.useContainer();
  const mealResponsesContainer = ApiContainer.useContainer();

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [guestList, setGuestList] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectStatus, setSelectStatus] = useState(false);
  const [guestsFilter, setGuestsFilter] = useState(false);
  const [guestsFiltered, setGuestsFiltered] = useState(guestContainer.guests);
  const [mealItem, setMealItem] = useState(
    mealResponsesContainer.meals.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  );
  const [guest, setGuest] = useState("");
  const navigation = useNavigation();

  const filterGuests = (value) => {
    const guestsFilteredNow = guestsFiltered.filter(
      (item) => item.name && item.name.indexOf(value) !== -1
    );
    setGuestsFiltered(guestsFilteredNow);
  };

  const selectGuest = (guest) => {
    guestContainer.setSelectedGuest(guest);
    navigation.navigate("guestIndividuals", {});
  };

  useEffect(() => {
    guestContainer.getGuestByWeddingId();
    mealResponsesContainer.getMealsByWeddingId();
  }, []);

  useEffect(() => {
    setMealItem(
      mealResponsesContainer.meals.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    );
  }, [mealResponsesContainer.meals]);

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

  return (
    <ImageBackground
      source={require("../../../assets/bg.png")}
      style={{
        width: "100%",
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: "white",
        paddingTop: 116,
      }}
    >
      <Text style={styles.guestsText}>Guests</Text>
      <View style={{ height: "100%" }}>
        <CustomTextInput
          customStyles={styles.shadow}
          placeholder=""
          value={guest}
          onChange={(value) => filterGuests(value)}
          leftIcon={<Ionicons name="ios-search" size={24} color="black" />}
          rightIcon={
            <TouchableOpacity onPress={() => setGuestsFilter(true)}>
              <Ionicons name="filter-sharp" size={24} color="black" />
            </TouchableOpacity>
          }
        ></CustomTextInput>

        <Pressable
          onPress={() => setGuestList(true)}
          style={styles.cardContainer}
        >
          <View>
            <Text style={{ fontWeight: "600", fontSize: 14 }}>
              Add to your guest list
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                color: "#667080",
                marginTop: 4,
              }}
            >
              Add your phone contacts to your{"\n"}wedding guest list.
            </Text>
          </View>
          <Image
            style={{
              height: 75,
              width: 105,
              left: 30,
            }}
            source={require("../../../assets/handsPhone.png")}
          />
        </Pressable>
        <ScrollView style={{ flex: 1, paddingBottom: 90, paddingTop: 10 }}>
          <View style={{ marginBottom: 90 }}>
            {guestsFiltered.length === 0
              ? guestContainer.guests
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((guest) => (
                    <View style={styles.guestContainer}>
                      <View style={styles.guestContent}>
                        <View style={styles.guestPhoto} />
                        <Text style={styles.guestName}>{guest.name}</Text>
                      </View>
                      <Pressable onPress={() => selectGuest(guest)}>
                        <Text style={styles.guestEdit}>Edit</Text>
                      </Pressable>
                    </View>
                  ))
              : guestsFiltered.map((guest) => (
                  <View style={styles.guestContainer}>
                    <View style={styles.guestContent}>
                      <View style={styles.guestPhoto} />
                      <Text style={styles.guestName}>{guest.name}</Text>
                    </View>
                    <Pressable onPress={() => selectGuest(guest)}>
                      <Text style={styles.guestEdit}>Edit</Text>
                    </Pressable>
                  </View>
                ))}
          </View>
        </ScrollView>
      </View>
      <CustomDial route="/tabs/guests/addGuest" />
      <AddGuestFromContactList
        close={() => setGuestList(false)}
        open={guestList}
      />
      <CustomModal
        customStyles={{ height: "53%" }}
        open={guestsFilter}
        close={() => setGuestsFilter(false)}
        title="Filters"
      >
        <GuestsFilters />
      </CustomModal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  guestsText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000000DE",
    marginBottom: 24,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 7,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 9,
    alignItems: "center",
  },
  guestContainer: {
    display: "flex",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  guestContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  guestPhoto: {
    width: 63,
    height: 63,
    backgroundColor: "#D9D9D9",
    borderRadius: "50%",
  },
  guestName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000DE",
  },
  guestEdit: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  shadow: {
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 9,
  },
});

export default Guests;
