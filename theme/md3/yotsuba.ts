import { ThemeType } from "../types";

export const yotsubaTheme: ThemeType = {
  light: {
    id: 12,
    name: "Yotsuba", // getString('appearanceScreen.theme.yotsuba') will return this string
    isDark: false,
    code: "yotsuba",
    primary: "rgb(174, 50, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 219, 208)",
    onPrimaryContainer: "rgb(58, 11, 0)",
    secondary: "rgb(119, 87, 77)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 219, 208)",
    onSecondaryContainer: "rgb(44, 22, 14)",
    tertiary: "rgb(107, 94, 47)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(245, 226, 167)",
    onTertiaryContainer: "rgb(34, 27, 0)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 24)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 24)",
    onSurfaceVariant: "rgb(83, 67, 63)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    outline: "rgb(133, 115, 110)",
    inverseSurface: "rgb(54, 47, 45)",
    inverseOnSurface: "rgb(251, 238, 234)",
    inversePrimary: "rgb(255, 181, 158)",
    danger: "#ff4444", // Add any additional danger color here if necessary
  },
  dark: {
    id: 13,
    name: "Yotsuba", // getString('appearanceScreen.theme.yotsuba') will return this string
    isDark: true,
    code: "yotsuba",
    primary: "rgb(255, 181, 158)",
    onPrimary: "rgb(94, 23, 0)",
    primaryContainer: "rgb(133, 36, 0)",
    onPrimaryContainer: "rgb(255, 219, 208)",
    secondary: "rgb(231, 189, 177)",
    onSecondary: "rgb(68, 42, 34)",
    secondaryContainer: "rgb(93, 64, 55)",
    onSecondaryContainer: "rgb(255, 219, 208)",
    tertiary: "rgb(215, 198, 141)",
    onTertiary: "rgb(58, 48, 5)",
    tertiaryContainer: "rgb(82, 70, 26)",
    onTertiaryContainer: "rgb(245, 226, 167)",
    background: "rgb(32, 26, 24)",
    onBackground: "rgb(237, 224, 220)",
    surface: "rgb(32, 26, 24)",
    onSurface: "rgb(237, 224, 220)",
    onSurfaceVariant: "rgb(216, 194, 188)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    outline: "rgb(160, 140, 135)",
    inverseSurface: "rgb(237, 224, 220)",
    inverseOnSurface: "rgb(54, 47, 45)",
    inversePrimary: "rgb(174, 50, 0)",
    danger: "#ff4444", // Add any additional danger color here if necessary
  },
};
