import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";

// Components
import { Link } from "expo-router";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import DropDownPicker from "react-native-dropdown-picker";
import CustomDateTimePicker from "../../components/CustomTimeDatePicker";
import CustomTextArea from "../../components/CustomTextArea";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Containers
import { ApiContainer } from "../../container/container";

export const SchedulingGroup = () => {
  const [messageName, setMessageName] = useState("");
  const [message, setMessage] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [parsedDate, setParsedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [parsedTime, setParsedTime] = useState(
    new Date().toISOString().split("T")[1].slice(0, 5)
  );
  const [openTime, setOpenTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [value, setValue] = useState(null);

  const groupContainer = ApiContainer.useContainer();

  const filterGroups = () => {
    const namesFiltered = groupContainer.groups.filter(
      (item) => item.groupName.length > 0
    );
  };

  useEffect(() => {
    groupContainer.getGroupByWeddingId();
    filterGroups();
  }, []);

  const onHandleMessageName = (value) => {
    setMessageName(value);
  };

  const handleMessage = (value) => {
    setMessage(value);
  };

  const onChange = (event, selectedDate) => {
    const toDate = new Date(selectedDate).toLocaleDateString("en-US", {
      dateStyle: "short",
    });
    setParsedDate(toDate);
    setDate(new Date(selectedDate));
  };

  const onChangeTime = (event, selectedTime) => {
    const toDate = new Date(selectedTime).toLocaleDateString("en-US", {
      timeStyle: "short",
    });

    setParsedTime(toDate);
    setTime(new Date(selectedTime));
  };

  DropDownPicker.setMode("BADGE");
  const items = groupContainer.groups.map((group) => ({
    label: group.groupName,
    value: group.id,
  }));

  return (
    <KeyboardAwareScrollView>
      <Container link="/onboarding/specialGroup">
        <ScrollView>
          <Text style={styles.title}>Start scheduling group texts</Text>

          <View style={styles.container}>
            <Text style={styles.subtitle}>
              Create messages you would like to send to your guest groups ahead
              of your wedding day.
            </Text>

            <CustomTextInput
              placeholder="Message name (e.g., bus to ceremony)"
              value={messageName}
              onChange={(value) => onHandleMessageName(value)}
            />

            <CustomDateTimePicker
              mode="date"
              state={openDate}
              value={date}
              onChange={onChange}
              open={openDate}
              openPicker={() => (setOpenDate(true), setOpenTime(false))}
              closePicker={() => setOpenDate(false)}
              customPickerStyles={{
                bottom: 120,
                backgroundColor: "white",
                paddingTop: 32,
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
                bottom: 120,
                backgroundColor: "white",
                paddingTop: 32,
              }}
            />
            <DropDownPicker
              multiple={true}
              min={0}
              max={5}
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
                PLACEHOLDER: "Text group",
              }}
              placeholderStyle={{
                color: "rgba(102, 112, 128, 1)",
                paddingLeft: 10,
                fontSize: 14,
              }}
              style={styles.picker}
            />

            <CustomTextArea
              placeholder="👋🏼 Type message..."
              value={message}
              onChange={(value) => handleMessage(value)}
              multiline={true}
            />

            <View style={styles.button}>
              <Pressable style={styles.grayButton}>
                <Text style={styles.titleGrayButton}>
                  Save and create new group
                </Text>
              </Pressable>
              <CustomButton link="onboarding/finish" title="Save and Done" />
              <Link href="onboarding/finish" asChild>
                <Pressable style={styles.link}>
                  <Text style={{ textAlign: "center" }}>Not now</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </Container>
    </KeyboardAwareScrollView>
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
    gap: 25,
    marginTop: 16,
    marginBottom: 40,
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
  button: {
    gap: 25,
  },
  link: {
    textAlign: "center",
  },
});

export default SchedulingGroup;
