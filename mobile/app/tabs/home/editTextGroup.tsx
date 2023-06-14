import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import DropDownPicker from "react-native-dropdown-picker";

export const EditTextGroup = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Select all", value: "Guest" },
    { label: "Guest 1", value: "Guest1" },
    { label: "Guest 2", value: "Guest2" },
    { label: "Guest 3", value: "Guest3" },
    { label: "Guest 4", value: "Guest4" },
    { label: "Guest 5", value: "Guest5" },
    { label: "Guest 6", value: "Guest6" },
  ]);

  DropDownPicker.setMode("BADGE");

  return (
    <CustomModal title="" open={true}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Text group name</Text>
        <CustomTextInput placeholder="" />
        <Text style={styles.subtitle}>Guests</Text>
        <DropDownPicker
          multiple={true}
          min={0}
          max={50}
          activityIndicatorSize={30}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          showBadgeDot={true}
          badgeColors={["white"]}
          badgeDotColors={["#019592"]}
          dropDownContainerStyle={{
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
          translation={{
            PLACEHOLDER: "",
          }}
          placeholderStyle={{
            color: "rgba(102, 112, 128, 1)",
            paddingLeft: 10,
            fontSize: 14,
          }}
          style={styles.picker}
        />
        <CustomButton link="/tabs/home/textGroups" title="Save " />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 15,
    marginTop: 16,
  },
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
    color: "#667080",
  },
  picker: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 20,
    paddingRight: 16,
    paddingLeft: 6,
    borderColor: "#rgba(0, 0, 0, 0.38)",
  },
});

export default EditTextGroup;
