import React, { useMemo, useState } from "react";
import { View, TextInput, TextInputProps, Pressable } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import {
  UnistyleText,
  UnistyleView,
} from "react-native-unistyles/lib/typescript/src/types";

/**
 * Props interface for ThemedTextInput component
 */
export interface ThemedTextInputProps extends TextInputProps {
  label?: string;
  isLabelVisible?: boolean;
  containerStyle?: UnistyleView;
  inputStyle?: UnistyleText;
  labelStyle?: UnistyleText;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  error?: string;
}

/**
 * Themed text input component with customizable label and addons
 *
 * @component
 * @param {ThemedTextInputProps} props - Component configuration
 * @returns {React.ReactElement} Styled text input with optional label and addons
 */
const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  inputStyle,
  labelStyle,
  isLabelVisible = true,
  prepend,
  append,
  onPress,
  error,
  ...rest
}: ThemedTextInputProps): React.ReactElement => {
  const { commonStyles } = useThemeContext();
  const [isFocused, setIsFocused] = useState(false);

  styles.useVariants({
    isFocused,
    prepend: !!prepend,
    append: !!append,
  });

  const theme = useMemo(
    () => UnistylesRuntime.getTheme(),
    [UnistylesRuntime.themeName]
  );

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.container,
        error ? commonStyles.borderColor("error") : {},
        containerStyle,
      ]}
    >
      {isLabelVisible && label && (
        <ThemedText fontSize="sm" style={labelStyle}>
          {label}
        </ThemedText>
      )}

      <View style={[styles.inputContainer]}>
        {prepend && <View style={[commonStyles.center]}>{prepend}</View>}

        <TextInput
          style={[styles.input, commonStyles.flex1, inputStyle]}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={theme.colors.mutedForeground}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onPress={onPress}
          {...rest}
        />
        {append && <View style={[commonStyles.center]}>{append}</View>}
      </View>
    </Pressable>
  );
};

/**
 * Stylesheet for ThemedTextInput using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for themed text input components
 */
const styles = StyleSheet.create((theme) => ({
  container: {
    flexGrow: 1,
    marginVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.padding.lg,
    backgroundColor: theme.colors.card,
    paddingVertical: theme.spacing.sm,
    overflow: "hidden",
    height: 48,
    variants: {
      isFocused: {
        true: { borderColor: theme.colors.ring, borderWidth: 1 },
      },
    },
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.card,
    position: "relative",
    columnGap: theme.spacing.md,
    variants: {
      prepend: {
        true: {
          paddingHorizontal: theme.padding.none,
        },
      },
      append: {
        true: {
          paddingHorizontal: theme.padding.none,
        },
      },
    },
  },
  input: {
    color: theme.colors.cardForeground,
  },
}));

export default ThemedTextInput;
