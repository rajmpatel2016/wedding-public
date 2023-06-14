import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";

// Components
import Container from "../../../components/Container";
import CustomTextInput from "../../../components/CustomTextInput";
import DropDownPicker from "react-native-dropdown-picker";
import CustomDateTimePicker from "../../../components/CustomTimeDatePicker";
import CustomTextArea from "../../../components/CustomTextArea";

// Containers
import { ApiContainer } from "../../../container/container";

export const CreateMessage = () => {
  const groupContainer = ApiContainer.useContainer();
  const userContainer = ApiContainer.useContainer();
  const groupGuestContainer = ApiContainer.useContainer();
  const messageContainer = ApiContainer.useContainer();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [messageName, setMessageName] = useState("");
  const [message, setMessage] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [items, setItems] = useState(
    groupContainer.groups.map((group) => ({
      label: group.groupName,
      value: group.id,
    }))
  );
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [parsedDate, setParsedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [parsedTime, setParsedTime] = useState(
    new Date().toISOString().split("T")[1].slice(0, 5)
  );

  const onChange = (event, selectedDate) => {
    const toDate = new Date(selectedDate).toLocaleDateString("en-US", {
      dateStyle: "short",
    });

    setParsedDate(toDate);
    userContainer.setUserMessage({
      ...userContainer.userMessage,
      date: parsedDate,
    });
    setDate(new Date(selectedDate));
  };

  const onChangeTime = (event, selectedTime) => {
    const toDate = new Date(selectedTime).toLocaleDateString("en-US", {
      timeStyle: "short",
    });

    setParsedTime(toDate);
    setTime(new Date(selectedTime));
    userContainer.setUserMessage({
      ...userContainer.userMessage,
      time: parsedTime,
    });
  };

  DropDownPicker.setMode("BADGE");

  useEffect(() => {
    groupGuestContainer.getGroupGuest();
  }, []);

  const createMessage = () => {
    const newMessage = {
      name: messageName,
      date: "01",
      time: "02",
      message,
      groupId: value,
    };
    messageContainer.createMessage(newMessage);
  };

  return (
    <ScrollView>
      <Container link="/tabs/messages/">
        <Text style={styles.title}>Create Message</Text>
        <View style={styles.container}>
          <Text style={styles.subtitle}>New message</Text>
          <CustomTextInput
            placeholder="Message name (e.g., bus to ceremony)"
            value={messageName}
            onChange={(value) => setMessageName(value)}
          />
          {/* <CustomDateTimePicker
            mode="date"
            state={openDate}
            value={date}
            onChange={onChange}
            open={openDate}
            openPicker={() => (setOpenDate(true), setOpenTime(false))}
            closePicker={() => setOpenDate(false)}
            customPickerStyles={{
              bottom: 107,
              backgroundColor: "white",
            }}
          />
          <CustomDateTimePicker
            mode="time"
            state={openTime}
            value={date}
            onChange={onChangeTime}
            open={openTime}
            openPicker={() => (setOpenDate(false), setOpenTime(true))}
            closePicker={() => setOpenTime(false)}
            customPickerStyles={{
              bottom: 107,
              backgroundColor: "white",
            }}
          /> */}

          <DropDownPicker
            multiple={false}
            min={0}
            max={5}
            open={open}
            value={value}
            items={items}
            setItems={setItems}
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
          <CustomTextArea
            placeholder=" 👋🏼 Type message..."
            value={message}
            onChange={(value) => setMessage(value)}
            multiline={true}
          />
          <View>
            <Pressable style={styles.grayButton} onPress={createMessage}>
              <Text style={styles.titleGrayButton}>Save and send now</Text>
            </Pressable>
          </View>
        </View>
      </Container>
      <View style={{ height: 20 }}></View>
    </ScrollView>
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
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  container: {
    display: "flex",
    gap: 27,
    marginTop: 25,
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
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.38)",
  },
  grayButton: {
    width: "100%",
    backgroundColor: "#667080",
    paddingVertical: 13,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  titleGrayButton: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default CreateMessage;
