import React from "react";
import { Text, View, StyleSheet } from "react-native";

// Components
import { TextInputMask } from "react-native-masked-text";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";

// Containers
import { ApiContainer } from "../../container/container";

export const PhoneNumber = () => {
  const userContainer = ApiContainer.useContainer();

  return (
    <Container link="/onboarding">
      <Text style={styles.title}>What's your phone number?</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Enter the mobile number you would like associated with your account.
        </Text>

        <TextInputMask
          style={styles.input}
          type={"custom"}
          options={{
            mask: "+9 999 999 9999",
          }}
          keyboardType="numeric"
          placeholder="Phone number"
          placeholderTextColor="#667080"
          value={userContainer.user.phone}
          onChangeText={(value) =>
            userContainer.setUser({ ...userContainer.user, phone: value })
          }
        />
        <CustomButton onPress={() => userContainer.editUser()} title="Next" />
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
  container: {
    display: "flex",
    gap: 27,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
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

export default PhoneNumber;
