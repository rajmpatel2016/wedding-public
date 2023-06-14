import React from "react";
import { Text, StyleSheet, View } from "react-native";

// Components
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";

export const Finish = () => {
  return (
    <Container link="onboarding/schedulingGroup">
      <Text style={styles.title}>Start using WedLinks for free</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Start your free 30-day trial period with us to begin creating your
          wedding communications.
        </Text>
        <CustomButton link="tabs" title="Next" />
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

export default Finish;
