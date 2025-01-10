import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ViewProps,
  ScrollViewProps,
} from "react-native";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Colors } from "@/theme/types";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { ThemedMaterialIcons } from "@/components/ui/ThemedIcons";
import ThemedButton from "../ThemedButton";
import ThemedActivityIndicator from "../ThemedActivityIndicator";

const ThemedKeyboardAwareScrollView = withUnistyles(KeyboardAwareScrollView);

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  style,
  statusBarHeaderStyle,
  title,
  titleAlignment = "left", // default alignment
  size = "regular", // default size
  scrollEnabled = false,
  goBackEnabled = true,
  statusbarBackgroundColor = "card",
  actions = [],
  loading = false,
  withBottomTabs = false,
  ...props
}: ThemedViewProps): React.ReactElement => {
  const { commonStyles } = useThemeContext();
  const router = useRouter();

  const canGoBack = router?.canGoBack();

  // Dynamic styles for title alignment and position
  styles.useVariants({
    textAlignment: titleAlignment,
  });

  return (
    <View style={[commonStyles.flex1]}>
      {/* Status bar spacer */}
      <View
        style={[
          styles.statusBarStyle,
          commonStyles.backgroundColor(statusbarBackgroundColor),
        ]}
      />

      {/* Top Bar */}
      {(title || (canGoBack && goBackEnabled)) && (
        <View
          style={[
            commonStyles.paddingHorizontalMd,
            withBottomTabs
              ? commonStyles.paddingVerticalMd
              : commonStyles.paddingVerticalXl,
            commonStyles.rowJustifySpaceBetween,
            commonStyles.rowAlignCenter,
            commonStyles.backgroundColor("card"),
            size === "large" && {
              flexDirection: "column",
              alignItems: "flex-start",
            }, // Adjust for large size
          ]}
        >
          <View style={[commonStyles.rowAlignCenter, commonStyles.width100]}>
            <View style={[commonStyles.rowAlignCenter]}>
              {canGoBack && goBackEnabled && (
                <ThemedButton
                  variant="text"
                  onPress={() => router.dismiss()}
                  style={{ marginRight: 16 }}
                >
                  <ThemedMaterialIcons
                    name="arrow-back"
                    size={18}
                    color="cardForeground"
                  />
                </ThemedButton>
              )}
            </View>

            {size === "regular" && (
              <ThemedText
                type="bold"
                fontSize="xxl"
                color="cardForeground"
                style={styles.title}
              >
                {title}
              </ThemedText>
            )}
            <View
              style={[
                commonStyles.rowAlignCenter,
                commonStyles.marginLeft("auto"),
                commonStyles.gapHorizontalMd,
              ]}
            >
              {actions.map((action, index) => (
                <ThemedButton
                  key={index}
                  variant="text"
                  style={commonStyles.paddingNone}
                  onPress={action.onPress}
                >
                  {action.icon}
                </ThemedButton>
              ))}
            </View>
          </View>
          {
            // Large size title
            size === "large" && (
              <View style={[commonStyles.marginTopXl, commonStyles.width100]}>
                <ThemedText
                  type="medium"
                  fontSize="xl"
                  color="cardForeground"
                  style={styles.largeTitle}
                >
                  {title}
                </ThemedText>
              </View>
            )
          }
        </View>
      )}

      {scrollEnabled && (
        <ThemedKeyboardAwareScrollView
          style={commonStyles.container}
          {...props}
          contentContainerStyle={styles.contentContainer}
          bottomOffset={20}
          showsVerticalScrollIndicator={false}
        >
          {loading ? <ThemedActivityIndicator /> : children}
        </ThemedKeyboardAwareScrollView>
      )}
      {!scrollEnabled && (
        <View
          style={[
            commonStyles.container,
            commonStyles.paddingVerticalXl,
            style,
          ]}
        >
          {loading ? <ThemedActivityIndicator /> : children}
        </View>
      )}
    </View>
  );
};

export default ThemedView;

// Updated Props Interface
interface ThemedViewProps extends ViewProps, ScrollViewProps {
  statusBarHeaderStyle?: ViewProps["style"];
  style?: ViewProps["style"];
  children?: React.ReactNode;
  title?: string;
  statusbarBackgroundColor?: keyof Colors;
  scrollEnabled?: boolean;
  goBackEnabled?: boolean;
  actions?: { icon: React.ReactNode; onPress: () => void }[];
  titleAlignment?: "left" | "center" | "right"; // New prop
  size?: "regular" | "large"; // New prop
  loading?: boolean;
  withBottomTabs?: boolean;
}

// Updated Styles
const styles = StyleSheet.create((theme, rt) => ({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primaryOutline,
  },
  statusBarStyle: {
    height: rt.insets.top,
    paddingHorizontal: theme.padding.lg,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    gap: theme.spacing.md,
    paddingVertical: theme.padding.sm,
    flexGrow: 1,
  },
  title: {
    flex: 1,
    variants: {
      textAlignment: {
        left: {
          textAlign: "left",
        },
        center: {
          textAlign: "center",
        },
        right: {
          textAlign: "right",
        },
      },
    },
  },
  largeTitle: {
    variants: {
      textAlignment: {
        left: {
          textAlign: "left",
        },
        center: {
          textAlign: "center",
        },
        right: {
          textAlign: "right",
        },
      },
    },
  },
}));
