import { ThemeColors } from "@/theme/types";
import Color from "color";

export const getElevationColor = (colors: ThemeColors, elevation: number) => {
  return Color(colors.card)
    .mix(Color(colors.cardForeground), elevation)
    .rgb()
    .string();
};

export const getDimElevationColor = (colors: ThemeColors, elevation: number) => {
  return Color(colors.primary)
    .mix(Color(colors.primary), elevation)
    .rgb()
    .string();
};

export const getColorWithAlpha = (color: string, alpha: number) => {
  return Color(color).alpha(alpha).string();
};
