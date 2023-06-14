import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Assets
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import { Tabs } from "expo-router";
import CustomPopUp from "../../components/CustomPopUp";
import CustomButton from "../../components/CustomButton";

export const LayoutTabs = () => {
  return (
    <>
      <CustomPopUp open={true}>
        <View style={styles.popupContainer}>
          <Image
            style={{ height: 130, width: 184 }}
            source={require("../../assets/humans2.png")}
          />
          <Text style={styles.popupTitle}>Assign your guests +1s</Text>
          <Text style={styles.popupContent}>
            Tap the Guests tab and each guest’s name to assign them +1s. Guests
            will receive tailored messages depending on how many +1s you assign.
          </Text>
          <View style={{ marginTop: 20, width: "100%", paddingHorizontal: 20 }}>
            <CustomButton title="Create reminders" />
          </View>
        </View>
      </CustomPopUp>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarIcon: () => (
              <SimpleLineIcons name="home" size={24} color="gray" />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="message-processing-outline"
                size={24}
                color="gray"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="guests"
          options={{
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarIcon: () => <Feather name="users" size={24} color="gray" />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarIcon: () => (
              <Ionicons name="ios-settings-outline" size={24} color="gray" />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 70,
    paddingLeft: 24,
    paddingRight: 43,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 33,
    backgroundColor: "white",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#667080",
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    gap: 19,
    backgroundColor: "white",
  },
  popupContainer: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  popupContent: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: "#667080",
  },
});

export default LayoutTabs;
