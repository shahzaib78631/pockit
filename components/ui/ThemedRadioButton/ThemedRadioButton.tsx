import React from "react";
import { View, ViewProps, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import ThemedText from "@/components/ui/ThemedText";

// Define the props for the ThemedRadioButton component
interface ThemedRadioButtonProps extends ViewProps {
  /**
   * The text label displayed next to the radioButton.
   */
  label: string;

  /**
   * The current value of the radioButton (true for checked, false for unchecked).
   */
  value: boolean;

  /**
   * Function to handle when the radioButton state changes.
   * @param newValue - The new state of the radioButton.
   */
  onValueChange: (newValue: boolean) => void;

  /**
   * Determines the position of the radioButton relative to the label.
   * Accepts either "left" or "right".
   * @default "left"
   */
  buttonPosition?: "left" | "right";
}

const ThemedRadioButton: React.FC<ThemedRadioButtonProps> = ({
  label,
  value,
  onValueChange,
  buttonPosition = "left",
  style,
  ...props
}) => {
  const handlePress = () => {
    onValueChange(!value); // Toggle the radioButton state
  };

  return (
    <TouchableOpacity
      onPress={handlePress} // Toggle the radioButton state with animation
      {...props}
      style={[
        style,
        styles.container,
        buttonPosition === "right" && styles.rowReverse,
      ]}
      activeOpacity={0.9}
    >
      {/* RadioButton element */}
      <View style={[styles.radioButton]}>
        {value && <View style={styles.dot} />}
      </View>

      {/* Label text */}
      <ThemedText fontSize="md" color="foreground">
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default ThemedRadioButton;

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row", // Default direction for radioButton and label
    alignItems: "center", // Align items vertically in the center
  },
  rowReverse: {
    flexDirection: "row-reverse", // Reverse order for radioButton on the right
  },
  radioButton: {
    width: 20, // Width of the radioButton
    height: 20, // Height of the radioButton
    borderWidth: 1.5, // Border thickness for the radioButton
    borderColor: theme.colors.primaryOutlineVariant, // Border color for the radioButton
    borderRadius: 10, // Rounded corners
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    marginHorizontal: theme.margin.sm, // Spacing between radioButton and label
    backgroundColor: "transparent", // Default background color
  },
  radioButtonChecked: {
    backgroundColor: theme.colors.primary, // Background color when radioButton is checked
  },
  dot: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    width: 12,
    height: 12,
  },
}));
