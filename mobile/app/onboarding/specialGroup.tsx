import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

// Components
import Container from "../../components/Container";
import { Link } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import DropDownPicker from "react-native-dropdown-picker";

// Containers
import { ApiContainer } from "../../container/container";

export const SpecialGroup = () => {
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

  const clearForm = () => {
    setValue([]);
    setGroupName("");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <Container link="/onboarding/guestMeals">
        <Text style={styles.title}>Create text groups</Text>
        <View style={styles.container}>
          <Text style={styles.subtitle}>
            Add guests to text groups to send out tailored communications to
            each group.
          </Text>
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
          <Pressable
            style={styles.grayButton}
            onPress={() => {
              if (groupName.length) {
                container.createGroup({
                  groupName,
                  groupGuests: value,
                  callback: clearForm,
                });
              }
            }}
          >
            <Text style={styles.titleGrayButton}>
              Save and create new group
            </Text>
          </Pressable>
          <CustomButton
            onPress={() =>
              groupContainer.createGroup({
                groupName,
                groupGuests: value,
                screen: "finish",
              })
            }
            title="Save and Done"
          />
          <Link href="onboarding/schedulingGroup" asChild>
            <Pressable style={styles.link}>
              <Text style={{ textAlign: "center" }}>Not now</Text>
            </Pressable>
          </Link>
        </View>
      </Container>
    </KeyboardAvoidingView>
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
  grayButton: {
    width: "100%",
    backgroundColor: "#667080",
    paddingVertical: 13,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
  },
  titleGrayButton: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default SpecialGroup;
