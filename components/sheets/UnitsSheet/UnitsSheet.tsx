import React from "react";
import { getString } from "@/strings/translations";
import CategoriesList from "@/components/lists/CategoriesList";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import {
  SheetManager,
  SheetProps,
  useSheetRef,
} from "react-native-actions-sheet";
import { ThemedButton, ThemedMaterialCommunityIcons } from "@/components/ui";
import { commonStyles } from "@/theme/styles";
import { observer, use$ } from "@legendapp/state/react";
import UnitsList from "@/components/lists/UnitsList";
import AddUnitSheet from "../AddUnitSheet";
import { Unit } from "@/types/types";

const UnitsSheet: React.FC<SheetProps<"UnitsSheet">> = ({
  payload,
}: SheetProps<"UnitsSheet">) => {
  // Add Units sheet reference
  const ref = useSheetRef("AddUnitSheet");

  if (!payload) return null;

  const { value, onChange, multiple } = payload;

  const displayAddCategorySheet = () => {
    SheetManager.show("AddUnitSheet", {
      payload: {
        onChange,
      },
    });
  };

  return (
    <BaseBottomActionSheet
      title={getString("units.title")}
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
      <UnitsList value={value} onChange={onChange} multiple={multiple} />
    </BaseBottomActionSheet>
  );
};

export default observer(UnitsSheet);
