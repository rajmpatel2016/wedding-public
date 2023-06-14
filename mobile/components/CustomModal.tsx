import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface CustomModalProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  close: () => void;
  customStyles?: any;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  children,
  open,
  close,
  customStyles = {},
}) => {
  return (
    <>
      {open && (
        <View style={styles.container}>
          <View style={{ ...styles.subContainer, ...customStyles }}>
            <View style={styles.header}>
              <Pressable
                onPress={close}
                style={{ width: 80, position: "absolute", left: 10 }}
              >
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
              <Text style={styles.title}>{title}</Text>
            </View>
            {children}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    position: "absolute",
    zIndex: 999999,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  subContainer: {
    display: "flex",
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    paddingRight: 15,
  },
});

export default CustomModal;
