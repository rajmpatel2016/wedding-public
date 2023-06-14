import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import { CustomDateTimePicker } from "../components/CustomTimeDatePicker";
import { ApiContainer } from "../container/container";
import CustomModal from "./CustomModal";

export const EditDate = ({ close, open }) => {
  const container = ApiContainer.useContainer();
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(new Date());

  const onChangeTime = (event, selectedTime) => {
    setTime(selectedTime);
  };

  useEffect(() => {
    if (container.wedding && container.wedding.time) {
      setTime(new Date(parseInt(container.wedding.time)));
    }
  }, [container.wedding]);

  const saveWeddingDateTime = () => {
    container.updateWeddingDateTime({
      date: container.wedding.date,
      time: time.getTime(),
      settings: true,
      callback: () => {
        close();
      },
    });
  };

  return (
    <CustomModal title="Edit time" close={close} open={open}>
      <View style={styles.container}>
        <CustomDateTimePicker
          mode="time"
          state={openTime}
          value={time}
          onChange={onChangeTime}
          open={openTime}
          openPicker={() => setOpenTime(true)}
          closePicker={() => setOpenTime(false)}
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
    lineHeigh: 22,
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
