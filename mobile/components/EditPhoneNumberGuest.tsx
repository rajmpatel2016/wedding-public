import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import { TextInputMask } from "react-native-masked-text";
import CustomModal from "./CustomModal";
import { ApiContainer } from "../container/container";

interface EditPhoneNumberProps {
  close: () => void;
  open: boolean;
}

export const EditPhoneNumberGuest: React.FC<EditPhoneNumberProps> = ({
  close,
  open,
}) => {
  const container = ApiContainer.useContainer();

  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (container.selectedGuest.phoneNumber) {
      setPhone(container.selectedGuest.phoneNumber);
    }
  }, [container.selectedGuest]);

  const savePhone = () => {
    container.editGuestPhone({ phoneNumber: phone, callback: close });
  };

  return (
    <CustomModal title="Edit phone number" close={close} open={open}>
      <Text style={styles.subtitle}>Phone Number</Text>
      <View style={styles.container}>
        <TextInputMask
          style={styles.input}
          type={"custom"}
          options={{
            mask: "+9 999 999 9999",
          }}
          keyboardType="numeric"
          placeholder="Phone number"
          placeholderTextColor="#667080"
          value={container.user.phone}
          onChangeText={(value) =>
            container.setUser({ ...container.user, phone: value })
          }
        />
        <CustomButton title="Save" onPress={savePhone} />
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
    marginTop: 20,
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

export default EditPhoneNumberGuest;
