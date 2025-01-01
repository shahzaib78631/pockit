import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="add_item" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
