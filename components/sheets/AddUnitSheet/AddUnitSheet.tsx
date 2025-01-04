import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import { UnitForm } from "@/forms";
import { View } from "react-native";
import { SheetProps } from "react-native-actions-sheet";
import { Unit } from "@/types/types";

const AddUnitSheet: React.FC<SheetProps<"AddUnitSheet">> = ({
  payload,
}: SheetProps<"AddUnitSheet">) => {
  const handleOnChange = (unit: Unit) => {
    if (payload?.onChange) {
      payload.onChange(unit);
    }
  };

  return (
    <BaseBottomActionSheet title={getString("units.add.title")}>
      <View style={{ height: 280 }}>
        <UnitForm unit={null} onChange={handleOnChange} />
      </View>
    </BaseBottomActionSheet>
  );
};

export default AddUnitSheet;
