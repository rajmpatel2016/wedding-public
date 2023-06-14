import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

// Components
import Container from "../../../components/Container";
import EditNumberGuests from "../../../components/EditNumberGuests";
import EditRSVPs from "../../../components/EditRSVPs";
import EditMealOptions from "../../../components/EditMealOptions";
import EditGroup from "../../../components/EditGroup";
import EditAddress from "../../../components/EditAdress";
import EditPhoneNumberGuest from "../../../components/EditPhoneNumberGuest";

// Containers
import { ApiContainer } from "../../../container/container";

export const guestIndiviuals = () => {
  const [phoneModal, setPhoneModal] = useState(false);
  const [numberGuestsModal, setNumberGuestsModal] = useState(false);
  const [editRSVPsModal, setEditRSVPsModal] = useState(false);
  const [mealOptionsModal, setMealOptionsModal] = useState(false);
  const [EditGroupModal, setEditGroupModal] = useState(false);
  const [AddressModal, setAddressModal] = useState(false);

  const guestContainer = ApiContainer.useContainer();

  return (
    <Container link="/tabs/guests/">
      <View style={styles.container}>
        <Text style={styles.settingsText}>
          {guestContainer.selectedGuest.name}
        </Text>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Phone number</Text>
            <Pressable onPress={() => setPhoneModal(true)}>
              <Text style={styles.topicEdit}>Edit</Text>
            </Pressable>
          </View>
          <View>
            <Text>{guestContainer.selectedGuest.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Number of guests</Text>
            <Pressable onPress={() => setNumberGuestsModal(true)}>
              <Text style={styles.topicEdit}>Edit</Text>
            </Pressable>
          </View>
          <View>
            <Text>
              {guestContainer.selectedGuest.guests > 0
                ? guestContainer.selectedGuest.guests.toString()
                : "0"}
            </Text>
          </View>
        </View>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Group</Text>

            <Pressable onPress={() => setEditGroupModal(true)}>
              <Text style={styles.topicEdit}>Edit</Text>
            </Pressable>
          </View>
          <View>
            <Text>Bridesmaids 👑</Text>
          </View>
        </View>
        <View style={styles.lastTopic}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Address</Text>
            <Pressable onPress={() => setAddressModal(true)}>
              <Text style={styles.topicEdit}>Edit</Text>
            </Pressable>
          </View>
          <View>
            <Text>{guestContainer.selectedGuest.address}</Text>
          </View>
        </View>
      </View>

      <EditPhoneNumberGuest
        open={phoneModal}
        close={() => setPhoneModal(false)}
      />
      <EditNumberGuests
        open={numberGuestsModal}
        close={() => setNumberGuestsModal(false)}
      />
      <EditRSVPs open={editRSVPsModal} close={() => setEditRSVPsModal(false)} />
      <EditMealOptions
        open={mealOptionsModal}
        close={() => setMealOptionsModal(false)}
      />
      <EditGroup open={EditGroupModal} close={() => setEditGroupModal(false)} />
      <EditAddress open={AddressModal} close={() => setAddressModal(false)} />
      <View style={{ height: 20 }}></View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  settingsText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#000000DE",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginTop: 24,
  },
  topicContainer: {
    marginTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderColor: "#667080",
  },
  editableTopic: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#667080DE",
    marginBottom: 8,
    borderColor: "#66708040",
  },
  topicEdit: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  topicText: {
    paddingBottom: 50,
  },
  lastTopic: {
    marginTop: 30,
    paddingBottom: 30,
  },
  guest: {
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.38)",
    borderRadius: 4,
    height: 55,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: "24",
    paddingLeft: 10,
    color: "black",
    width: "100%",
    backgroundColor: "white",
  },
});

export default guestIndiviuals;
