import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";
import CustomModal from "./CustomModal";
import { ApiContainer } from "../container/container";

interface EditAddressProps {
  close: () => void;
  open: boolean;
}

export const EditAddress: React.FC<EditAddressProps> = ({ close, open }) => {
  const container = ApiContainer.useContainer();
  const [address, setAddress] = useState("");
  const editGuestAddress = () => {
    container.editGuestAddress({ address: address, callback: close });
  };
  return (
    <CustomModal title="Edit address" close={close} open={open}>
      <Text style={styles.subtitle}> Address</Text>
      <View style={styles.container}>
        <CustomTextInput
          value={address}
          onChange={(value) => setAddress(value)}
          placeholder={container.selectedGuest.address}
        />
        <CustomButton title="Save" onPress={editGuestAddress} />
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
    marginTop: 15,
  },
});

export default EditAddress;
