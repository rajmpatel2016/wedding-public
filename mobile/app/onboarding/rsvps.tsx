import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

// Components
import CustomButton from "../../components/CustomButton";
import Container from "../../components/Container";
import CustomRadio from "../../components/CustomRadio";

// Containers
import { ApiContainer } from "../../container/container";

export const Rsvps = () => {
  const myOptions = [{ option: "Yes" }, { option: "No" }];
  const [value, setValue] = useState("");
  const weddingContainer = ApiContainer.useContainer();

  return (
    <Container link="onboarding/addContacts">
      <Text style={styles.title}>Would you like to collect RSVPs?</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Select whether or not you would like to request RSVPs via text.
        </Text>
        {myOptions.map((item, index) => {
          return (
            <CustomRadio
              clicked={value === item.option}
              text={item.option}
              key={index}
              onClick={() => setValue(item.option)}
            />
          );
        })}
        <CustomButton
          onPress={() =>
            weddingContainer.updateWeddingRsvp({ rsvps: value === "Yes" })
          }
          title="Next"
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
    gap: 27,
    marginTop: 16,
  },
  link: {
    textAlign: "center",
  },
});

export default Rsvps;
