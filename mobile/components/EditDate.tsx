import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import { CustomDateTimePicker } from "../components/CustomTimeDatePicker";
import { ApiContainer } from "../container/container";
import CustomModal from "./CustomModal";

export const EditDate = ({ close, open }) => {
  const container = ApiContainer.useContainer();
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [parsedDate, setParsedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (container.wedding && container.wedding.date) {
      const todays = new Date(parseInt(container.wedding.date));
      console.log("new12345", container.wedding.date);
      console.log("new dates12345", new Date(parseInt(container.wedding.date)));
      setDate(todays);
    }
  }, [container.wedding]);

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const toDate = new Date(selectedDate).toLocaleDateString("en-US", {
      dateStyle: "short",
    });

    setParsedDate(toDate);
    setDate(selectedDate);
  };

  const saveWeddingDateTime = () => {
    container.updateWeddingDateTime({
      date: date.getTime(),
      time: container.wedding.time,
      settings: true,
      callback: () => {
        close();
        setOpenDate(false);
      },
    });
  };

  console.log("the value", date, date.getTime());
  console.log("the wedding", container.wedding.date);

  return (
    <CustomModal title="Edit date" close={close} open={open}>
      <View style={styles.container}>
        <CustomDateTimePicker
          mode="date"
          state={openDate}
          value={date}
          onChange={onChange}
          open={openDate}
          openPicker={() => setOpenDate(true)}
          closePicker={() => setOpenDate(false)}
        />
        <CustomButton
          title="Save"
          onPress={saveWeddingDateTime}
          link="/tabs/settings/"
        />
      </View>
    </CustomModal>
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

export default EditDate;
