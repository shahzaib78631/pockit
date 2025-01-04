import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import CategoryForm from "@/forms/CategoryForm/CategoryForm";
import { View } from "react-native";
import { SheetProps } from "react-native-actions-sheet";

const FormFieldPickerSheet: React.FC<SheetProps<"FormFieldPicker">> = ({
  payload,
}: SheetProps<"FormFieldPicker">) => {
  if (!payload) return null;

  const { children, pickerSheetTitle, renderRightAction } = payload;

  return (
    <BaseBottomActionSheet
      title={pickerSheetTitle}
      renderRightAction={renderRightAction}
    >
      {children}
    </BaseBottomActionSheet>
  );
};

export default FormFieldPickerSheet;
