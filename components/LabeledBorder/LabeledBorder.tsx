import React from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ThemedText } from "../ui";

interface LabeledBorderProps {
  label: string; // Label text
  children: React.ReactNode; // Components inside the border
  borderStyle?: StyleProp<ViewStyle>; // Custom styles for the border
  labelStyle?: StyleProp<TextStyle>; // Custom styles for the label
}

const LabeledBorder: React.FC<LabeledBorderProps> = ({
  label,
  children,
  borderStyle,
  labelStyle,
}) => {
  return (
    <View>
      <ThemedText
        color={"foreground"}
        fontSize="md"
        style={[styles.label, labelStyle]}
      >
        {label}
      </ThemedText>
      <View style={[styles.border, borderStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  border: {
    borderWidth: 1,
    borderColor: theme.colors.foreground,
    borderRadius: theme.borderRadius.md,
    padding: theme.padding.md,
    borderStyle: "dashed",
    paddingTop: 18,
  },
  label: {
    position: "absolute",
    top: -8,
    left: 20,
    backgroundColor: theme.colors.background, // Matches background to hide border behind the text
    paddingHorizontal: 5,
    zIndex: 1,
  },
}));

export default LabeledBorder;
