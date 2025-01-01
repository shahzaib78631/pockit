import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for this layout
      }}
    >
      <Stack.Screen name="appearance" />
    </Stack>
  );
};

export default _layout;
