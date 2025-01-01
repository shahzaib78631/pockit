import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  ThemedButton,
  ThemedList,
  ThemedMaterialCommunityIcons,
  ThemedMaterialIcons,
  ThemedView,
} from "@/components/ui";
import { ItemsListItemCard } from "@/components/cards";
import FabMenu from "@/components/FabMenu";
import { getString } from "@/strings/translations";
import { useRouter } from "expo-router";
import { observer } from "@legendapp/state/react";
import { Tables } from "@/database/database.types";
import { ItemsStore$ } from "@/store/items";
import { Item } from "@/types/types";

const items = observer(() => {
  // Get the todos from the state and subscribe to updates
  const items = ItemsStore$.get().getItems();

  const router = useRouter();

  const handleNavigateToCreateItem = () => {
    router.push("/(items)/add_item");
  };

  const handleItemPress = (item: Item) => {
    router.push({
      pathname: `/(items)/[itemId]/edit`,
      params: {
        itemId: item.id,
      },
    });
  };

  return (
    <ThemedView goBackEnabled={false}>
      <ThemedList
        keyExtractor={({ id, updated_at }) => `${id}-${updated_at}`}
        data={items}
        searchEnabled={true}
        searchConfig={{
          extractSearchableText(item) {
            return item.name;
          },
        }}
        searchProps={{
          placeholder: getString("common.search"),
          prepend: (
            <ThemedMaterialCommunityIcons
              name="magnify"
              size={18}
              color={"onSurface"}
            />
          ),
          append: (
            <ThemedMaterialCommunityIcons
              name="filter-variant"
              size={18}
              color={"onSurface"}
            />
          ),
        }}
        renderItem={({ item }: { item: Tables<"items"> }) => (
          <ItemsListItemCard item={item} onPress={handleItemPress} />
        )}
      />
      <FabMenu
        mainIcon={
          <ThemedMaterialIcons name="add" size={18} color="onPrimary" />
        }
        onPress={handleNavigateToCreateItem}
      />
    </ThemedView>
  );
});

export default items;

const styles = StyleSheet.create({});
