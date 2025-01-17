import { ThemeType } from "../types";

export const tabbieTheme: ThemeType = {
  light: {
    id: 3,
    name: "Tabbie Light Theme",
    isDark: false,
    code: "tabbie",
    primary: "#00B45D",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D1F5E3",
    onPrimaryContainer: "#003920",
    secondary: "#1B1B1B",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E5E5E5",
    onSecondaryContainer: "#141414",
    tertiary: "#FAFAFA",
    onTertiary: "#1B1B1B",
    tertiaryContainer: "#FFFFFF",
    onTertiaryContainer: "#333333",
    background: "#FAFAFA",
    onBackground: "#1B1B1B",
    surface: "#FFFFFF",
    onSurface: "#1B1B1B",
    onSurfaceVariant: "#1B1B1A",
    error: "#B3261E",
    onError: "#FFFFFF",
    errorContainer: "#F9DEDC",
    onErrorContainer: "#410E0B",
    outline: "#939393",
    inverseSurface: "#1B1B1B",
    inverseOnSurface: "#FAFAFA",
    inversePrimary: "#007944",
    danger: "#ff4444",
  },
  dark: {
    id: 4,
    name: "Tabbie Dark Theme",
    isDark: true,
    code: "tabbie",
    primary: "#00B45D",
    onPrimary: "#003920",
    primaryContainer: "#004D33",
    onPrimaryContainer: "#D1F5E3",
    secondary: "#E5E5E5",
    onSecondary: "#1B1B1B",
    secondaryContainer: "#333333",
    onSecondaryContainer: "#E5E5E5",
    tertiary: "#1B1B1B",
    onTertiary: "#FAFAFA",
    tertiaryContainer: "#333333",
    onTertiaryContainer: "#FAFAFA",
    background: "#1B1B1B",
    onBackground: "#FAFAFA",
    surface: "#141414",
    onSurface: "#E5E5E5",
    onSurfaceVariant: "#E5E5E1",
    error: "#F2B8B5",
    onError: "#601410",
    errorContainer: "#8C1D18",
    onErrorContainer: "#F9DEDC",
    outline: "#626262",
    inverseSurface: "#FAFAFA",
    inverseOnSurface: "#1B1B1B",
    inversePrimary: "#00D17A",
    danger: "#ff4444",
  },
};
