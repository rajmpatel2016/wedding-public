import React from "react";
import { Stack } from "expo-router";

export const LayoutStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="phoneNumber"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="location"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="weddingDate"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="attending"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="addContacts"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="rsvps"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="mealResponses"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="guestMeals"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="specialGroup"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="schedulingGroup"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="finish"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="resetPassword"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="enterCode"
        options={{ headerShown: false, gestureEnabled: false }}
      />{" "}
    </Stack>
  );
};

export default LayoutStack;
