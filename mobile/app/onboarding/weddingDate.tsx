import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";

// Components
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { CustomDateTimePicker } from "../../components/CustomTimeDatePicker";

// Containers
import { ApiContainer } from "../../container/container";

const defaultTime = () => {
  const today = new Date();
  today.setHours(18, 0, 0);
  return today;
};

export const WeddingDate = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(defaultTime());

  const container = ApiContainer.useContainer();

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setTime(selectedTime);
  };

  const saveWeddingDateTime = () => {
    container.updateWeddingDateTime({
      date: date.getTime(),
      time: time.getTime(),
    });
  };

  return (
    <Container link="onboarding/location">
      <Text style={styles.title}>When is your wedding?</Text>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Enter the date and time of your wedding. You can always change these
          details later.
        </Text>
        <CustomDateTimePicker
          mode="date"
          state={openDate}
          value={date}
          onChange={onChange}
          open={openDate}
          openPicker={() => (setOpenDate(true), setOpenTime(false))}
          closePicker={() => setOpenDate(false)}
        />
        <CustomDateTimePicker
          mode="time"
          state={openTime}
          value={time}
          onChange={onChangeTime}
          open={openTime}
          openPicker={() => (setOpenTime(true), setOpenDate(false))}
          closePicker={() => setOpenTime(false)}
        />
        <CustomButton onPress={saveWeddingDateTime} title="Next" />
        <Link href="onboarding/attending" asChild>
          <Pressable style={styles.link}>
            <Text style={{ textAlign: "center" }}>I don't know yet</Text>
          </Pressable>
        </Link>
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
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    flex: 1,
    gap: 27,
    marginTop: 16,
  },
  link: {
    textAlign: "center",
  },
});

export default WeddingDate;
