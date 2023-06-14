import React from "react";
import { Stack } from "expo-router";

export const LayoutStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="payment"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="finishPayment"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="finishPaymentPlus"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="textGroups"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="createGroups"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="editTextGroup"
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack>
  );
};

export default LayoutStack;
