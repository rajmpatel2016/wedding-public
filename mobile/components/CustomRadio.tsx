import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
interface CustomRadioProps {
  text: string;
  clicked: boolean;
  onClick: () => void;
}
export const CustomRadio: React.FC<CustomRadioProps> = ({
  text,
  clicked,
  onClick,
}) => {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.circle}>
        {clicked ? <View style={styles.insideCircle} /> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  circle: {
    borderRadius: 50,
    borderColor: "#00000061",
    width: 19,
    height: 19,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  insideCircle: {
    borderRadius: 50,
    width: 14,
    height: 14,
    backgroundColor: "#019592",
  },
});

export default CustomRadio;
