import { DimensionValue } from "react-native";

export interface MD3ThemeType {
  id: number;
  name: string;
  isDark: boolean;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  outline: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  danger: string;
}

export interface ThemeColors extends MD3ThemeType {
  code: string;
  overlay?: string;
  rippleColor?: string;
  surface2?: string;
  surfaceReader?: string;
  primaryOutline?: string;
  onSurfaceVariant?: string;
  primaryOutlineVariant?: string;
}

export interface ThemeType {
  light: ThemeColors;
  dark: ThemeColors;
}

export interface Margins {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl?: number; // Optional, for extended sizes
  xxxl?: number; // Optional, for even larger margins
  auto?: DimensionValue; // Optional, for auto margins
}

export interface Paddings {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl?: number; // Optional
  xxxl?: number; // Optional
}

export interface FontSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl?: number; // Optional, for extra-large fonts
  display?: number; // Optional, for display-level fonts
  hero?: number; // Optional, for hero text
}

export interface FontFamily {
  regular: string;
  bold: string;
  medium: string;
  light: string;
  thin: string;
  semiBold: string;
  extraBold: string;
  extraLight: string;
}

export interface BorderRadius {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl?: number; // Optional
  full?: number; // Optional, for fully circular elements
}

export interface Shadows {
  none: ShadowStyle;
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
  xl: ShadowStyle;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number; // Android-specific
}

export interface ZIndex {
  auto: string;
  dropdown: number;
  sticky: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export interface Spacing {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl?: number; // Optional
  xxxl?: number; // Optional
}

export interface BaseTheme {
  margin: Margins;
  fontSize: FontSize;
  padding: Paddings;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  zIndex: ZIndex;
  fontFamily: FontFamily;
}

export interface Theme extends BaseTheme {
  id: number;
  name: string;
  isDark: boolean;
  code: string;
  colors: ThemeColors;
}

export type Colors = Omit<ThemeColors, "id" | "name" | "isDark">;
