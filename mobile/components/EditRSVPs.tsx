import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import CustomRadio from "./CustomRadio";

interface EditRSVPsProps {
  close: () => void;
  open: boolean;
}

export const EditRSVPs: React.FC<EditRSVPsProps> = ({ close, open }) => {
  const Options1 = [{ option: "Attending" }, { option: "Not Attending" }];
  const [valueGuest1, setValueGuest1] = useState("");
  const Options2 = [{ option: "Attending" }, { option: "Not Attending" }];
  const [valueGuest2, setValueGuest2] = useState("");

  return (
    <CustomModal title="Edit RSVPs" close={close} open={open}>
      <Text style={styles.title}>Guest 1</Text>
      <View style={styles.container}>
        {Options1.map((item, index) => {
          return (
            <CustomRadio
              clicked={valueGuest1 === item.option}
              text={item.option}
              key={index}
              onClick={() => setValueGuest1(item.option)}
            />
          );
        })}
        <View style={styles.topicContainer}></View>
        <Text style={styles.title2}>Guest 2</Text>
        {Options2.map((item, index) => {
          return (
            <CustomRadio
              clicked={valueGuest2 === item.option}
              text={item.option}
              key={index}
              onClick={() => setValueGuest2(item.option)}
            />
          );
        })}
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
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: "#667080",
  },
});

export default EditRSVPs;
