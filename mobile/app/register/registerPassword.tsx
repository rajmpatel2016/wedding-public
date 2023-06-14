import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Components
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import Container from "../../components/Container";

// Containers
import { ApiContainer } from "../../container/container";

export const RegisterPassword = () => {
  const userContainer = ApiContainer.useContainer();

  return (
    <Container link="register/registerEmail">
      <Text style={styles.title}>Choose a password </Text>
      <View style={styles.container}>
        <CustomTextInput
          password={true}
          value={userContainer.user.password}
          placeholder="Password"
          onChange={(value) => {
            userContainer.setUser({
              ...userContainer.user,
              password: value,
            });
          }}
        />
      </View>
      <View>
        <CustomButton
          title="Next"
          onPress={() => userContainer.registerUser()}
        />
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
    marginBottom: 25,
  },
});

export default RegisterPassword;
