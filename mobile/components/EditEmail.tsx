import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import CustomTextInput from "./CustomTextInput";
import { ApiContainer } from "../container/container";

interface EditEmailProps {
  close: () => void;
  open: boolean;
}

export const EditEmail: React.FC<EditEmailProps> = ({ close, open }) => {
  const container = ApiContainer.useContainer();

  const [email, setEmail] = useState("");
  const onChangeEmail = (value) => {
    setEmail(value);
  };

  useEffect(() => {
    if (container.user.email) {
      setEmail(container.user.email);
    }
  }, [container.user]);

  const saveEmail = () => {
    container.editUserEmail({ email, callback: close });
  };

  return (
    <CustomModal title="Edit email" close={close} open={open}>
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Email"
          onChange={(value) => onChangeEmail(value)}
          value={email}
        />
        <CustomButton title="Save" onPress={saveEmail} link="/tabs/settings/" />
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
});

export default EditEmail;
