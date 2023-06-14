import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

// Components
import Container from "../../components/Container";
import { Link } from "expo-router";
import CustomButton from "../../components/CustomButton";

export const Attending = () => {
  return (
    <Container link="onboarding/weddingDate">
      <Text style={styles.title}>Who will be attending?</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Upload your contacts to start building your wedding guest list.
        </Text>
        <CustomButton link="onboarding/addContacts" title="Next" />
        <Link href="onboarding/rsvps" asChild>
          <Pressable style={styles.link}>
            <Text style={{ textAlign: "center" }}>I don't know yet</Text>
          </Pressable>
        </Link>
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
});

export default Attending;
