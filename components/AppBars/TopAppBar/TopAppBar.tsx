import React, { useRef } from "react";
import { View } from "react-native";
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {
  router,
  usePathname,
  useRouter,
  useSegments,
  withLayoutContext,
} from "expo-router";

// Components
import ThemedView from "@/components/ui/ThemedView";
import ThemedText from "@/components/ui/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Translation
import { withUnistyles } from "react-native-unistyles";

// Create a typed MaterialTopTabs navigator
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  {}
>(Navigator);

const ThemedMaterialTopTabs = withUnistyles(MaterialTopTabs, (theme) => ({
  screenOptions: {
    sceneStyle: {
      backgroundColor: theme.colors.background,
      paddingVertical: theme.padding.sm,
      paddingHorizontal: theme.padding.sm,
    },
    tabBarStyle: {
      backgroundColor: theme.colors.surface2,
      elevation: 0,
    },
    tabBarLabelStyle: {
      fontFamily: theme.fontFamily.semiBold,
      fontSize: theme.fontSize.sm,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.outline,
    tabBarAllowFontScaling: true,
    tabBarGap: 0,
    tabBarIndicatorStyle: {
      backgroundColor: theme.colors.primary,
      height: 2,
    },
  },
}));

interface TopAppBarProps {
  title: string;
  actions?: {
    icon: React.ReactNode;
    onPress: () => void;
  }[];
  tabs: {
    name: string;
    title: string;
    icon: (props: {
      focused: boolean;
      color: string;
      size: number;
    }) => React.ReactNode;
  }[];
  renderFloatingButton?: () => React.ReactNode;
  size?: "regular" | "large";
  goBackEnabled?: boolean;
  tabBarScrollEnabled?: boolean;
  tabItemWidth?: number | null;
}

export default function TopAppBar({
  title,
  tabs,
  renderFloatingButton,
  goBackEnabled = true,
  actions = [],
  size = "regular",
  tabBarScrollEnabled = false,
  tabItemWidth = null,
}: TopAppBarProps) {
  const { commonStyles } = useThemeContext();

  return (
    <ThemedView
      style={{ paddingVertical: 0, paddingHorizontal: 0 }}
      statusBarHeaderStyle={commonStyles.borderBottom0}
      statusbarBackgroundColor="surface2"
      actions={actions}
      title={title}
      size={size}
      goBackEnabled={goBackEnabled}
      withBottomTabs={true}
    >
      {/* Tabs */}
      <ThemedMaterialTopTabs
        screenOptions={{
          tabBarScrollEnabled: tabBarScrollEnabled,
          tabBarItemStyle: tabItemWidth
            ? {
                width: tabItemWidth,
              }
            : {},
        }}
      >
        {tabs.map((tab) => (
          <MaterialTopTabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: tab.icon as any,
            }}
          />
        ))}
      </ThemedMaterialTopTabs>

      {/* Optional FloatingActionButton */}
      {renderFloatingButton && renderFloatingButton()}
    </ThemedView>
  );
}
