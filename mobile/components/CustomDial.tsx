import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Link } from "expo-router";

interface CustomDialProps {
  route: string;
}

export const CustomDial: React.FC<CustomDialProps> = ({ route }) => {
  return (
    <Link href={route} asChild={true}>
      <Pressable style={styles.container}>
        <Fontisto name="plus-a" size={18} color="white" />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 20,
    // bottom: 40,
    // left: 305,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#019592",
    borderRadius: "50%",
    width: 56,
    height: 56,
  },
});

export default CustomDial;
