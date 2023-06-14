import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

// Components
import Container from "../../components/Container";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

// Containers
import { ApiContainer } from "../../container/container";

// Validations
import { regexEmail } from "../../validations/validations";

export const RegisterEmail = () => {
  const [emailValidation, setEmailValidation] = useState(false);
  const [email, setEmail] = useState("");
  const container = ApiContainer.useContainer();
  const navigation = useNavigation();

  const verifyFields = async () => {
    const response = await container.getUsersByEmail(email);
    if (!regexEmail.test(email) || response.data) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
      container.setUser({ ...container.user, email });
      navigation.navigate("registerPassword", {});
    }
  };

  const getMessage = () => {
    const isValid = email.indexOf("@") !== -1 && email.indexOf(".") !== -1;
    return !isValid
      ? "Please enter a valid email address"
      : "This email already exist";
  };

  console.log("render", emailValidation);

  return (
    <Container link="register/registerName">
      <Text style={styles.title}>What's your email?</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Enter the email you’d like to use to log in.
        </Text>
        <CustomTextInput
          validation={emailValidation}
          value={email}
          placeholder="Email"
          onChange={(value) => {
            setEmailValidation(false);
            setEmail(value);
          }}
          error={getMessage()}
        />
      </View>
      <CustomButton
        onPress={verifyFields}
        title="Next"
        disabled={emailValidation}
      />
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

export default RegisterEmail;
