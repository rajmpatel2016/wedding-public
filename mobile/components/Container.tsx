import React from "react";
import { Link } from "expo-router";
import { StyleSheet, ImageBackground, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ContainerProps {
  children: React.ReactNode;
  link: string;
}

export const Container: React.FC<ContainerProps> = ({ children, link }) => {
  return (
    <ImageBackground
      source={require(`../assets/bg.png`)}
      style={styles.container}
    >
      <Link href={link} asChild>
        <Pressable style={{ width: 50, height: 25 }}>
          <AntDesign name="left" size={18} color="black" />
        </Pressable>
      </Link>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 21,
    paddingRight: 19,
    paddingTop: 66,
    position: "relative",
  },
});

export default Container;
