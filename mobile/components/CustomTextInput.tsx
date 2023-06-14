import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomTextInputProps {
  placeholder?: string;
  onChange?: () => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  password?: boolean;
  keyboardType?: string;
  error?: string;
  value?: string;
  validation?: boolean;
  customStyles?: any;
  maxLength?: number;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  onChange,
  rightIcon,
  password,
  keyboardType,
  leftIcon,
  error,
  customStyles = {},
  validation,
  maxLength,
  value,
}) => {
  return (
    <>
      <View
        style={{
          ...styles.inputContainer,
          ...customStyles,
          borderColor: validation ? "#FF2B2B" : "rgba(0, 0, 0, 0.38)",
        }}
      >
        {leftIcon && (
          <View
            style={{
              width: "8%",
              marginLeft: 20,
            }}
          >
            {leftIcon}
          </View>
        )}

        <TextInput
          placeholderTextColor="#667080"
          style={{
            ...styles.input,
            width:
              rightIcon && !leftIcon
                ? "88%"
                : leftIcon && !rightIcon
                ? "86%"
                : leftIcon && rightIcon
                ? "74%"
                : "100%",
          }}
          placeholder={placeholder}
          onChangeText={onChange}
          secureTextEntry={password}
          keyboardType={keyboardType} //ver erro
          maxLength={maxLength}
          value={value}
          autoCapitalize="sentences"
        />
        {rightIcon && (
          <View
            style={{
              width: "70%",
              marginLeft: -0,
            }}
          >
            {rightIcon}
          </View>
        )}
      </View>
      {validation && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Ionicons name="alert-circle" size={24} color="#FF2B2B" />
          <Text
            style={{
              textAlign: "center",
              color: "#FF2B2B",
              fontSize: 12,
            }}
          >
            {error}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    flexShrink: 1,
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 4,
    paddingVertical: 20,
    paddingLeft: 16,
    paddingRight: 12,
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
});

export default CustomTextInput;
