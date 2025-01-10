import { BorderRadius, Colors, FontSize } from "@/theme/types";
import React from "react";
import {
  TouchableOpacity,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator, // Import the ActivityIndicator for loading state
} from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { StyleSheet } from "react-native-unistyles";
import ThemedActivityIndicator from "@/components/ui/ThemedActivityIndicator";

interface ThemedButtonProps extends TouchableOpacityProps {
  /** The text to display on the button */
  title?: string;
  /** Additional styles for the button container */
  buttonStyle?: StyleProp<ViewStyle>;
  /** Variant of the button */
  variant?: "primary" | "secondary" | "outline" | "text" | "dashed-outline";
  /** Custom border radius */
  borderRadius?: keyof BorderRadius;
  /** Font size for the button label */
  fontSize?: keyof FontSize;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Color for the loading indicator */
  indicatorColor?: string;

  color?: keyof Colors;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  buttonStyle,
  variant = "primary",
  borderRadius = "md",
  fontSize = "md",
  loading = false, // Default loading is false
  indicatorColor,
  color,
  ...props
}) => {
  const { commonStyles } = useThemeContext();

  styles.useVariants({
    type: variant,
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        commonStyles.borderRadius(borderRadius),
        commonStyles.paddingMd,
        commonStyles.center,
        color && commonStyles.backgroundColor(color),
        buttonStyle,
        props.style,
      ]}
      disabled={loading} // Disable the button when loading is true
      {...props}
    >
      {loading ? (
        <ThemedActivityIndicator
          uniProps={(theme) => ({
            color: indicatorColor || theme.colors.primaryForeground,
          })}
        />
      ) : (
        title && (
          <ThemedText type={"bold"} fontSize={fontSize} style={styles.title}>
            {title}
          </ThemedText>
        )
      )}
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme) => ({
  borderRadius: (radius: keyof BorderRadius) => ({
    borderRadius: theme.borderRadius[radius],
  }),
  container: {
    borderWidth: 1,
    borderColor: "transparent",
    variants: {
      type: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
        text: { backgroundColor: "transparent" },
        "dashed-outline": {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
          borderStyle: "dashed",
        },
      },
      color: {
        primary: { borderColor: theme.colors.primary },
        secondary: { borderColor: theme.colors.secondary },
      },
    },
  },
  title: {
    variants: {
      type: {
        primary: { color: theme.colors.primaryForeground },
        secondary: { color: theme.colors.secondaryForeground },
        text: { color: theme.colors.primary },
        outline: { color: theme.colors.primary },
        "dashed-outline": { color: theme.colors.primary },
      },
    },
  },
  activityIndicator: {
    color: theme.colors.primaryForeground,
  },
}));

export default ThemedButton;
