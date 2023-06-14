import React from "react";
import { Link } from "expo-router";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: React.ReactNode;
  link?: string;
  onPress?: () => void;
  customStyles?: any;
  disabled?: boolean;
  close?: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  link,
  onPress,
  customStyles = {},
  disabled,
}) => {
  return (
    <>
      {link ? (
        <Link
          style={{
            ...styles.button,
            ...customStyles,
          }}
          href={link}
          asChild
        >
          <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={{
              ...styles.button,
              ...customStyles,
            }}
          >
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        </Link>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={{
            ...styles.button,
            ...customStyles,
            backgroundColor: disabled ? "#E5E5E5" : "#019592",
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#019592",
    paddingVertical: 16,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default CustomButton;
