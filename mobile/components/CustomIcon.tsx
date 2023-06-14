import React from "react";
import { StyleSheet, View } from "react-native";

interface CustomIconProps {
  children: React.ReactNode;
}

export const CustomIcon: React.FC<CustomIconProps> = ({ children }) => {
  return <View style={styles.icon}>{children}</View>;
};

const styles = StyleSheet.create({
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#8AD759",
  },
});

export default CustomIcon;
