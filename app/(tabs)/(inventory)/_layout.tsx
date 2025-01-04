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

  const handleFabPress = () => {
    router.push("/(items)/add_item");
  };

  return (
    <TopAppBar
      title={getString("common.app.name")}
      renderFloatingButton={() => (
        <FabMenu
          mainIcon={
            <ThemedMaterialCommunityIcons
              name="plus"
              size={20}
              color="onPrimary"
            />
          }
          onPress={handleFabPress}
        />
      )}
      goBackEnabled={false}
      tabs={[
        {
          name: "items",
          title: getString("screen.items.title"),
          icon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={20}
              name={`${props.focused ? "cart" : "cart-outline"}`}
            />
          ),
        },
        {
          name: "load",
          title: getString("screen.load.title"),
          icon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={20}
              name={`${props.focused ? "cart-plus" : "cart-plus"}`}
            />
          ),
        },
      ]}
    />
  );
}
