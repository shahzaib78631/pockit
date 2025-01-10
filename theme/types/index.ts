import { DimensionValue } from "react-native";

export interface MD3ThemeType {
  id: number;
  name: string;
  isDark: boolean;
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

export interface ThemeColors extends MD3ThemeType {
  code: string;
  overlay?: string;
  rippleColor?: string;
  surface?: string;
  primaryOutline?: string;
  surfaceVariant?: string;
  primaryOutlineVariant?: string;
  onBackgroundDim?: string;
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
