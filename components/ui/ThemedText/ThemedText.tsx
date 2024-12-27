import { commonStyles } from "@/theme/styles";
import { Colors, FontSize } from "@/theme/types";
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

export interface ThemedTextProps extends TextProps {
  /** Content of the text */
  children: React.ReactNode;
  /** Font type to apply */
  type?: "regular" | "bold" | "thin" | "ultraLight" | "light" | "medium";
  /** Font size to apply */
  fontSize?: keyof FontSize;
  /** Text color to apply from theme */
  color?: keyof Colors;
  /** Text alignment */
  textAlign?: TextStyle["textAlign"];
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  style,
  type = "light",
  fontSize = "md",
  color = "onSurface", // Default color
  textAlign = "auto", // Default alignment
  ...otherProps
}) => {
  return (
    <Text
      {...otherProps}
      style={[
        commonStyles.fontFamily(type),
        commonStyles.fontSize(fontSize),
        commonStyles.color(color),
        commonStyles.textAlign(textAlign),
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
