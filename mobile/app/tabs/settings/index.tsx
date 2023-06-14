import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";

// Components
import EditPhoneNumber from "../../../components/EditPhoneNumber";
import EditEmail from "../../../components/EditEmail";
import EditDate from "../../../components/EditDate";
import EditLocation from "../../../components/EditLocation";
import EditTime from "../../../components/EditTime";

// Containers
import { ApiContainer } from "../../../container/container";

export const Settings = () => {
  const [emailModal, setEmailModal] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);

  const weddingContainer = ApiContainer.useContainer();
  const userContainer = ApiContainer.useContainer();

  const getDateFormatted = () => {
    const weddingDate = weddingContainer.wedding.date;
    if (!weddingDate) return "No date";
    const todays = new Date(parseInt(userContainer.wedding.date));
    return todays.toLocaleDateString("en-US", {
      dateStyle: "full",
    });
  };

  const getTimeFormatted = () => {
    const weddingTime = userContainer.wedding.time;
    if (!weddingTime) return "No time";
    const newTime = new Date(parseInt(weddingTime));
    return newTime.toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
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
      <ScrollView>
        <Text style={styles.settingsText}>Settings</Text>
        <Text style={styles.subtitle}>Personal information</Text>
        <View style={styles.topicContainer}>
          <Text style={styles.topicTitle}>Name</Text>
          <View>
            <Text>
              {userContainer.user.firstName + " " + userContainer.user.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Email</Text>
            <Pressable onPress={() => setEmailModal(true)}>
              <Text style={styles.topicEdit}>Edit</Text>
            </Pressable>
          </View>
          <View>
            <Text>{userContainer.user.email}</Text>
          </View>
        </View>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Phone number</Text>
            <Pressable onPress={() => setPhoneModal(true)}>
              <Text style={styles.topicEdit}>Edit</Text>
            </Pressable>
          </View>
          <View>
            <Text>{userContainer.user.phone}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Wedding information</Text>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Date</Text>
            <Pressable onPress={() => setDateModal(true)}>
              <Text style={styles.topicEdit}>Edit</Text>
            </Pressable>
          </View>
          <View>
            <Text>{getDateFormatted()}</Text>
          </View>
        </View>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Time</Text>
            <View>
              <Pressable onPress={() => setTimeModal(true)}>
                <Text style={styles.topicEdit}>Edit</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text>{getTimeFormatted()}</Text>
          </View>
        </View>
        <View style={styles.topicContainer}>
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Location</Text>
            <View>
              <Pressable onPress={() => setLocationModal(true)}>
                <Text style={styles.topicEdit}>Edit</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text>{weddingContainer.wedding.address}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Payment information</Text>
        <View
          style={(styles.topicContainer, { borderWidth: 0, marginTop: 16 })}
        >
          <View style={styles.editableTopic}>
            <Text style={styles.topicTitle}>Text package</Text>
            <Text style={styles.topicEdit}>Edit</Text>
          </View>
          <View style={styles.topicText}>
            <Text>$100/Wedding for up to 250 guests</Text>
          </View>
        </View>
      </ScrollView>
      <EditEmail open={emailModal} close={() => setEmailModal(false)} />
      <EditPhoneNumber open={phoneModal} close={() => setPhoneModal(false)} />
      <EditDate
        time={weddingContainer.wedding.time}
        open={dateModal}
        close={() => setDateModal(false)}
      />
      <EditTime
        open={timeModal}
        close={() => setTimeModal(false)}
        time={weddingContainer.wedding.time}
      />
      <EditLocation
        open={locationModal}
        close={() => setLocationModal(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  settingsText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000000DE",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginTop: 24,
  },
  topicContainer: {
    marginTop: 16,
    paddingBottom: 16,
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
});

export default Settings;
