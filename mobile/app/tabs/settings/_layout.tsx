import React from "react";
import { Stack } from "expo-router";

export const LayoutStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack>
  );
};

export default LayoutStack;
