import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface CustomTextAreaProps {
  placeholder: string;
  onChange: () => void;
  value: string;
}

export const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  placeholder,
  onChange,
  value,
}) => {
  const [showLinks, setShowLinks] = useState(false);

  const showItems = () => {
    setShowLinks(!showLinks);
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={(styles.input, { height: value.length === 0 ? 130 : 162 })}
          onChangeText={onChange}
          defaultValue={value}
          onClick={showItems}
        />
        {value.length === 0 && (
          <View>
            <Text>{placeholder}</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    flexShrink: 1,
    paddingVertical: 20,
    paddingLeft: 16,
    paddingRight: 12,
    borderColor: "rgba(0, 0, 0, 0.38)",
    gap: 15,
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
});

export default CustomTextArea;
