import React from "react";
import { getString } from "@/strings/translations";
import CategoriesList from "@/components/lists/CategoriesList";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import { SheetProps } from "react-native-actions-sheet";

const CategoriesSheet: React.FC<SheetProps<"CategoriesSheet">> = ({
  payload,
}: SheetProps<"CategoriesSheet">) => {
  if (!payload) return null;

  const { categories, value, onChange } = payload;

  return (
    <BaseBottomActionSheet title={getString("categories.title")}>
      <CategoriesList
        categories={categories}
        value={value}
        onChange={onChange}
      />
    </BaseBottomActionSheet>
  );
};

export default CategoriesSheet;
