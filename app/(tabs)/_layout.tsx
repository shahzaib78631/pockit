import React from "react";
import { Tabs } from "expo-router";

// Translation
import { getString } from "@/strings/translations";
import { BottomAppBar } from "@/components/AppBars";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabsLayout: React.FC = () => {
  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <BottomAppBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: getString("screen.home.title"),
          headerTitle: getString("screen.home.title"),
        }}
      />
      <Tabs.Screen
        name="(inventory)"
        options={{
          title: getString("screen.inventory.title"),
          headerTitle: getString("screen.inventory.title"),
        }}
      />
      <Tabs.Screen
        name="(transactions)"
        options={{
          title: getString("screen.transactions.title"),
          headerTitle: getString("screen.transactions.title"),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: getString("screen.settings.title"),
          headerTitle: getString("screen.settings.title"),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
