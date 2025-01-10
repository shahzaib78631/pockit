import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { ThemedList, ThemedText, ThemedView } from "@/components/ui";
import { getString } from "@/strings/translations";
import ThemePicker from "@/components/ThemePicker";
import { darkThemes, lightThemes } from "@/theme/md3";
import { useThemeContext } from "@/context/ThemeContext";
import { ThemeColors } from "@/theme/types";
import { UnistylesRuntime } from "react-native-unistyles";

const AppearanceSettings = () => {
  const { setTheme, commonStyles } = useThemeContext();

  function setCurrentTheme(theme: { name: string; isDark: boolean }) {
    console.log("setCurrentTheme", theme);
  }

  return (
    <ThemedView
      goBackEnabled={true}
      statusbarBackgroundColor="card"
      style={{ paddingHorizontal: 0 }}
      title={getString("settings.appearance")}
    >
      <ScrollView>
        <ThemedText
          color="primary"
          fontSize="xxl"
          type="medium"
          style={[
            commonStyles.paddingHorizontalXl,
            commonStyles.paddingVerticalMd,
          ]}
        >
          {getString("appearance.app_theme")}
        </ThemedText>
        <ThemedText
          color="cardForeground"
          fontSize="md"
          type="regular"
          style={[
            commonStyles.paddingHorizontalXl,
            commonStyles.paddingVerticalMd,
          ]}
        >
          {getString("appearance.light_theme")}
        </ThemedText>
        <ThemedList
          type="flatlist"
          data={lightThemes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }: { item: ThemeColors }) => (
            <ThemePicker
              key={item.id}
              selected={
                UnistylesRuntime.themeName ===
                `${item.code}${item.isDark ? "-dark" : "-light"}`
              }
              theme={item}
              onPress={() => {
                const themeName: any = `${item.code}${
                  item.isDark ? "-dark" : "-light"
                }`;
                setTheme(themeName);
                setCurrentTheme({
                  name: item.code,
                  isDark: item.isDark,
                });
              }}
            />
          )}
          estimatedItemSize={123}
          horizontal={true}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          showsHorizontalScrollIndicator={false}
        />
        <ThemedText
          color="cardForeground"
          fontSize="md"
          type="regular"
          style={[
            commonStyles.paddingHorizontalXl,
            commonStyles.paddingVerticalMd,
          ]}
        >
          {getString("appearance.dark_theme")}
        </ThemedText>
        <ThemedList
          type="flatlist"
          data={darkThemes}
          renderItem={({ item }: { item: ThemeColors }) => (
            <ThemePicker
              key={item.id}
              theme={item}
              selected={
                UnistylesRuntime.themeName ===
                `${item.code}${item.isDark ? "-dark" : "-light"}`
              }
              onPress={() => {
                const themeName: any = `${item.code}${
                  item.isDark ? "-dark" : "-light"
                }`;
                setTheme(themeName);
                setCurrentTheme({
                  name: item.code,
                  isDark: item.isDark,
                });
              }}
            />
          )}
          estimatedItemSize={123}
          horizontal={true}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default AppearanceSettings;

const styles = StyleSheet.create({});
