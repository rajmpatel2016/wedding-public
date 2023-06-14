import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

// Components
import { useNavigation } from "expo-router";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";

// Containers
import { ApiContainer } from "../../container/container";

export const RegisterName = () => {
  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [secondNameValidation, setSecondNameValidation] = useState(false);
  const userContainer = ApiContainer.useContainer();
  const navigation = useNavigation();

  const verifyFields = () => {
    const firstNameValid = userContainer.user.firstName.length > 0;
    const lastNameValid = userContainer.user.lastName.length > 0;

    if (firstNameValid) {
      setFirstNameValidation(false);
    } else {
      setFirstNameValidation(true);
    }

    if (lastNameValid) {
      setSecondNameValidation(false);
    } else {
      setSecondNameValidation(true);
    }

    if (lastNameValid && lastNameValid) {
      navigation.navigate("registerEmail", {});
    }
  };

  return (
    <Container link="../">
      <Text style={styles.title}>What's your name?</Text>
      <View style={styles.container}>
        <CustomTextInput
          validation={firstNameValidation}
          value={userContainer.user.firstName}
          error="The First Name is incorrect"
          placeholder="First Name"
          onChange={(value) => {
            setFirstNameValidation(false);
            userContainer.setUser({
              ...userContainer.user,
              firstName: value,
            });
          }}
        />
        {!setFirstNameValidation && <Text>Not valid name</Text>}
        <CustomTextInput
          validation={secondNameValidation}
          value={userContainer.user.lastName}
          placeholder="Last name"
          error="The Second Name is incorrect"
          onChange={(value) => {
            setSecondNameValidation(false);
            userContainer.setUser({
              ...userContainer.user,
              lastName: value,
            });
          }}
        />
      </View>
      <CustomButton
        customStyles={{ marginTop: 25 }}
        onPress={verifyFields}
        title="Next"
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
    marginTop: 16,
  },
});

export default RegisterName;
