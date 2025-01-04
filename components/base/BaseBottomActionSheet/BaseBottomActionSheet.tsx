import { Text, View } from "react-native";
import React from "react";

// Action Sheet
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from "react-native-actions-sheet";

// Safe area
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Styles
import { withUnistyles } from "react-native-unistyles";
import { commonStyles } from "@/theme/styles";

// Components
import ThemedText, { ThemedTextProps } from "@/components/ui/ThemedText";

// Themed Action Sheet
const ThemedActionSheet = withUnistyles(ActionSheet, (theme) => ({
  indicatorStyle: {
    marginVertical: theme.margin.md,
    backgroundColor: theme.colors.primary,
  },
  containerStyle: {
    paddingHorizontal: theme.padding.lg,
    backgroundColor: theme.colors.background,
  },
}));

interface BaseBottomActionSheetProps extends ActionSheetProps {
  /**
   * The height of the bottom sheet.
   */
  snapPoints?: number[];

  /**
   * The children elements that will be rendered inside the BottomSheet.
   */
  children?: React.ReactNode;

  /**
   * The title of the bottom sheet.
   */
  title: string;

  /**
   * Additional props for the title.
   */
  titleProps?: ThemedTextProps;

  reference?: React.RefObject<ActionSheetRef> | null;

  renderRightAction?: () => React.JSX.Element;
}

const BaseBottomActionSheet = ({
  snapPoints,
  children,
  title,
  titleProps,
  reference,
  renderRightAction,
}: BaseBottomActionSheetProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ThemedActionSheet
      ref={reference}
      snapPoints={snapPoints}
      headerAlwaysVisible
      gestureEnabled
      safeAreaInsets={insets}
      useBottomSafeAreaPadding
      overdrawEnabled={false}
    >
      <View
        style={[
          commonStyles.rowJustifySpaceBetween,
          commonStyles.alignCenter,
          commonStyles.marginBottomMd,
        ]}
      >
        {title && (
          <ThemedText
            type="bold"
            fontSize="xxl"
            color="primary"
            {...titleProps}
          >
            {title}
          </ThemedText>
        )}
        {renderRightAction && renderRightAction()}
      </View>
      {children}
    </ThemedActionSheet>
  );
};

export default BaseBottomActionSheet;
