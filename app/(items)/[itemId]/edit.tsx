import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemForm from "@/forms/ItemForm/ItemForm";
import { ThemedView } from "@/components/ui";
import { getString } from "@/strings/translations";
import { useAppContext } from "@/context/AppContext";
import { useLocalSearchParams } from "expo-router";

const EditItem = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();

  const { store$ } = useAppContext();

  return (
    <ThemedView
      statusbarBackgroundColor="card"
      title={getString("items.edit")}
      goBackEnabled={true}
      scrollEnabled
    >
      <ItemForm edit={true} item={store$.ItemsStore.getItem(itemId)} />
    </ThemedView>
  );
};

export default EditItem;

const styles = StyleSheet.create({});
