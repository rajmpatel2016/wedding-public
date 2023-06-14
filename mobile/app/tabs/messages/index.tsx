import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Components
import DropDownPicker from "react-native-dropdown-picker";
import CustomDial from "../../../components/CustomDial";

// Containers
import { ApiContainer } from "../../../container/container";

export const Messages = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const groupContainer = ApiContainer.useContainer();
  const messageGroupContainer = ApiContainer.useContainer();
  const messageContainer = ApiContainer.useContainer();

  const groupTextItems = groupContainer.groups.map((item) => ({
    label: item.groupName,
    value: item.id,
  }));

  useEffect(() => {
    if (value) {
      messageContainer.getMessageByGroupId({ groupId: value });
    } else {
      messageGroupContainer.getMessageGroup();
    }
  }, [value]);

  useEffect(() => {
    groupContainer.getGroupByWeddingId();
  }, []);

  useEffect(() => {
    if (!value && groupContainer.groups.length > 0) {
      setValue(groupContainer.groups[0].id);
    }
  }, [groupContainer.groups]);

  DropDownPicker.setMode("BADGE");

  return (
    <ImageBackground
      source={require("../../../assets/bg.png")}
      style={{
        width: "100%",
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: "white",
        paddingTop: 116,
      }}
    >
      <Text style={styles.messageText}>Messages</Text>
      <View style={styles.container}>
        <Text style={styles.subTitle}>Text Group</Text>
        <DropDownPicker
          min={0}
          max={5}
          open={open}
          value={value}
          items={groupTextItems}
          setOpen={setOpen}
          setValue={setValue}
          showBadgeDot={true}
          badgeColors={["white"]}
          badgeDotColors={["#019592"]}
          dropDownContainerStyle={{
            borderColor: "rgba(0, 0, 0, 0.38)",
          }}
          translation={{
            PLACEHOLDER: "All guests",
          }}
          placeholderStyle={{
            color: "#000000DE",
            paddingLeft: 0,
            fontSize: 16,
          }}
          style={styles.picker}
        />

        <Text style={styles.subTitle}>Messages</Text>
      </View>
      <ScrollView>
        {messageContainer.groupMessages.map((item) => {
          return (
            <View style={styles.messageContainer}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageTitle}>{item.name}</Text>
              </View>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          );
        })}
      </ScrollView>
      <CustomDial route="/tabs/messages/createMessage" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000000DE",
  },
  container: {
    position: "relative",
    zIndex: 10,
  },
  subTitle: {
    color: "#667080DE",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 24,
    marginBottom: 8,
  },
  picker: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
  messageContainer: {
    width: "97%",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation: ,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 20,
  },
  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000DE",
  },
  editMessage: {
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  messageDate: {
    fontSize: 14,
    color: "#667080DE",
    fontWeight: "400",
    marginTop: 2,
  },
  message: {
    fontSize: 14,
    fontWeight: "400",
    color: "#667080",
    marginTop: 28,
  },
  button: {
    display: "flex",
    bottom: 20,
    left: 30,
  },
});

export default Messages;
