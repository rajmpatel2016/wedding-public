import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// Assets
import { AntDesign } from "@expo/vector-icons";

// Components
import Container from "../../../components/Container";
import CustomDial from "../../../components/CustomDial";
import { Link } from "expo-router";
import CustomModal from "../../../components/CustomModal";
import CustomTextInput from "../../../components/CustomTextInput";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../../../components/CustomButton";

// Containers
import { ApiContainer } from "../../../container/container";

export const TextGroups = () => {
  const [groupName, setGroupName] = useState({ groupName: "" });
  const [groupSelected, setGroupSelected] = useState({
    groupName: "",
    id: "",
  });
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [valueGuest, setValueGuest] = useState(null);
  const groupContainer = ApiContainer.useContainer();
  const groupGuestContainer = ApiContainer.useContainer();
  const guestContainer = ApiContainer.useContainer();

  useEffect(() => {
    if (groupContainer.groups.length) {
      groupGuestContainer.findAllByGroups(
        groupContainer.groups.map((group) => group.id)
      );
    }
  }, [groupContainer.groups]);

  const getCount = (groupId) => {
    if (groupGuestContainer.groupGuests.length) {
      return groupGuestContainer.groupGuests.filter(
        (items) => items.groupId === groupId
      ).length;
    } else {
      return 0;
    }
  };

  const openModal = (group) => {
    setGroupSelected(group);
    setOpenGroupModal(true);
    setGroupName(group.groupName);
  };

  const onHandleGroupName = (value) => {
    setGroupName(value);
  };

  const guestItems = guestContainer.guests.map((guest) => ({
    label: guest.name,
    value: guest.id,
  }));

  useEffect(() => {
    if (groupGuestContainer.groupGuests.length) {
      const values = groupGuestContainer.groupGuests
        .filter((item) => item.groupId === groupSelected.id)
        .map((item) => {
          return item.guestId;
        });
      setValueGuest(values);
    }
  }, [groupGuestContainer.groupGuests, groupSelected]);

  const saveGroup = () => {
    const deleted = [];
    const added = [];
    const groupGuestEdit = groupGuestContainer.groupGuests.filter(
      (item) => item.groupId === groupSelected.id
    );
    groupGuestEdit.forEach((groupGuest) => {
      if (valueGuest.indexOf(groupGuest.guestId) === -1) {
        deleted.push(groupGuest.id);
      }
    });
    valueGuest.forEach((guestId) => {
      const exist = groupGuestEdit.find((item) => item.guestId === guestId);
      if (!exist) {
        added.push(guestId);
      }
    });

    groupContainer.editGroup({
      groupId: groupSelected.id,
      groupName: groupName,
      added,
      deleted,
    });
    setOpenGroupModal(false);
  };

  DropDownPicker.setMode("BADGE");

  return (
    <Container link="/tabs/home/">
      <Text style={styles.title}>Text Groups</Text>
      <ScrollView>
        {groupContainer.groups
          .sort((a, b) => (a.groupName > b.groupName ? 1 : -1))
          .map((item) => {
            return (
              <>
                <Pressable
                  onPress={() => openModal(item)}
                  style={styles.container}
                >
                  <Text style={styles.groupName}>{item.groupName}</Text>
                  <View style={styles.icon}>
                    <Link href="/tabs/home/editTextGroup">
                      <AntDesign name="right" size={16} color="black" />
                    </Link>
                  </View>
                  <Text style={styles.numberGuests}>
                    {getCount(item.id)} guests
                  </Text>
                </Pressable>
              </>
            );
          })}
        <View style={{ height: 30 }}></View>
      </ScrollView>
      <CustomModal
        close={() => setOpenGroupModal(false)}
        title={groupSelected.groupName}
        open={openGroupModal}
      >
        <Text style={styles.dropDrownTitle}>Text group name</Text>
        <CustomTextInput
          placeholder={groupSelected.groupName}
          value={groupName}
          onChange={(value) => onHandleGroupName(value)}
          multiline={true}
          numberOfLines={4}
        />
        <Text style={styles.dropDrownTitle}>Guests</Text>
        <DropDownPicker
          multiple={true}
          min={0}
          max={5}
          open={open}
          value={valueGuest}
          items={guestItems}
          setOpen={setOpen}
          setValue={setValueGuest}
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
        <CustomButton
          customStyles={{ marginTop: 20 }}
          title="Save"
          onPress={() => {
            saveGroup();
          }}
        />
      </CustomModal>
      <CustomDial route="/tabs/home/createGroups" />
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
    width: "100%",
    height: 78,
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginTop: 26,
    paddingHorizontal: 15,
    shadowColor: "#0000001a",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 9,
    justifyContent: "center",
  },
  groupName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  numberGuests: {
    fontSize: 14,
    color: "#667080",
  },
  icon: {
    paddingLeft: 320,
  },
  dropDrownTitle: {
    color: "#667080",
    fontWeight: "400",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 15,
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
});

export default TextGroups;
