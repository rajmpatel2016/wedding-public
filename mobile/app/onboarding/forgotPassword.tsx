import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

// Components
import { useNavigation } from "expo-router";
import { TextInputMask } from "react-native-masked-text";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";

export const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const verifyPhone = () => {
    navigation.navigate("enterCode", {});
  };

  return (
    <Container link="onboarding">
      <Text style={styles.title}>Forgot Password?</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Enter your phone number to receive a one-time code to reset your
          password.
        </Text>
        <TextInputMask
          style={styles.input}
          type={"custom"}
          options={{
            mask: "+9 999 999 9999",
          }}
          keyboardType="numeric"
          placeholderTextColor="#667080"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <CustomButton onPress={verifyPhone} title="Send text" />
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
  input: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.38)",
    borderRadius: 4,
    height: 55,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    paddingLeft: 10,
    color: "black",
    width: "100%",
    backgroundColor: "white",
  },
});

export default ForgotPassword;
