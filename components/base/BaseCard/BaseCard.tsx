import { useThemeContext } from "@/context/ThemeContext";
import { BorderRadius, Colors } from "@/theme/types";
import React from "react";
import { Pressable, TouchableOpacity, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

// Define prop types for the component to make it reusable
interface BaseCardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  color?: keyof Colors | undefined;
  borderRadius?: keyof BorderRadius; // Add the borderRadius prop
}

const BaseCard: React.FC<BaseCardProps> = ({
  children,
  style,
  onPress,
  disabled,
  color = "card",
  borderRadius = "lg",
}: BaseCardProps) => {
  const { commonStyles } = useThemeContext();

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.cardContainer,
        commonStyles.borderRadius(borderRadius),
        commonStyles.backgroundColor(color),
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  cardContainer: {
    backgroundColor: theme.colors.card,
    padding: theme.margin.xl,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
}));

export default BaseCard;
