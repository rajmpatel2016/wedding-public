import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CheckboxProps {
  text?: string;
  clicked?: boolean;
  onClick?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  text,
  clicked,
  onClick,
}) => {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <View style={styles.option}>
        <View style={styles.user}>
          <Text style={{ fontSize: 25 }}>{text?.slice(0, 2)}</Text>
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.box}>
        {clicked && <View style={styles.check}></View>}
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.38)",
    width: 20,
    height: 20,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    width: 14,
    height: 14,
    borderRadius: 5,
    backgroundColor: "#019592",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  option: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  user: {
    borderRadius: 30,
    width: 63,
    height: 63,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  text: {
    display: "flex",
    color: "black",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: "24",
    flexDirection: "column",
    paddingLeft: 20,
  },
  square: {
    borderRadius: 20,
    borderColor: "#00000061",
    width: 19,
    height: 19,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  insideSquare: {
    borderRadius: 20,
    width: 14,
    height: 14,
    backgroundColor: "#019592",
  },
});

export default Checkbox;
