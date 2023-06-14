import React, { useEffect } from "react";
import { Stack } from "expo-router";

// Components
import { StatusBar } from "expo-status-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { ApiContainer } from "../container/container";

export const Layout = () => {
  useEffect(() => {
    lockOrientation();
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };
  return (
    <ApiContainer.Provider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </ApiContainer.Provider>
  );
};

export default Layout;
