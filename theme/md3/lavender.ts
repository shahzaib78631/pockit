import { ThemeType } from "../types";

export const lavenderTheme: ThemeType = {
  light: {
    id: 14,
    name: "Lavender", // getString('appearanceScreen.theme.lavender') will return this string
    code: "lavender",
    isDark: false,
    primary: "rgb(121, 68, 173)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(240, 219, 255)",
    onPrimaryContainer: "rgb(44, 0, 81)",
    secondary: "rgb(102, 90, 111)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(237, 221, 246)",
    onSecondaryContainer: "rgb(33, 24, 41)",
    tertiary: "rgb(128, 81, 87)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 217, 221)",
    onTertiaryContainer: "rgb(50, 16, 22)",
    background: "#EDE2FF",
    onBackground: "#111129",
    surface: "#EDE2FF",
    onSurface: "#111129",
    onSurfaceVariant: "rgb(74, 69, 78)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    outline: "rgb(124, 117, 126)",
    inverseSurface: "rgb(50, 47, 51)",
    inverseOnSurface: "rgb(246, 239, 244)",
    inversePrimary: "rgb(221, 184, 255)",
    danger: "#ff4444", // Add any additional danger color here if necessary
  },
  dark: {
    id: 15,
    name: "Lavender", // getString('appearanceScreen.theme.lavender') will return this string
    isDark: true,
    code: "lavender",
    primary: "rgb(221, 184, 255)",
    onPrimary: "rgb(72, 8, 123)",
    primaryContainer: "rgb(96, 42, 147)",
    onPrimaryContainer: "rgb(240, 219, 255)",
    secondary: "rgb(208, 193, 218)",
    onSecondary: "rgb(54, 44, 63)",
    secondaryContainer: "rgb(77, 67, 86)",
    onSecondaryContainer: "rgb(237, 221, 246)",
    tertiary: "rgb(243, 183, 190)",
    onTertiary: "rgb(75, 37, 43)",
    tertiaryContainer: "rgb(101, 58, 64)",
    onTertiaryContainer: "rgb(255, 217, 221)",
    background: "#111129",
    onBackground: "rgb(231, 225, 229)",
    surface: "#111129",
    onSurface: "rgb(231, 225, 229)",
    onSurfaceVariant: "rgb(204, 196, 206)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    outline: "rgb(150, 142, 152)",
    inverseSurface: "rgb(231, 225, 229)",
    inverseOnSurface: "rgb(50, 47, 51)",
    inversePrimary: "rgb(121, 68, 173)",
    danger: "#ff4444", // Add any additional danger color here if necessary
  },
};
