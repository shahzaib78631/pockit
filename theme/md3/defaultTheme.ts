import { ThemeType } from "../types";

export const defaultTheme: ThemeType = {
  light: {
    id: 1,
    name: "Default Light Theme",
    code: "default",
    isDark: false,
    primary: "#6750A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#EADDFF",
    onPrimaryContainer: "#21005D",
    secondary: "#625B71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E8DEF8",
    onSecondaryContainer: "#1D192B",
    tertiary: "#7D5260",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFD8E4",
    onTertiaryContainer: "#31111D",
    background: "#FFFFFF",
    onBackground: "#1C1B1F",
    surface: "#FFFFFF",
    onSurface: "#1C1B1F",
    onSurfaceVariant: "rgb(68, 70, 79)",
    error: "#B3261E",
    onError: "#FFFFFF",
    errorContainer: "#F9DEDC",
    onErrorContainer: "#410E0B",
    outline: "#79747E",
    inverseSurface: "#313033",
    inverseOnSurface: "#F4EFF4",
    inversePrimary: "#D0BCFF",
    danger: "#ff4444",
  },
  dark: {
    id: 2,
    name: "Default Dark Theme",
    code: "default",
    isDark: true,
    primary: "#D0BCFF",
    onPrimary: "#381E72",
    primaryContainer: "#4F378B",
    onPrimaryContainer: "#EADDFF",
    secondary: "#CCC2DC",
    onSecondary: "#332D41",
    secondaryContainer: "#4A4458",
    onSecondaryContainer: "#E8DEF8",
    tertiary: "#EFB8C8",
    onTertiary: "#492532",
    tertiaryContainer: "#633B48",
    onTertiaryContainer: "#FFD8E4",
    background: "#1C1B1F",
    onBackground: "#E6E1E5",
    surface: "#1C1B1F",
    onSurface: "#E6E1E5",
    onSurfaceVariant: "rgb(197, 198, 208)",
    error: "#F2B8B5",
    onError: "#601410",
    errorContainer: "#8C1D18",
    onErrorContainer: "#F9DEDC",
    outline: "#938F99",
    inverseSurface: "#E6E1E5",
    inverseOnSurface: "#313033",
    inversePrimary: "#6750A4",
    danger: "#ff4444",
  },
};
