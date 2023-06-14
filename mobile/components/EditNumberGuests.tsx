import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import { ApiContainer } from "../container/container";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import CustomTextInput from "./CustomTextInput";

interface EditNumberGuestsProps {
  close: () => void;
  open: boolean;
}

export const EditNumberGuests: React.FC<EditNumberGuestsProps> = ({
  close,
  open,
}) => {
  const container = ApiContainer.useContainer();
  const [numberOfGuests, setNumberOfGuests] = useState(
    container.selectedGuest.guests
  );

  const saveNumberOfGuests = () => {
    container.editNumberOfGuests({
      guests: numberOfGuests,
      callback: close,
    });
  };

  return (
    <CustomModal title="Edit Number of Guests" close={close} open={open}>
      <Text style={styles.subtitle}> Number of guests</Text>
      <View style={styles.container}>
        <CustomTextInput
          keyboardType="numeric"
          value={numberOfGuests}
          onChange={(value) => setNumberOfGuests(value)}
          placeholder={
            container.selectedGuest.guests > 0
              ? container.selectedGuest.guests.toString()
              : "0"
          }
        />
        <CustomButton title="Save" onPress={saveNumberOfGuests} />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    color: "#667080",
    marginTop: 38,
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
});

export default EditNumberGuests;
