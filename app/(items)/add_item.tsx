import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemForm from "@/forms/ItemForm";
import { ThemedView } from "@/components/ui";
import { getString } from "@/strings/translations";

const AddItem = () => {
  return (
    <ThemedView
      statusbarBackgroundColor="card"
      title={getString("items.add")}
      goBackEnabled={true}
      scrollEnabled
    >
      <ItemForm edit={false} item={null} />
    </ThemedView>
  );
};

export default AddItem;

const styles = StyleSheet.create({});
