import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

// Components
import { Link } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import Container from "../../components/Container";

// Containers
import { ApiContainer } from "../../container/container";

export const Location = () => {
  const weddingContainer = ApiContainer.useContainer();
  const [address, setAddress] = useState("");

  return (
    <Container link="onboarding/phoneNumber">
      <Text style={styles.title}>Where is your wedding located?</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Enter your wedding location. You can always change these details
          later.
        </Text>
        <CustomTextInput
          value={address}
          onChange={(value) => setAddress(value)}
          placeholder="Location"
        />

        <CustomButton
          onPress={() => weddingContainer.updateWeddingAddress({ address })}
          title="Next"
        />
        <Link style={styles.link} href="onboarding/weddingDate" asChild>
          <Pressable>
            <Text style={{ textAlign: "center" }}>I don't know yet</Text>
          </Pressable>
        </Link>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 38,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  container: {
    display: "flex",
    gap: 18,
    marginTop: 16,
  },
  link: {
    textAlign: "center",
    marginTop: 9,
  },
});

export default Location;
