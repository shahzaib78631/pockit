import { ThemeColors } from "@/theme/types";
import Color from "color";

export const getElevationColor = (colors: ThemeColors, elevation: number) => {
  return Color(colors.surface)
    .mix(Color(colors.primary), elevation)
    .rgb()
    .string();
};

export const getColorWithAlpha = (color: string, alpha: number) => {
  return Color(color).alpha(alpha).string();
};
