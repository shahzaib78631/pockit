import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

// Sheets
import {
  AddCategorySheet,
  CategoriesSheet,
  UnitsSheet,
  FormFieldPickerSheet,
  AddUnitSheet,
} from "./";
import { Categories, Category, Unit } from "@/types/types";
import { ReactNode } from "react";

registerSheet("AddCategorySheet", AddCategorySheet);
registerSheet("AddUnitSheet", AddUnitSheet);
registerSheet("CategoriesSheet", CategoriesSheet);
registerSheet("UnitsSheet", UnitsSheet);
registerSheet("FormFieldPicker", FormFieldPickerSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    AddCategorySheet: SheetDefinition<{
      payload: {
        onChange: (category: Category) => void;
      };
    }>;
    AddUnitSheet: SheetDefinition<{
      payload: {
        onChange: (unit: Unit) => void;
      };
    }>;
    CategoriesSheet: SheetDefinition<{
      payload: {
        value: Category["id"] | null;
        onChange: (category: Category) => void;
      };
    }>;
    UnitsSheet: SheetDefinition<{
      payload: {
        value: Unit["id"] | Unit["id"][] | null;
        onChange: (unit: Unit, checked?: boolean) => void;
        multiple?: boolean;
      };
    }>;
    FormFieldPicker: SheetDefinition<{
      payload: {
        children: ReactNode;
        pickerSheetTitle: string;
        renderRightAction: (() => React.JSX.Element) | undefined;
      };
    }>;
  }
}

export {};
