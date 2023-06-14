import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Components
import DropDownPicker from "react-native-dropdown-picker";

// Containers
import { ApiContainer } from "../../../container/container";

export const GuestsFilters = () => {
  const guestContainer = ApiContainer.useContainer();
  const groupContainer = ApiContainer.useContainer();
  const groupGuestContainer = ApiContainer.useContainer();
  const mealResponsesContainer = ApiContainer.useContainer();

  const [guestsFiltered, setGuestsFiltered] = useState(guestContainer.guests);

  // MEALS
  const [openMealPicker, setOpenMealPicker] = useState(false);
  const [mealValue, setMealValue] = useState(null);
  const [mealItem, setMealItem] = useState(
    mealResponsesContainer.meals.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  );

  // GROUPS
  const [openGroup, setOpenGroup] = useState(false);
  const [groupValue, setGroupValue] = useState(null);
  const [groupItem, setGroupItem] = useState(
    groupContainer.groups.map((item) => ({
      label: item.groupName,
      value: item.id,
    }))
  );

  // RSVPS
  const [rsvpValue, setRsvpValue] = useState(null);
  const [openRsvpPicker, setOpenRsvpPicker] = useState(false);
  const [rsvpItem, setRsvpItem] = useState([
    { label: "true", value: "true" },
    { label: "false", value: "false" },
  ]);

  const onChangeGroup = (value) => {
    const groupIdFilter = value();

    const guestsFilteredNow = guestsFiltered.filter((item) => {
      const findGroupGuest = groupGuestContainer.groupGuest.find(
        (groupGuestItem) =>
          groupGuestItem.groupId === groupIdFilter &&
          groupGuestItem.guestId === item.id
      );
      return !!findGroupGuest;
    });
    setGuestsFiltered(guestsFilteredNow);
    setGroupValue(value);
  };

  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 8 }}>
        <Text style={styles.pickerTitle}>Guest group</Text>
        <DropDownPicker
          min={0}
          max={5}
          open={openGroup}
          value={groupValue}
          items={groupItem}
          setOpen={setOpenGroup}
          setValue={onChangeGroup}
          setItems={setGroupItem}
          showBadgeDot={true}
          dropDownDirection="TOP"
          badgeColors={["white"]}
          badgeDotColors={["#019592"]}
          dropDownContainerStyle={{
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
          placeholderStyle={{
            color: "rgba(102, 112, 128, 1)",
            paddingLeft: 10,
            fontSize: 14,
          }}
          style={styles.picker}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.pickerTitle}>Meal options</Text>
        <DropDownPicker
          dropDownDirection="TOP"
          min={0}
          max={5}
          open={openMealPicker}
          value={mealValue}
          items={mealItem}
          setItems={setMealItem}
          setOpen={setOpenMealPicker}
          setValue={setMealValue}
          showBadgeDot={true}
          badgeColors={["white"]}
          badgeDotColors={["#019592"]}
          dropDownContainerStyle={{
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
          placeholderStyle={{
            color: "rgba(102, 112, 128, 1)",
            paddingLeft: 10,
            fontSize: 14,
          }}
          style={styles.picker}
        />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={styles.pickerTitle}>RSVP</Text>
        <DropDownPicker
          min={0}
          max={5}
          open={openRsvpPicker}
          value={rsvpValue}
          items={rsvpItem}
          setItems={setRsvpItem}
          setOpen={setOpenRsvpPicker}
          setValue={setRsvpValue}
          showBadgeDot={true}
          badgeColors={["white"]}
          badgeDotColors={["#019592"]}
          dropDownContainerStyle={{
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
          placeholderStyle={{
            color: "rgba(102, 112, 128, 1)",
            paddingLeft: 10,
            fontSize: 14,
          }}
          style={styles.picker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerTitle: {
    fontSize: 16,
    color: "#667080",
  },
  picker: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 20,
    paddingRight: 16,
    paddingLeft: 18,
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
});

export default GuestsFilters;
