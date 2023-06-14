import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// Components
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import CustomTextInput from "./CustomTextInput";
import { ApiContainer } from "../container/container";

interface EditLocationProps {
  close: () => void;
  open: boolean;
}

export const EditLocation: React.FC<EditLocationProps> = ({ close, open }) => {
  const [location, setLocation] = useState("");
  const onChangeLocation = (value) => {
    setLocation(value);
  };
  const container = ApiContainer.useContainer();

  useEffect(() => {
    if (container.wedding.address) {
      setLocation(container.wedding.address);
    }
  }, []);

  const saveAddress = () => {
    container.updateWeddingAddress({ address: location, callback: close });
  };

  return (
    <CustomModal title="Edit location" close={close} open={open}>
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Location"
          onChange={(value) => onChangeLocation(value)}
          value={location}
        />
        <CustomButton title="Save" onPress={saveAddress} />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 20,
    marginTop: 10,
  },
});

export default EditLocation;
