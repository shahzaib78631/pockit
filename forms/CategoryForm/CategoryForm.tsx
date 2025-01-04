import { Text, View } from "react-native";
import React, { FC } from "react";
import { FormField } from "@/components/form";
import useCategoryForm from "@/hooks/useCategoryForm";
import { Category } from "@/types/types";
import { StyleSheet } from "react-native-unistyles";
import { getString } from "@/strings/translations";
import { ThemedButton } from "@/components/ui";
import { commonStyles } from "@/theme/styles";

type CategoryForm = {
  category: Category | null;
  onChange?: (category: Category) => void;
};

const CategoryForm: FC<CategoryForm> = ({ category, onChange }) => {
  const { control, errors, handleSubmit, updateCategory, createCategory } =
    useCategoryForm({
      category,
      onChange,
    });

  const handleFormSubmit = () => {
    if (category) {
      handleSubmit(updateCategory)();
    } else {
      handleSubmit(createCategory)();
    }
  };

  return (
    <View>
      <View style={commonStyles.marginBottomXl}>
        <FormField
          control={control}
          name="name"
          error={errors.name}
          label={getString("categories.name.label")}
          placeholder={getString("categories.name.placeholder")}
        />
        <FormField
          control={control}
          name="description"
          error={errors.description}
          label={getString("categories.description.label")}
          placeholder={getString("categories.description.placeholder")}
          containerStyle={{ height: 80 }}
        />
      </View>

      <ThemedButton
        title={getString("common.save.label")}
        onPress={handleFormSubmit}
      />
    </View>
  );
};

export default CategoryForm;

const styles = StyleSheet.create((theme) => ({}));
