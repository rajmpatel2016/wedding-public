import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import DropDownPicker from "react-native-dropdown-picker";

interface EditGroupProps {
  close: () => void;
  open: boolean;
}

export const EditGroup: React.FC<EditGroupProps> = ({ close, open }) => {
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Bridesmaids 👑", value: "Bridesmaids" },
    { label: "Groomsmen 🍺", value: "Groomsmen" },
    { label: "Family 🏡", value: "Family" },
    { label: "Wedding planners", value: "Wedding planners" },
  ]);

  return (
    <CustomModal title="Edit Group" close={close} open={open}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Guest group</Text>
        <DropDownPicker
          multiple={false}
          min={1}
          max={1}
          activityIndicatorSize={30}
          open={open1}
          value={value}
          items={items}
          setOpen={setOpen1}
          setValue={setValue}
          setItems={setItems}
          showBadgeDot={true}
          dropDownContainerStyle={{
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
          style={styles.picker}
        />
        <CustomButton
          link="/tabs/guests/guestIndividuals"
          title="Save"
          onPress={close}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    color: "#667080",
  },
  title2: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 36,
  },
  container: {
    display: "flex",
    gap: 20,
    marginTop: 10,
  },
  topicContainer: {
    borderBottomWidth: 1,
    borderColor: "#667080",
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

export default EditGroup;
