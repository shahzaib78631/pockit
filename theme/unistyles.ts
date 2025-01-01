import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import Themes from "@/theme/md3";
import { Theme, ThemeColors } from "@/theme/types";
import { baseTheme } from "@/theme/baseTheme";
import { getColorWithAlpha, getElevationColor } from "@/utils/colors";
import { AppThemeName } from "react-native-unistyles/lib/typescript/src/specs/types";

// Define app themes type
type AppThemes = Record<
  | "light"
  | "dark"
  | "default-light"
  | "default-dark"
  | "tabbie-light"
  | "tabbie-dark"
  | "strawberry-light"
  | "strawberry-dark"
  | "tako-light"
  | "tako-dark"
  | "tealTurquoise-light"
  | "tealTurquoise-dark"
  | "yotsuba-light"
  | "yotsuba-dark"
  | "lavender-light"
  | "lavender-dark"
  | "midnightDusk-light"
  | "midnightDusk-dark",
  Theme
>;

// Extend library types for themes
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

// Helper function to extend themes with custom colors
const extendThemes = (colors: ThemeColors): ThemeColors => ({
  primaryOutline: getColorWithAlpha(colors.primary, 0.2),
  primaryOutlineVariant: getColorWithAlpha(colors.primary, 0.5),
  surface2: getElevationColor(colors, 0.08),
  rippleColor: getColorWithAlpha(colors.primary, 0.12),
  surfaceReader: getColorWithAlpha(colors.surface, 0.9),
  overlay: getColorWithAlpha("rgb(0,0,0)", 0.1),
  ...colors,
});

// Function to create a theme by extending the base theme and theme-specific colors
const createTheme = (lightOrDarkColors: ThemeColors): Theme => ({
  ...baseTheme,
  id: lightOrDarkColors.id,
  name: lightOrDarkColors.name,
  isDark: lightOrDarkColors.isDark,
  code: lightOrDarkColors.code,
  colors: extendThemes(lightOrDarkColors),
});

// Configure StyleSheet with themes and settings
StyleSheet.configure({
  themes: {
    light: createTheme(Themes.defaultTheme.light),
    dark: createTheme(Themes.defaultTheme.dark),
    "default-light": createTheme(Themes.defaultTheme.light),
    "default-dark": createTheme(Themes.defaultTheme.dark),
    "tabbie-light": createTheme(Themes.tabbieTheme.light),
    "tabbie-dark": createTheme(Themes.tabbieTheme.dark),
    "strawberry-light": createTheme(Themes.strawberryDaiquiriTheme.light),
    "strawberry-dark": createTheme(Themes.strawberryDaiquiriTheme.dark),
    "tako-light": createTheme(Themes.takoTheme.light),
    "tako-dark": createTheme(Themes.takoTheme.dark),
    "tealTurquoise-light": createTheme(Themes.tealTurquoiseTheme.light),
    "tealTurquoise-dark": createTheme(Themes.tealTurquoiseTheme.dark),
    "yotsuba-light": createTheme(Themes.yotsubaTheme.light),
    "yotsuba-dark": createTheme(Themes.yotsubaTheme.dark),
    "lavender-light": createTheme(Themes.lavenderTheme.light),
    "lavender-dark": createTheme(Themes.lavenderTheme.dark),
    "midnightDusk-light": createTheme(Themes.midnightDusk.light),
    "midnightDusk-dark": createTheme(Themes.midnightDusk.dark),
  },
  settings: {
    initialTheme: "default-light",
  },
});
