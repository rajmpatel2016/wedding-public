import React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface CustomDateTimePickerProps {
  value: Date;
  mode: "time" | "date";
  onChange: () => void;
  openPicker: () => void;
  open: boolean;
  closePicker: () => void;
  display?: "spinner" | "default" | "compact" | "inline" | "clock" | "calendar";
  customPickerStyles?: any;
  text: string;
}

export const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value,
  mode,
  onChange,
  openPicker,
  open,
  closePicker,
  display = "spinner",
  customPickerStyles = {},
  text = "",
}) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={openPicker}>
        <Text>
          {(text
            ? text
            : value && mode === "date"
            ? value.toLocaleDateString("en-US", {
                dateStyle: "full",
              })
            : value.toLocaleTimeString("en-US", {
                timeStyle: "short",
              })) || ""}
        </Text>
      </TouchableOpacity>
      {open && (
        <View style={{ ...styles.picker, ...customPickerStyles }}>
          <View style={styles.pickerHeader}>
            <TouchableOpacity onPress={closePicker}>
              <Text style={styles.headerButton}>Done</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <DateTimePicker
              display={display}
              testID="dateTimePicker"
              value={value}
              mode={mode}
              is24Hour={false}
              onChange={onChange}
              textColor="black"
              locale="en-US"
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
  picker: {
    display: "flex",
    position: "absolute",
    zIndex: 1000,
    bottom: 20,
    width: "100%",
    borderTopWidth: 1,
    paddingTop: 10,
    // backgroundColor: 'white',
  },
  pickerHeader: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    paddingRight: 5,
  },
  headerButton: {
    textAlign: "right",
    fontSize: 20,
    color: "black",
  },
});

export default CustomDateTimePicker;
