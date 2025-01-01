import React from "react";

// Icons
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import FabMenu from "@/components/FabMenu";

// Translation
import { getString } from "@/strings/translations";
import TopAppBar from "@/components/AppBars/TopAppBar/TopAppBar";
import { ThemedMaterialCommunityIcons } from "@/components/ui/ThemedIcons";
import { SheetManager } from "react-native-actions-sheet";
import { useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  const fabMenuActions = [
    {
      icon: (
        <ThemedMaterialCommunityIcons name="link" size={18} color="secondary" />
      ),
      onPress: () => {
        SheetManager.show("AddGroupByUrlSheet");
      },
    },
  ];

  return (
    <TopAppBar
      title={getString("screen.transactions.title")}
      renderFloatingButton={() => (
        <FabMenu
          mainIcon={
            <ThemedMaterialCommunityIcons
              name="plus"
              size={20}
              color="onPrimary"
            />
          }
          actions={fabMenuActions}
        />
      )}
      goBackEnabled={false}
      tabs={[
        {
          name: "today",
          title: getString("transactions.today"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "clockcircle" : "clockcircleo"}`}
            />
          ),
        },
        {
          name: "history",
          title: getString("transactions.history"),
          icon: (props) => (
            <AntDesign
              {...props}
              size={16}
              name={`${props.focused ? "star" : "staro"}`}
            />
          ),
        },
      ]}
    />
  );
}
