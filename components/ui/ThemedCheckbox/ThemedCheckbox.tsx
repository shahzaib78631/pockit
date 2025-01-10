import React from "react";
import { View, ViewProps, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";

// Define the props for the ThemedCheckbox component
interface ThemedCheckboxProps extends ViewProps {
  /**
   * The text label displayed next to the checkbox.
   */
  label: string;

  /**
   * The current value of the checkbox (true for checked, false for unchecked).
   */
  value: boolean;

  /**
   * Function to handle when the checkbox state changes.
   * @param newValue - The new state of the checkbox.
   */
  onValueChange: (newValue: boolean) => void;

  /**
   * Determines the position of the checkbox relative to the label.
   * Accepts either "left" or "right".
   * @default "left"
   */
  buttonPosition?: "left" | "right";

  checkmarkColor?: string;
}

const ThemedCheckbox: React.FC<ThemedCheckboxProps> = ({
  label,
  value,
  onValueChange,
  buttonPosition = "left",
  style,
  checkmarkColor,
  ...props
}) => {
  // Get the theme from the context
  const { theme } = useThemeContext();

  const handlePress = () => {
    onValueChange(!value); // Toggle the checkbox state
  };

  return (
    <TouchableOpacity
      onPress={handlePress} // Toggle the checkbox state with animation
      {...props}
      style={[
        style,
        styles.container,
        buttonPosition === "right" && styles.rowReverse,
      ]}
      activeOpacity={0.9}
    >
      {/* Checkbox element */}
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && (
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={checkmarkColor} // Checkmark color
          />
        )}
      </View>

      {/* Label text */}
      <ThemedText fontSize="md" color="foreground">
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default withUnistyles(ThemedCheckbox, (theme) => ({
  checkmarkColor: theme.colors.primaryForeground,
}));

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row", // Default direction for checkbox and label
    alignItems: "center", // Align items vertically in the center
  },
  rowReverse: {
    flexDirection: "row-reverse", // Reverse order for checkbox on the right
  },
  checkbox: {
    width: 20, // Width of the checkbox
    height: 20, // Height of the checkbox
    borderWidth: 1.5, // Border thickness for the checkbox
    borderColor: theme.colors.primaryOutlineVariant, // Border color for the checkbox
    borderRadius: 4, // Rounded corners
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    marginHorizontal: theme.margin.sm, // Spacing between checkbox and label
    backgroundColor: "transparent", // Default background color
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary, // Background color when checkbox is checked
  },
}));
