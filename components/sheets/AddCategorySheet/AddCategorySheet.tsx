import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import CategoryForm from "@/forms/CategoryForm/CategoryForm";
import { View } from "react-native";
import { SheetProps } from "react-native-actions-sheet";
import { Category } from "@/types/types";

const AddCategorySheet: React.FC<SheetProps<"AddCategorySheet">> = ({
  payload,
}: SheetProps<"AddCategorySheet">) => {
  const handleOnChange = (category: Category) => {
    if (payload?.onChange) {
      payload.onChange(category);
    }
  };

  return (
    <BaseBottomActionSheet title={getString("categories.add.title")}>
      <View style={{ height: 280 }}>
        <CategoryForm category={null} onChange={handleOnChange} />
      </View>
    </BaseBottomActionSheet>
  );
};

export default AddCategorySheet;
