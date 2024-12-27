import React, { useEffect } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import ThemedText from "@/components/ui/ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getString } from "@/strings/translations";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { UnistylesTheme } from "react-native-unistyles/lib/typescript/src/types";
import { ThemedMaterialIcons } from "@/components/ui/ThemedIcons";

const ThemedAnimatedView = withUnistyles(Animated.View);

interface BottomAppBarProps extends BottomTabBarProps {
  theme: UnistylesTheme;
}

// Allowed route names
const allowedRoutes = ["index", "items", "(transactions)", "settings"];

const TAB_WIDTH = Dimensions.get("window").width / allowedRoutes.length;

/**
 * Custom bottom tab bar component for navigation
 *
 * @component
 * @param {BottomAppBarProps} props - Navigation state and methods
 * @returns {React.ReactElement} Customized bottom tab bar
 */
const BottomAppBar: React.FC<BottomAppBarProps> = ({
  theme,
  state,
  navigation,
}: BottomAppBarProps): React.ReactElement => {
  // Shared value for underline position
  const translateX = useSharedValue(0);

  // Update translateX when the focused index changes
  useEffect(() => {
    translateX.value = withTiming(TAB_WIDTH * state.index, { duration: 300 });
  }, [state.index]);

  // Animated style for underline
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: TAB_WIDTH,
    height: 2,
    top: 0,
    position: "absolute",
    backgroundColor: theme.colors.primary,
  }));

  return (
    <View style={[styles.tabBar]}>
      <ThemedAnimatedView style={animatedStyle} />
      {state.routes
        .filter((route) => allowedRoutes.includes(route.name))
        .map((route, index) => {
          const isFocused = state.index === index;
          const iconSize = 24;

          const renderRouteContent = () => {
            switch (route.name) {
              case "index":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="home"
                      size={iconSize}
                      color={
                        isFocused ? theme.colors.primary : theme.colors.outline
                      }
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.home.title`)}
                    </ThemedText>
                  </>
                );
              case "items":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="history"
                      size={iconSize}
                      color={
                        isFocused ? theme.colors.primary : theme.colors.outline
                      }
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.items.title`)}
                    </ThemedText>
                  </>
                );
              case "(transactions)":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="group"
                      size={iconSize}
                      color={
                        isFocused ? theme.colors.primary : theme.colors.outline
                      }
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.transactions.title`)}
                    </ThemedText>
                  </>
                );
              case "settings":
                return (
                  <>
                    <ThemedMaterialIcons
                      name="settings"
                      size={iconSize - 4}
                      color={
                        isFocused ? theme.colors.primary : theme.colors.outline
                      }
                    />
                    <ThemedText
                      color={isFocused ? "primary" : "outline"}
                      fontSize="xs"
                    >
                      {getString(`screen.settings.title`)}
                    </ThemedText>
                  </>
                );
              default:
                return null;
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabButton]}
              onPress={() => navigation.navigate(route.name)}
            >
              <View style={styles.iconContainer}>{renderRouteContent()}</View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default withUnistyles(BottomAppBar, (theme) => ({
  theme: theme as UnistylesTheme,
}));

/**
 * Stylesheet for BottomAppBar using theme-based styling
 *
 * @param {Object} theme - The current application theme
 * @returns {Object} Styled object for tab bar components
 */
const styles = StyleSheet.create((theme, rt) => ({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: theme.colors.primaryOutline,
    position: "relative",
    backgroundColor: theme.colors.surface2,
    paddingTop: theme.padding.lg,
    paddingBottom: rt.insets.bottom + 5,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
  },
  iconContainer: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  underline: {
    top: 0,
    position: "absolute",
    backgroundColor: theme.colors.primary,
  },
  createGroupBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
}));
