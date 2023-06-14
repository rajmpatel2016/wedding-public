import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

// Components
import { Link } from "expo-router";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";

// Containers
import { ApiContainer } from "../../container/container";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };

  const userContainer = ApiContainer.useContainer();

  const login = () => {
    userContainer.login({ email: email.toLowerCase(), password });
  };

  return (
    <Container link="../">
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>
        <View style={styles.contentContainer}>
          <CustomTextInput
            placeholder="Email"
            onChange={(value) => onChangeEmail(value)}
            value={email}
          />
          <View style={styles.alert}>
            <CustomTextInput
              password={true}
              placeholder="Password"
              onChange={(value) => onChangePassword(value)}
              value={password}
              error="Wrong email or password"
              validation={userContainer.loginError}
            />
          </View>
          <CustomButton title="Sign In" onPress={login} />
          <Link href="onboarding/forgotPassword" asChild>
            <Pressable>
              <Text>Forgot Password</Text>
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
    alignItems: "center",
    width: "100%",
    gap: 74,
    marginTop: 84,
    flex: 1,
  },
  container10: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 38,
  },
  contentContainer: {
    width: "100%",
    gap: 20,
    display: "flex",
    alignItems: "center",
  },
  alert: {
    width: "100%",
    gap: 20,
    display: "flex",
    justifyContent: "center",
  },
  iconAlert: {
    paddingTop: 0,
  },
});

export default SignIn;
