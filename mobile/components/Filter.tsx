import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CustomModal from "./CustomModal";
import DropDownPicker from "react-native-dropdown-picker";

interface FilterProps {
  close: () => void;
  open: boolean;
}
export const Filter: React.FC<FilterProps> = ({ close, open }) => {
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "All guests", value: "All guests" },
    { label: "Bridesmaids", value: "Bridesmaids" },
    { label: "Chicken", value: "Chicken" },
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Meat", value: "Meat" },
  ]);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    { label: "Attending", value: "Attending" },
    { label: "Not Attending", value: "Not Attending" },
  ]);
  const [Filter, setFilter] = useState("");
  const HandleFilter = (value) => {
    setFilter(value);
  };
  DropDownPicker.setMode("BADGE");
  return (
    <CustomModal title="Filters" close={close} open={open}>
      <View style={styles.container}>
        <View style={styles.group}>
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
            badgeColors={["white"]}
            badgeDotColors={["#019592"]}
            dropDownContainerStyle={{
              borderColor: "rgba(0, 0, 0, 0.38)",
            }}
            style={styles.picker}
            dropDownDirection="BOTTOM"
          />
        </View>
        <View style={styles.meal}>
          <Text style={styles.subtitle}>Meal options</Text>
          <DropDownPicker
            multiple={false}
            min={1}
            max={1}
            activityIndicatorSize={30}
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            showBadgeDot={true}
            dropDownContainerStyle={{
              borderColor: "rgba(0, 0, 0, 0.38)",
            }}
            style={styles.picker}
            bottomOffset={200}
            dropDownDirection="BOTTOM"
          />
        </View>
        <View style={styles.rvsp}>
          <Text style={styles.subtitle}>RSVP</Text>
          <DropDownPicker
            multiple={false}
            min={1}
            max={1}
            activityIndicatorSize={30}
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            showBadgeDot={true}
            dropDownContainerStyle={{
              borderColor: "rgba(0, 0, 0, 0.38)",
            }}
            style={styles.picker}
            dropDownDirection="BOTTOM"
          />
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: "#667080",
    paddingBottom: 10,
  },
  container: {
    display: "flex",
    gap: 20,
    paddingTop: 20,
    position: "relative",
    zIndex: 100,
  },
  group: {
    position: "relative",
    zIndex: 51,
  },
  meal: {
    position: "relative",
    zIndex: 50,
  },
  rvsp: {
    position: "relative",
    zIndex: 49,
  },
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

export default Filter;
