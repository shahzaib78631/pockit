import React from "react";
import { View } from "react-native";

// Translation
import { getString } from "@/strings/translations";

// Components
import ThemedText from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import ThemedButton from "@/components/ui/ThemedButton";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Styles
import { StyleSheet } from "react-native-unistyles";

// Clipboard
import * as Clipboard from "expo-clipboard";
import { SheetProps } from "react-native-actions-sheet";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import { ThemedMaterialIcons } from "@/components/ui/ThemedIcons";

const ShareGroupUrlSheet: React.FC<SheetProps<"ShareGroupUrlSheet">> = ({
  payload,
}) => {
  if (!payload) return null;

  const { groupId } = payload;

  const { commonStyles } = useThemeContext();

  const Link = `https://spliit.app/groups/${groupId}/expenses?ref=share`;

  // Function to copy the group link to the clipboard
  const copyGroupLink = () => {
    // Copy the group link to the clipboard
    Clipboard.setUrlAsync(Link);
  };

  return (
    <BaseBottomActionSheet snapPoints={[100]} title={getString("share.title")}>
      <View style={commonStyles.gapVerticalMd}>
        <ThemedText type="light" fontSize="md">
          {getString("share.description")}
        </ThemedText>
        <View
          style={[commonStyles.rowAlignCenter, commonStyles.gapHorizontalMd]}
        >
          <ThemedTextInput
            value={Link}
            editable={false}
            prepend={
              <ThemedMaterialIcons name="link" color="onSurface" size={18} />
            }
          />
          <View>
            <ThemedButton onPress={copyGroupLink}>
              <ThemedMaterialIcons
                name="copy-all"
                color="onPrimary"
                size={18}
              />
            </ThemedButton>
          </View>
        </View>

        <View style={styles.warningContainer}>
          <ThemedText
            type="bold"
            fontSize="lg"
            color="error"
            style={commonStyles.gapMd}
          >
            {getString("share.warning")}
          </ThemedText>
          <ThemedText
            type="light"
            fontSize="md"
            color="onSurface"
            style={commonStyles.gapMd}
          >
            {getString("share.warninghelp")}
          </ThemedText>
        </View>
      </View>
    </BaseBottomActionSheet>
  );
};

const styles = StyleSheet.create((theme) => ({
  warningContainer: {
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.error,
    padding: theme.padding.md,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
}));

export default ShareGroupUrlSheet;
