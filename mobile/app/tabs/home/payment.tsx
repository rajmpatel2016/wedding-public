import React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";

//Assets
import { AntDesign } from "@expo/vector-icons";

// Components
import Container from "../../../components/Container";
import { Link } from "expo-router";

export const Payment = () => {
  return (
    <Container link="/tabs/home/">
      <View style={styles.container}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Image
            style={{ height: 127, width: 175 }}
            source={require("../../../assets/stuckatHome.png")}
          />
        </View>
        <View>
          <Text style={styles.title}>Complete your{"\n"}payment</Text>
          <Text style={styles.description}>
            Your one-time payment includes a dedicated phone number and
            unlimited groups and messages.
          </Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Select your text package</Text>
          <Link href="/tabs/home/finishPayment" asChild>
            <Pressable style={styles.box}>
              <View>
                <Text style={styles.boxTitle}>$100/Wedding</Text>
                <Text style={styles.boxDescription}>
                  unlimited messages for up to 250 guests
                </Text>
              </View>
              <AntDesign name="right" size={18} color="black" />
            </Pressable>
          </Link>
          <Link href="/tabs/home/finishPaymentPlus" asChild>
            <Pressable style={styles.box}>
              <View>
                <Text style={styles.boxTitle}>$150/Wedding</Text>
                <Text style={styles.boxDescription}>
                  unlimited messages for 250+ guests
                </Text>
              </View>
              <AntDesign name="right" size={18} color="black" />
            </Pressable>
          </Link>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 27,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 36,
    marginTop: 16,
  },
  description: {
    fontWeight: "400",
    fontSize: 16,
    marginTop: 15,
    color: "black",
  },
  subtitle: {
    fontWeight: "600",
    fontSize: 20,
  },
  box: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 9,
  },
  boxTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  boxDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#667080",
    marginTop: 2,
  },
});

export default Payment;
