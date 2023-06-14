import React from "react";
import { Text, StyleSheet, View } from "react-native";

// Components
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import Container from "../../components/Container";

export const ResetPassword = () => {
  return (
    <Container link="onboarding/enterCode">
      <Text style={styles.title}>Reset your password</Text>
      <View style={styles.container}>
        <CustomTextInput placeholder="New password" />
        <CustomButton title="Reset Password" />
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

export default ResetPassword;
