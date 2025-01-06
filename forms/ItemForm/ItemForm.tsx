import { Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  ThemedButton,
  ThemedMaterialCommunityIcons,
  ThemedMaterialIcons,
  ThemedText,
} from "@/components/ui";
import { FormField } from "@/components/form";
import useItemForm from "@/hooks/useItemForm";
import { getString } from "@/strings/translations";
import { useThemeContext } from "@/context/ThemeContext";
import { useAppContext } from "@/context/AppContext";
import { For, Show } from "@legendapp/state/react";
import { Category, Item, Unit } from "@/types/types";
import { Barcode } from "expo-barcode-generator";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { CategoriesList } from "@/components/lists";

import { SheetManager, useSheetRef } from "react-native-actions-sheet";
import useItemUnitForm from "@/hooks/useItemUnitsForm";
import { getColorWithAlpha } from "@/utils/colors";
import Seperator from "@/components/Seperator";
import { useFieldArray } from "react-hook-form";
import { UnitsSheet } from "@/components/sheets";
import UnitsList from "@/components/lists/UnitsList";
import LabeledBorder from "@/components/LabeledBorder";
import { generateId } from "@/database/SupaLegend";

type ItemFormProps = {
  edit: boolean;
  item: Item | null;
};

const ThemedBarcode = withUnistyles(Barcode, (theme) => ({
  options: {
    background: theme.colors.background,
    lineColor: theme.colors.onBackground,
  },
}));

