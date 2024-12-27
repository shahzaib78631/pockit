import React, { ReactNode } from "react";
import {
  SafeAreaView,
  View,
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  withDelay,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  SharedValue,
} from "react-native-reanimated";

import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { UnistylesTheme } from "react-native-unistyles/lib/typescript/src/types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

// Offset for expanding buttons
const OFFSET = 60;

const shadow = {
  shadowColor: "#171717",
  shadowOffset: { width: -0.5, height: 3.5 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
};

interface Action {
  icon: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

interface FloatingActionButtonProps {
  isExpanded: SharedValue<boolean>;
  index: number;
  icon: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

const FloatingButton = ({
  isExpanded,
  index,
  icon,
  onPress,
  buttonStyle,
  backgroundColor = "#fff",
}: FloatingActionButtonProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;
    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  const baseButtonStyle: ViewStyle = {
    width: 40,
    height: 40,
    position: "absolute",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -2,
    flexDirection: "row",
    backgroundColor,
  };

  return (
    <AnimatedPressable
      style={[animatedStyles, shadow, baseButtonStyle, buttonStyle]}
      onPress={onPress}
    >
      {icon}
    </AnimatedPressable>
  );
};

interface FabMenuProps {
  theme: UnistylesTheme;
  mainIcon: ReactNode;
  actions: Action[];
  mainButtonColor?: string;
  backdropColor?: string;
  onToggle?: (expanded: boolean) => void;
}

/**
 * FabMenu - A reusable floating action button menu component.
 *
 * Props:
 * - theme: Injected theme (if using Unistyles or your own theming solution)
 * - mainIcon: A ReactNode representing the main FAB icon.
 * - actions: An array of actions { icon: ReactNode; onPress: Function }
 * - mainButtonColor: Background color of the main FAB.
 * - backdropColor: Color of the backdrop overlay.
 * - onToggle: Optional callback fired when the menu is toggled.
 */
function FabMenu({
  theme,
  mainIcon,
  actions,
  mainButtonColor = theme.colors.primary,
  backdropColor = theme.colors.background,
  onToggle,
}: FabMenuProps) {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
    onToggle?.(isExpanded.value);
  };

  // Animated style for the main FAB rotation
  const mainIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  // Animated style for backdrop
  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded.value ? 0.5 : 0, { duration: 300 }),
      pointerEvents: isExpanded.value ? "auto" : "none",
    };
  });

  const backdrop: ViewStyle = {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: backdropColor,
    zIndex: 0,
  };

  const mainButtonStyle: ViewStyle = {
    zIndex: 1,
    height: 60,
    width: 60,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: mainButtonColor,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatedPressable
        onPress={handlePress}
        style={[backdrop, backdropStyle]}
      />
      <SafeAreaView>
        <View style={styles(theme).mainContainer}>
          <View style={styles(theme).buttonContainer}>
            {/* Main FAB */}
            <AnimatedPressable
              onPress={handlePress}
              style={[shadow, mainButtonStyle]}
            >
              <AnimatedView style={mainIconStyle}>{mainIcon}</AnimatedView>
            </AnimatedPressable>
            {/* Additional floating buttons */}
            {actions.map((action, index) => (
              <FloatingButton
                key={index}
                isExpanded={isExpanded}
                index={index + 1}
                icon={action.icon}
                onPress={action.onPress}
                backgroundColor={theme.colors.secondaryContainer}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default withUnistyles(FabMenu, (theme) => ({ theme }));

// Styles
const styles = (theme: UnistylesTheme) =>
  StyleSheet.create({
    mainContainer: {
      position: "relative",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      bottom: theme.spacing.lg,
      right: theme.spacing.lg,
    },
    buttonContainer: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  });
