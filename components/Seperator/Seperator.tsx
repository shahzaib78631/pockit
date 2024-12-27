import { useThemeContext } from "@/context/ThemeContext";
import { Colors, Margins } from "@/theme/types";
import React from "react";
import { DimensionValue, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

// Define prop types for the component to make it reusable
interface SeperatorProps {
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  color?: keyof Colors | (string & {});
  margin?: DimensionValue | keyof Margins | undefined;
}

const Seperator: React.FC<SeperatorProps> = ({
  height = 1,
  width = "100%",
  color,
  margin,
}) => {
  return (
    <View
      style={styles.container({
        width,
        height,
        color,
        margin,
      })}
    />
  );
};

const styles = StyleSheet.create((theme) => ({
  container: ({ width, height, color, margin }: SeperatorProps) => ({
    width,
    height,
    backgroundColor: ((theme.colors[color as keyof Colors] ?? color) ||
      theme.colors.outline) as string,
    marginVertical: ((theme.margin[color as keyof Margins] ?? margin) ||
      theme.margin.xs) as DimensionValue,
  }),
}));

export default Seperator;