const ItemForm = ({ edit, item }: ItemFormProps) => {
  const { store$ } = useAppContext();
  const { commonStyles } = useThemeContext();

  const {
    control,
    errors,
    watch,
    handleSubmit,
    updateItem,
    createItem,
    setValue,
    getValues,
  } = useItemForm({
    item,
  });

  // Manage units with react-hook-form
  const {
    fields: units,
    append: appendUnits,
    remove: removeUnits,
  } = useFieldArray({
    control: control,
    name: "units",
    keyName: "key",
  });

  // Manage prices with react-hook-form
  const {
    fields: prices,
    append: appendPrices,
    remove: removePrices,
  } = useFieldArray({
    control: control,
    name: "prices",
    keyName: "key",
  });

  const barcode = watch("barcode");
  const categoryId = watch("category_id");
  const unitsIds = watch("units");

  const handleDisplayAddCategorySheet = () => {
    SheetManager.show("AddCategorySheet", {
      payload: {
        onChange: (category: Category) => setValue("category_id", category.id),
      },
    });
  };

  const handleItemUnitSelection = (unit: Unit, checked?: boolean) => {
    const unitId = getValues("id");

    if (checked) {
      removeUnits(units.findIndex((i) => i.unit_id === unit.id));
      removePrices(prices.findIndex((i) => i.unit_id === unit.id));
    } else {
      appendUnits({ unit_id: unit.id, item_id: unitId });
      appendPrices({
        unit_id: unit.id,
        item_id: unitId,
        buying_price: -1,
        selling_price: -1,
      });
    }
  };

  const handleSubmitForm = () => {
    handleSubmit(() => {})();
    // if (edit) {
    //   handleSubmit(updateItem)();
    // } else {
    //   handleSubmit(createItem)();
    // }
  };

  console.log(errors, "ERRORS");

  // useEffect(() => {
  //   // As soon as the units array changes, we want to display the units sheet to refresh the payload
  //   // Due to currently limitations in react action sheet
  //   if (SheetManager.get("UnitsSheet")?.current?.isOpen()) {
  //     handleDisplayUnitsSheet();
  //   }
  // }, [units]);

  const handleDisplayUnitsSheet = () => {
    const itemId = getValues("id");
    // // Get the unit ids from the units array
    // const unitIds = units.map((i) => i.unit_id) as string[];
    // // Display the units sheet
    // SheetManager.show("UnitsSheet", {
    //   payload: {
    //     value: unitIds,
    //     multiple: true,
    //     onChange: handleItemUnitSelection,
    //   },
    // });
    appendUnits({ item_id: itemId, unit_id: "" });
    appendPrices({
      unit_id: "",
      item_id: itemId,
      buying_price: null,
      selling_price: null,
    });
  };

  return (
    <View style={[commonStyles.gapLg, commonStyles.marginBottomXxl]}>
      <ThemedText fontSize="xxl" type="medium" color="onBackground">
        Item Info
      </ThemedText>

      <View style={commonStyles.gapVerticalSm}>
        <FormField
          control={control}
          label={getString("items.name.label")}
          name="name"
          error={errors.name}
          placeholder={getString("items.name.placeholder")}
          prepend={
            <ThemedMaterialIcons size={18} name="mode-edit" color="onSurface" />
          }
        />
        <FormField
          control={control}
          label={getString("items.sku.label")}
          name="sku"
          error={errors.sku}
          placeholder={getString("items.sku.placeholder")}
          prepend={
            <ThemedMaterialCommunityIcons
              size={18}
              name="unicode"
              color="onSurface"
            />
          }
        />
        <FormField
          control={control}
          label={getString("items.barcode.label")}
          name="barcode"
          error={errors.barcode}
          placeholder={getString("items.barcode.placeholder")}
          prepend={
            <ThemedMaterialCommunityIcons
              size={18}
              name="barcode"
              color="onSurface"
            />
          }
        />

        <Show if={barcode}>
          <View style={commonStyles.alignCenter}>
            <ThemedBarcode value={barcode} rotation={-5} />
          </View>
        </Show>

        <FormField
          control={control}
          label={getString("items.category.label")}
          name="category_id"
          error={errors.category_id}
          type="picker"
          placeholder={getString("items.category.placeholder")}
          pickerSheetTitle={getString("items.category.label")}
          fieldValue={(value: string) =>
            store$.CategoriesStore.getCategoryName(value)
          }
          renderPickerContentComponent={
            <CategoriesList
              onChange={(category) => {
                setValue("category_id", category.id);
              }}
              value={categoryId}
            />
          }
          prepend={
            <ThemedMaterialIcons size={18} name="category" color="onSurface" />
          }
          append={
            <ThemedMaterialCommunityIcons
              size={18}
              name="chevron-down"
              color="onSurface"
            />
          }
          renderRightAction={() => (
            <ThemedButton
              buttonStyle={commonStyles.paddingSm}
              onPress={handleDisplayAddCategorySheet}
            >
              <ThemedMaterialCommunityIcons
                size={18}
                name="plus"
                color="onPrimary"
              />
            </ThemedButton>
          )}
        />
        <Seperator />
        {/* Units Section */}
        <View style={[commonStyles.rowSpaceBetween, commonStyles.gapSm]}>
          <View
            style={[
              commonStyles.flex1,
              commonStyles.gapSm,
              commonStyles.col,
              commonStyles.justifyBetween,
            ]}
          >
            <ThemedText type="bold">{getString("items.unit.label")}</ThemedText>
            <ThemedText type="light" fontSize="sm" style={styles.description}>
              {getString("items.unit.description")}
            </ThemedText>
          </View>
          <ThemedButton
            borderRadius="lg"
            fontSize="sm"
            variant="primary"
            onPress={handleDisplayUnitsSheet}
            buttonStyle={commonStyles.paddingMd}
          >
            <ThemedMaterialCommunityIcons
              name="plus"
              size={18}
              color="onPrimary"
            />
          </ThemedButton>
        </View>

        <Show if={unitsIds?.length}>
          <View style={[commonStyles.gapLg, commonStyles.marginVerticalMd]}>
            {unitsIds?.map((unit, index) => (
              <LabeledBorder
                key={index}
                label={getString("items.unit.count", { count: index + 1 })}
              >
                <FormField
                  control={control}
                  label={getString("items.unit.label")}
                  name={`units.${index}.unit_id`}
                  editable={false}
                  type="picker"
                  value={store$.UnitsStore.getUnitName(unit?.unit_id as string)}
                  error={errors?.units?.[index]?.unit_id}
                  placeholder={getString("items.unit.placeholder")}
                  pickerSheetTitle={getString("items.unit.label")}
                  fieldValue={(value: string) =>
                    store$.UnitsStore.getUnitName(value)
                  }
                  renderPickerContentComponent={
                    <UnitsList
                      onChange={(newUnit: Unit) => {
                        setValue(`units.${index}.unit_id`, newUnit.id);
                      }}
                      value={unit.unit_id}
                    />
                  }
                  prepend={
                    <ThemedMaterialIcons
                      size={18}
                      name="category"
                      color="onSurface"
                    />
                  }
                  append={
                    <ThemedMaterialCommunityIcons
                      size={18}
                      name="delete"
                      color="error"
                    />
                  }
                />
                <View style={[commonStyles.gapMd, commonStyles.rowAlignCenter]}>
                  <View style={commonStyles.flex1}>
                    <FormField
                      control={control}
                      label={getString("items.buying_price.label")}
                      name={`prices.${index}.buying_price`}
                      error={errors.prices?.[index]?.buying_price}
                      placeholder={getString("items.buying_price.placeholder")}
                      prepend={
                        <ThemedMaterialCommunityIcons
                          size={18}
                          name="cash"
                          color="onSurface"
                        />
                      }
                    />
                  </View>
                  <View style={commonStyles.flex1}>
                    <FormField
                      control={control}
                      label={getString("items.selling_price.label")}
                      name={`prices.${index}.selling_price`}
                      error={errors.prices?.[index]?.selling_price}
                      placeholder={getString("items.selling_price.placeholder")}
                      prepend={
                        <ThemedMaterialCommunityIcons
                          size={18}
                          name="cash"
                          color="onSurface"
                        />
                      }
                    />
                  </View>
                </View>
              </LabeledBorder>
            ))}
          </View>
        </Show>

        <Seperator />
      </View>
      <ThemedButton
        title={getString("common.save.label")}
        onPress={handleSubmitForm}
      />
    </View>
  );
};

export default ItemForm;

const styles = StyleSheet.create((theme) => ({
  description: {
    color: getColorWithAlpha(theme.colors.onBackground, 0.5),
  },
}));
