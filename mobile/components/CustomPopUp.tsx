import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface CustomPopUpProps {
  children: React.ReactNode;
  open: boolean;
}

export const CustomPopUp: React.FC<CustomPopUpProps> = ({ children, open }) => {
  const [close, setClose] = useState(open);
  return (
    <>
      {close && (
        <View style={styles.container}>
          <View style={styles.modal}>
            <Pressable onPress={() => setClose(!open)} style={styles.header}>
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
            {children}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 30,
  },
  modal: {
    backgroundColor: "white",
    width: "100%",
    height: "auto",
    padding: 20,
    borderRadius: 16,
  },
  header: {
    width: 50,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
});

export default CustomPopUp;
