import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

// Components
import { useNavigation } from "expo-router";
import Container from "../../components/Container";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

export const EnterCode = () => {
  const [code, setCode] = useState("");
  const navigation = useNavigation();

  const verifyCode = () => {
    navigation.navigate("resetPassword", {});
  };

  return (
    <Container link="onboarding/forgotPassword">
      <Text style={styles.title}>Enter code</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Enter the one-time code you received in your text messages.
        </Text>
        <CustomTextInput
          placeholder="Code"
          onChange={(value) => setCode(value)}
          value={code}
        />
        <CustomButton onPress={verifyCode} title="Confirm code" />
        <Text style={{ textAlign: "center" }}>Resend code</Text>
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
    marginTop: 20,
    marginBottom: 25,
  },
});

export default EnterCode;
