import { Platform, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { ThemeColors } from "../types";
import Color from "color";

export const setStatusBarColor = (color: ThemeColors) => {
  if (Platform.OS === "android") {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor("transparent");
  }
  StatusBar.setBarStyle(color.isDark ? "light-content" : "dark-content");
};

export const changeNavigationBarColor = (color: string, isDark = false) => {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(color);
    NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }
};
