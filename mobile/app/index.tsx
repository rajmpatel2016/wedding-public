import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";

// Components
import { Link } from "expo-router";

export const FirstPage = () => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/startBg.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}>WedLinks.</Text>
        <View style={{ display: "flex", gap: 8 }}>
          <Link style={{ width: "100%" }} href="/register/registerName" asChild>
            <Pressable style={styles.buttonStarted}>
              <Text style={styles.buttonStartedTitle}>Get started</Text>
            </Pressable>
          </Link>
          <Link style={{ width: "100%" }} href="/onboarding" asChild>
            <Pressable style={styles.buttonLogin}>
              <Text style={styles.buttonLoginTitle}>Log in</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingLeft: 21,
    paddingRight: 21,
    paddingBottom: 30,
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  buttonStarted: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 13,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  buttonStartedTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#019592",
    textAlign: "center",
  },
  buttonLogin: {
    width: "100%",
    backgroundColor: "#4db5b3",
    paddingVertical: 13,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  buttonLoginTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});

export default FirstPage;
