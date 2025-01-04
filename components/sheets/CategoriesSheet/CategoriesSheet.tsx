import React from "react";
import { getString } from "@/strings/translations";
import CategoriesList from "@/components/lists/CategoriesList";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import {
  ThemedButton,
  ThemedMaterialCommunityIcons,
  ThemedMaterialIcons,
} from "@/components/ui";
import { commonStyles } from "@/theme/styles";
import { observer, use$ } from "@legendapp/state/react";
import { categoriesTable$ } from "@/store/categories";

const CategoriesSheet: React.FC<SheetProps<"CategoriesSheet">> = ({
  payload,
}: SheetProps<"CategoriesSheet">) => {
  if (!payload) return null;

  const { value, onChange } = payload;

  const displayAddCategorySheet = () => {
    SheetManager.show("AddCategorySheet");
  };

  return (
    <BaseBottomActionSheet
      title={getString("categories.title")}
      renderRightAction={() => (
        <ThemedButton
          buttonStyle={commonStyles.paddingSm}
          onPress={displayAddCategorySheet}
        >
          <ThemedMaterialCommunityIcons
            size={18}
            name="plus"
            color="onPrimary"
          />
        </ThemedButton>
      )}
    >
      <CategoriesList value={value} onChange={onChange} />
    </BaseBottomActionSheet>
  );
};

export default observer(CategoriesSheet);
