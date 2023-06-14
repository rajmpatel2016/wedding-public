import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Assets
import { Ionicons } from "@expo/vector-icons";

// Components
import { Link } from "expo-router";
import CustomIcon from "../../../components/CustomIcon";

// Containers
import { ApiContainer } from "../../../container/container";

export const Home = () => {
  const messageGroupContainer = ApiContainer.useContainer();
  const groupGuestContainer = ApiContainer.useContainer();
  const groupContainer = ApiContainer.useContainer();
  const guestContainer = ApiContainer.useContainer();
  const userContainer = ApiContainer.useContainer();

  useEffect(() => {
    groupGuestContainer.getGroupGuest();
    messageGroupContainer.getMessageGroup();
    groupContainer.getGroupByWeddingId();
    guestContainer.getGuestByWeddingId();
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
      <Text style={styles.userText}>
        {userContainer.user.firstName} {userContainer.user.lastName}
      </Text>

      <Text style={styles.title}>Wedding overview</Text>
      <>
        <View style={{ display: "flex", flexDirection: "row", gap: 23 }}>
          <Link href="/tabs/guests/" asChild>
            <Pressable style={styles.smallBox}>
              <Text style={styles.smallbBoxTitle}>
                {guestContainer.guests.length}
              </Text>
              <Text style={styles.smallBoxText}>Guests</Text>
            </Pressable>
          </Link>
          <Link href="/tabs/messages/" asChild>
            <Pressable style={styles.smallBox}>
              <Text style={styles.smallbBoxTitle}>
                {messageGroupContainer.messageGroup.length}
              </Text>
              <Text style={styles.smallBoxText}>Messages</Text>
            </Pressable>
          </Link>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 23 }}>
          <Link href="/tabs/home/textGroups" asChild>
            <Pressable style={styles.textGroup}>
              <View style={styles.smallBox}>
                <Text style={styles.smallbBoxTitle}>
                  {groupContainer.groups.length}
                </Text>
                <Text style={styles.smallBoxText}>Text groups</Text>
              </View>
            </Pressable>
          </Link>
          <View style={styles.smallBox}>
            <CustomIcon>
              <Ionicons name="md-checkmark-sharp" size={22} color="white" />
            </CustomIcon>
            <Text style={styles.smallBoxText}>Wedding status</Text>
          </View>
        </View>
      </>
      <Text style={styles.boxTitle}>Get started!</Text>
      <Link href="/tabs/home/payment" asChild>
        <Pressable style={styles.box}>
          <View>
            <Text style={styles.boxText}>Complete your payment</Text>
            <Text style={{ marginTop: 4, color: "#667080DE" }}>
              It's simple to your payment{"\n"}setup so you can start
              {"\n"}
              messaging.
            </Text>
          </View>
          <Image
            style={{ height: 75, width: 105 }}
            source={require("../../../assets/stuckatHome.png")}
          />
        </Pressable>
      </Link>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  userText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000000DE",
  },
  title: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
    height: "auto",
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    justifyContent: "space-between",
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 9,
  },
  boxTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 65,
    marginBottom: 16,
  },
  boxText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000DE",
  },
  smallBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
    flexShrink: 1,
    backgroundColor: "white",
    paddingTop: 37,
    paddingLeft: 12,
    paddingBottom: 8,
    borderRadius: 16,
    marginTop: 24,
    justifyContent: "space-between",
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 9,
  },
  smallbBoxTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#000000DE",
  },
  smallBoxText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#667080",
  },
  textGroup: {
    display: "flex",
    width: "100%",
    height: "auto",
    flexShrink: 1,
    borderRadius: 16,
    justifyContent: "space-between",
  },
});

export default Home;
