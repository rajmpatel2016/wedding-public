import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";

interface CustomDropDownPickerProps {
  open?: boolean;
  items?: { label: string; value: string }[];
  value?: null;
  setValue?: () => void;
  setOpen?: () => void;
  setItems?: () => void;
  placeholder?: string;
  direction?: string;
}

export const CustomDropDownPicker: React.FC<CustomDropDownPickerProps> = ({
  items,
  value,
  placeholder,
  direction,
}) => {
  const [opened, setOpened] = useState(false);
  const [valued, setValued] = useState(null);
  const [item, setItem] = useState({});
  DropDownPicker.setMode("BADGE");

  return (
    <DropDownPicker
      multiple={true}
      min={0}
      max={50}
      activityIndicatorSize={30}
      open={opened}
      value={value}
      items={items}
      setOpen={() => setOpened(!opened)}
      setValue={() => setValued(value)}
      setItems={() => setItem(items)}
      showBadgeDot={true}
      badgeColors={["white"]}
      dropDownDirection={direction}
      badgeDotColors={["#019592"]}
      dropDownContainerStyle={{
        borderColor: "rgba(0, 0, 0, 0.38)",
      }}
      translation={{
        PLACEHOLDER: placeholder,
      }}
      placeholderStyle={{
        color: "#000000",
        paddingLeft: 10,
        fontSize: 14,
      }}
      style={styles.picker}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 20,
    paddingRight: 16,
    paddingLeft: 6,
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
});
