import { StyleSheet, Text, View } from "react-native";
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
import UnitsList from "@/components/lists/UnitsList";
import { useAppContext } from "@/context/AppContext";
import { Show } from "@legendapp/state/react";
import LabeledBorder from "@/components/LabeledBorder";
import Seperator from "@/components/Seperator";
import SuppliersList from "@/components/lists/SuppliersList";
import { Item } from "@/types/types";
import { Barcode } from "expo-barcode-generator";
import { withUnistyles } from "react-native-unistyles";

type ItemFormProps = {
  edit: boolean;
  item: Item | null;
};

const ThemedBarcode = withUnistyles(Barcode, (theme) => ({
  options: {
    background: theme.colors.background,
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

  const [
    wholeBuyingPrice,
    wholeSellingPrice,
    unitsPerWhole,
    sellingType,
    barcode,
  ] = watch([
    "whole_buying_price",
    "whole_selling_price",
    "units_per_whole",
    "selling_type",
    "barcode",
  ]);

  useEffect(() => {
    updateUnitPricing("units_per_whole");
  }, [unitsPerWhole]);

  useEffect(() => {
    updateUnitPricing("whole_selling_price");
  }, [wholeSellingPrice]);

  useEffect(() => {
    updateUnitPricing("whole_buying_price");
  }, [wholeBuyingPrice]);

  // Handle form submission
  const handleFormSubmit = () => {
    if (edit && item) {
      // Handle editing item
      handleSubmit(updateItem)();
    } else {
      // Handle creating a new item
      handleSubmit(createItem)();
    }
  };

  const updateUnitPricing = (field: string) => {
    if (field === "whole_buying_price" || field === "units_per_whole") {
      setValue(
        "unit_buying_price",
        getValues("whole_buying_price") / (getValues("units_per_whole") || 1)
      );
    }
    if (field === "whole_selling_price" || field === "units_per_whole") {
      setValue(
        "unit_selling_price",
        getValues("whole_selling_price") / (getValues("units_per_whole") || 1)
      );
    }
  };

  console.log("ItemForm -> errors", errors);

  return (
    <View style={[commonStyles.gapLg, commonStyles.marginBottomXxl]}>
      <ThemedText fontSize="xxl" type="medium" color="onBackground">
        Item Info
      </ThemedText>

      <View style={commonStyles.gapVerticalSm}>
        <FormField
          control={control}
          label={getString("form.items.name.label")}
          name="name"
          error={errors.name}
          placeholder={getString("form.items.name.placeholder")}
          prepend={
            <ThemedMaterialIcons size={18} name="mode-edit" color="onSurface" />
          }
        />
        <FormField
          control={control}
          label={getString("form.items.sku.label")}
          name="sku"
          error={errors.sku}
          placeholder={getString("form.items.sku.placeholder")}
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
          label={getString("form.items.barcode.label")}
          name="barcode"
          error={errors.barcode}
          placeholder={getString("form.items.barcode.placeholder")}
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
          label={getString("form.items.supplier.label")}
          name="supplier_id"
          error={errors.supplier_id}
          type="picker"
          placeholder={getString("form.items.supplier.placeholder")}
          pickerSheetTitle={getString("form.items.supplier.label")}
          fieldValue={(value: string) =>
            store$.SuppliersStore.getSupplierName(value)
          }
          renderPickerContentComponent={(value, onChange) => (
            <SuppliersList
              suppliers={store$.SuppliersStore.getSuppliers()}
              onChange={(supplier) => {
                onChange(supplier.person_id);
              }}
              value={value}
            />
          )}
          prepend={
            <ThemedMaterialIcons size={18} name="person" color="onSurface" />
          }
          append={
            <ThemedMaterialCommunityIcons
              size={18}
              name="chevron-down"
              color="onSurface"
            />
          }
        />

        <FormField
          control={control}
          label={getString("form.items.category.label")}
          name="category_id"
          error={errors.category_id}
          type="picker"
          placeholder={getString("form.items.category.placeholder")}
          pickerSheetTitle={getString("form.items.category.label")}
          fieldValue={(value: string) =>
            store$.CategoriesStore.getCategoryName(value)
          }
          renderPickerContentComponent={(value, onChange) => (
            <UnitsList
              units={store$.CategoriesStore.getCategories()}
              onChange={(category) => {
                onChange(category.id);
              }}
              value={value}
            />
          )}
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
        />

        <Seperator />

        <FormField
          control={control}
          label={getString("form.items.selling_type.label")}
          name="selling_type"
          error={errors.selling_type}
          keyboardType="numeric"
          type="segmented"
          values={["whole", "unit"]}
          labels={[
            getString("form.items.selling_type.whole"),
            getString("form.items.selling_type.unit"),
          ]}
          helpText={getString("form.items.selling_type.placeholder")}
          prepend={
            <ThemedMaterialCommunityIcons
              size={18}
              name="plus-minus"
              color="onSurface"
            />
          }
        />
        <Show if={sellingType === "unit"}>
          <FormField
            control={control}
            label={getString("form.items.whole_unit.label")}
            name="whole_unit_id"
            error={errors.whole_unit_id}
            type="picker"
            placeholder={getString("form.items.whole_unit.placeholder")}
            pickerSheetTitle={getString("form.items.whole_unit.label")}
            fieldValue={(value: string) => store$.UnitsStore.getUnitName(value)}
            renderPickerContentComponent={(value, onChange) => (
              <UnitsList
                units={store$.UnitsStore.getUnits()}
                onChange={(category) => {
                  onChange(category.id);
                }}
                value={value}
              />
            )}
            prepend={
              <ThemedMaterialCommunityIcons
                size={18}
                name="google-circles-communities"
                color="onSurface"
              />
            }
            append={
              <ThemedMaterialCommunityIcons
                size={18}
                name="chevron-down"
                color="onSurface"
              />
            }
          />

          <View style={commonStyles.gapLg}>
            <LabeledBorder label={getString("form.items.sub_unit.label")}>
              <FormField
                control={control}
                label={getString("form.items.unit.label")}
                name="sub_unit_id"
                error={errors.sub_unit_id}
                type="picker"
                placeholder={getString("form.items.sub_unit.placeholder")}
                pickerSheetTitle={getString("form.items.sub_unit.label")}
                fieldValue={(value: string) =>
                  store$.UnitsStore.getUnitName(value)
                }
                renderPickerContentComponent={(value, onChange) => (
                  <UnitsList
                    units={store$.UnitsStore.getUnits()}
                    onChange={(category) => {
                      onChange(category.id);
                    }}
                    value={value}
                  />
                )}
                prepend={
                  <ThemedMaterialCommunityIcons
                    size={18}
                    name="google-circles-communities"
                    color="onSurface"
                  />
                }
                append={
                  <ThemedMaterialCommunityIcons
                    size={18}
                    name="chevron-down"
                    color="onSurface"
                  />
                }
              />
              <FormField
                control={control}
                label={getString("form.items.sub_units_count.label")}
                name="units_per_whole"
                error={errors.units_per_whole}
                keyboardType="numeric"
                placeholder={getString(
                  "form.items.sub_units_count.placeholder"
                )}
              />
            </LabeledBorder>
            <LabeledBorder label={getString("form.items.buying_price.label")}>
              <View style={[commonStyles.row, commonStyles.gapHorizontalLg]}>
                <View style={commonStyles.flex1}>
                  <FormField
                    control={control}
                    label={getString("form.items.whole.label")}
                    name="whole_buying_price"
                    error={errors.whole_buying_price}
                    keyboardType="numeric"
                    placeholder={getString(
                      "form.items.whole_buying_price.placeholder"
                    )}
                  />
                </View>
                <View style={commonStyles.flex1}>
                  <FormField
                    control={control}
                    label={getString("form.items.sub_unit.label")}
                    name="unit_buying_price"
                    error={errors.unit_buying_price}
                    keyboardType="numeric"
                    placeholder={getString(
                      "form.items.sub_unit_buying_price.placeholder"
                    )}
                  />
                </View>
              </View>
            </LabeledBorder>

            <LabeledBorder label={getString("form.items.selling_price.label")}>
              <View style={[commonStyles.row, commonStyles.gapHorizontalLg]}>
                <View style={commonStyles.flex1}>
                  <FormField
                    control={control}
                    label={getString("form.items.whole.label")}
                    name="whole_selling_price"
                    error={errors.whole_selling_price}
                    keyboardType="numeric"
                    placeholder={getString(
                      "form.items.whole_selling_price.placeholder"
                    )}
                  />
                </View>
                <View style={commonStyles.flex1}>
                  <FormField
                    control={control}
                    label={getString("form.items.sub_unit.label")}
                    name="unit_selling_price"
                    error={errors.unit_selling_price}
                    keyboardType="numeric"
                    placeholder={getString(
                      "form.items.sub_unit_selling_price.placeholder"
                    )}
                  />
                </View>
              </View>
            </LabeledBorder>
          </View>
        </Show>

        <Show if={sellingType !== "unit"}>
          <FormField
            control={control}
            label={getString("form.items.whole_buying_price.label")}
            name="whole_buying_price"
            error={errors.whole_buying_price}
            keyboardType="numeric"
            placeholder={getString("form.items.whole_buying_price.placeholder")}
          />
          <FormField
            control={control}
            label={getString("form.items.whole_selling_price.label")}
            name="whole_selling_price"
            error={errors.whole_selling_price}
            keyboardType="numeric"
            placeholder={getString(
              "form.items.whole_selling_price.placeholder"
            )}
          />
        </Show>
      </View>
      <ThemedButton
        title={getString("common.save.label")}
        onPress={handleFormSubmit}
      />
    </View>
  );
};

export default ItemForm;

const styles = StyleSheet.create({});
