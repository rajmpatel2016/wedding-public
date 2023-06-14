import React from "react";
import { Stack } from "expo-router";

export const LayoutStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="registerName"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="registerEmail"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="registerPassword"
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack>
  );
};

export default LayoutStack;
