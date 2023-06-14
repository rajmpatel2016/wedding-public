import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

// Components
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import CustomTextInput from "../../../components/CustomTextInput";
import { TextInputMask } from "react-native-masked-text";
import DropDownPicker from "react-native-dropdown-picker";

// Containers
import { ApiContainer } from "../../../container/container";

export const AddGuest = () => {
  const [guest, setGuest] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const [box1, setbox1] = useState("");
  const [box4, setbox4] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Select all", value: "Guest" },
    { label: "Guest 1", value: "Guest1" },
    { label: "Guest 2", value: "Guest2" },
  ]);

  DropDownPicker.setMode("BADGE");

  const guestContainer = ApiContainer.useContainer();

  return (
    <Container link="/">
      <Text style={styles.title}>Add guest</Text>
      <View style={styles.container}>
        <CustomTextInput
          onChange={(value) => setGuest({ ...guest, name: value })}
          value={box1}
          placeholder="Name"
        />
        <TextInputMask
          style={styles.input}
          type={"cel-phone"}
          options={{
            maskType: "INTERNATIONAL",
            withDDD: true,
            dddMask: "(408)",
          }}
          placeholder="Phone number"
          placeholderTextColor="#667080"
          value={guest.phoneNumber}
          onChangeText={(value) => setGuest({ ...guest, phoneNumber: value })}
        />
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
            PLACEHOLDER: "All Guests",
          }}
          placeholderStyle={{
            color: "#000000",
            paddingLeft: 10,
            fontSize: 14,
          }}
          style={styles.picker}
        />
        <CustomTextInput
          onChange={(value) => setGuest({ ...guest, address: value })}
          value={box4}
          placeholder="Address"
        />
        <View style={styles.buttons}>
          <CustomButton
            title="Save"
            onPress={() => guestContainer.createGuest(guest)}
          />
        </View>
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
  link: {
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.38)",
    borderRadius: 4,
    height: 55,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    paddingLeft: 10,
    color: "black",
    width: "100%",
    backgroundColor: "white",
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
  buttons: {
    // paddingTop: '50%',
  },
});

export default AddGuest;
