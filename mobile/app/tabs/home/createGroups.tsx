import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Components
import CustomButton from "../../../components/CustomButton";
import CustomTextInput from "../../../components/CustomTextInput";
import DropDownPicker from "react-native-dropdown-picker";
import Container from "../../../components/Container";

// Containers
import { ApiContainer } from "../../../container/container";

export const CreateGroups = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [groupName, setGroupName] = useState("");

  const guestContainer = ApiContainer.useContainer();
  const groupContainer = ApiContainer.useContainer();

  const onHandleGroupName = (value) => {
    setGroupName(value);
  };

  DropDownPicker.setMode("BADGE");

  useEffect(() => {
    guestContainer.getGuestByWeddingId();
  }, []);

  const items = guestContainer.guests.map((guest) => ({
    label: guest.name,
    value: guest.id,
  }));

  return (
    <Container link="/tabs/home/textGroups">
      <Text style={styles.title}>Create text group</Text>
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Group name (e.g., Bridesmaids 👑)"
          value={groupName}
          onChange={(value) => onHandleGroupName(value)}
          multiline={true}
          numberOfLines={4}
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
          showBadgeDot={true}
          badgeColors={["white"]}
          badgeDotColors={["#019592"]}
          dropDownContainerStyle={{
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
          translation={{
            PLACEHOLDER: "Guests",
          }}
          placeholderStyle={{
            color: "rgba(102, 112, 128, 1)",
            paddingLeft: 10,
            fontSize: 14,
          }}
          style={styles.picker}
        />
        <View style={styles.container}>
          <CustomButton
            title="Save"
            onPress={() =>
              groupContainer.createGroup({
                groupName,
                groupGuests: value,
                screen: "textGroups",
              })
            }
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
  container: {
    display: "flex",
    gap: 13,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
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

export default CreateGroups;
