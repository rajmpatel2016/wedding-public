import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";

// Assets
import { Ionicons } from "@expo/vector-icons";

// Components
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomDial from "../../../components/CustomDial";
import { Link } from "expo-router";

export const Guests = () => {
  const [guest, setGuest] = useState("");
  const handleGuests = (value) => {
    setGuest(value);
  };

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
      <View>
        <CustomTextInput
          placeholder=""
          value={guest}
          iconRight={true}
          onChange={(value) => handleGuests(value)}
          rightIcon={
            <TouchableOpacity>
              <Ionicons name="filter-sharp" size={24} color="black" />
            </TouchableOpacity>
          }
        ></CustomTextInput>
        <View style={styles.cardContainer}>
          <View>
            <Text>Add to your guest list</Text>
            <Text>
              Add your phone contacts to your{"\n"}wedding guest list.
            </Text>
          </View>
          <Image
            style={{ height: 75, width: 105 }}
            source={require("../../../assets/handsPhone.png")}
          />
        </View>
        <ScrollView style={styles.listContainer}>
          <View style={styles.guestContainer}>
            <View style={styles.guestContent}>
              <View style={styles.guestPhoto} />
              <Text style={styles.guestName}>Lorem Ipsum</Text>
            </View>

            <Text style={styles.guestEdit}>Edit</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.filterContainer}></View>
      <CustomDial route="tabs/home" />
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
    paddingVertical: 20,
    borderRadius: 7,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  listContainer: {
    marginTop: 24,
  },
  boxText: {
    fontSize: 14,
    fontWeight: "600",
    color: "yellow",
  },
  guestContainer: {
    display: "flex",
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

  filterContainer: {
    flex: 1,
    zIndex: 222,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Guests;
