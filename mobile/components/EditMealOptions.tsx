import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import DropDownPicker from "react-native-dropdown-picker";

interface EditMealOptionsProps {
  close: () => void;
  open: boolean;
}

export const EditMealOptions: React.FC<EditMealOptionsProps> = ({
  close,
  open,
}) => {
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Salmon", value: "Salmon" },
    { label: "Chicken", value: "Chicken" },
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Salmon", value: "Salmon" },
    { label: "Chicken", value: "Chicken" },
  ]);

  return (
    <CustomModal title="Edit Meal Responses" close={close} open={open}>
      <View style={styles.container}>
        <Text style={styles.title}>Guest 1</Text>
        <Text style={styles.subtitle}>Meal option</Text>
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

        <View style={styles.topicContainer}></View>
        <Text style={styles.title2}>Guest 2</Text>
        <Text style={styles.subtitle}>Meal option</Text>
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

export default EditMealOptions;
