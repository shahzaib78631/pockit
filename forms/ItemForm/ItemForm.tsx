import { Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import {
  ThemedButton,
  ThemedMaterialCommunityIcons,
  ThemedMaterialIcons,
  ThemedText,
} from "@/components/ui";
import { ErrorMessage, FormField } from "@/components/form";
import useItemForm from "@/hooks/useItemForm";
import { getString } from "@/strings/translations";
import { useThemeContext } from "@/context/ThemeContext";
import { useAppContext } from "@/context/AppContext";
import { Show } from "@legendapp/state/react";
import { Category, Item, Unit } from "@/types/types";
import { Barcode } from "expo-barcode-generator";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { CategoriesList } from "@/components/lists";
import { SheetManager } from "react-native-actions-sheet";
import { getColorWithAlpha } from "@/utils/colors";
import Seperator from "@/components/Seperator";
import { useFieldArray } from "react-hook-form";
import UnitsList from "@/components/lists/UnitsList";
import LabeledBorder from "@/components/LabeledBorder";
import { generateId } from "@/database/SupaLegend";

type ItemFormProps = {
  edit: boolean; // Indicates whether the form is in edit mode
  item: Item | null; // The item being edited or created
};

// Wrapper component for themed barcode generation
const ThemedBarcode = withUnistyles(Barcode, (theme) => ({
  options: {
    background: theme.colors.background, // Use theme-based background
    lineColor: theme.colors.onBackground, // Use theme-based line color
  },
}));

// Main form component for handling item creation/editing
const ItemForm = ({ edit, item }: ItemFormProps) => {
  const { store$ } = useAppContext(); // Access global state using context
  const { commonStyles } = useThemeContext(); // Access theme-based styles

  // Initialize form state and methods
  const {
    control,
    errors,
    watch,
    handleSubmit,
    updateItem,
    createItem,
    setValue,
    getValues,
    setError,
  } = useItemForm({ item });

  // Manage units using `react-hook-form`'s `useFieldArray`
  const {
    fields: units,
    append: appendUnits,
    remove: removeUnits,
  } = useFieldArray({
    control: control,
    name: "units", // Name of the field in the form schema
    keyName: "key", // Unique key for React lists
  });

  // Manage prices using `react-hook-form`'s `useFieldArray`
  const {
    fields: prices,
    append: appendPrices,
    remove: removePrices,
  } = useFieldArray({
    control: control,
    name: "prices", // Name of the field in the form schema
    keyName: "key", // Unique key for React lists
  });

  // Watch specific form values for reactive behavior
  const [saleType, unitsIds, barcode, categoryId] = watch([
    "sale_type", // Selling type: whole/unit
    "units", // Units array
    "barcode", // Barcode string
    "category_id", // Selected category ID
  ]);

  // Function to display the category selection sheet
  const handleDisplayAddCategorySheet = () => {
    SheetManager.show("AddCategorySheet", {
      payload: {
        onChange: (category: Category) => setValue("category_id", category.id),
      },
    });
  };

  // Handle unit selection for the item
  const handleItemUnitSelection = (
    unit: Unit | null,
    alreadyExists: boolean
  ) => {
    const itemId = getValues("id");

    if (alreadyExists && unit) {
      // Remove unit and associated prices if already selected
      removeUnits(units.findIndex((i) => i.unit_id === unit.id));
      removePrices(prices.findIndex((i) => i.unit_id === unit.id));
    } else {
      // Add unit and default prices if not selected
      appendUnits({
        unit_id: "",
        item_id: itemId,
        is_base_unit: units.length <= 0 ? true : false,
        conversion_factor: units.length <= 0 ? 1 : 0,
        id: generateId(),
        deleted: false,
        created_at: new Date().toISOString().toString(),
        updated_at: new Date().toISOString().toString(),
      });
      appendPrices({
        unit_id: "",
        item_id: itemId,
        buying_price: 0,
        selling_price: 0,
        id: generateId(),
        deleted: false,
        created_at: new Date().toISOString().toString(),
        updated_at: new Date().toISOString().toString(),
      });
    }
  };

  // Submit handler for the form
  const handleSubmitForm = () => {
    if (edit) {
      handleSubmit(updateItem)(); // Call updateItem if in edit mode
    } else {
      handleSubmit(createItem)(); // Call createItem otherwise
    }
  };

  const calculateNewConversionFactor = (
    unitIndex: number,
    newBaseUnitIndex: number
  ): number => {
    const previousFactor =
      getValues(`units.${unitIndex}.conversion_factor`) || 1;
    const newBaseFactor =
      getValues(`units.${newBaseUnitIndex}.conversion_factor`) || 1;

    // Adjust conversion factor relative to the new base unit
    return previousFactor / newBaseFactor;
  };

  const updatePrices = (
    unitIndex: number,
    baseUnitIndex: number,
    conversionFactor: number
  ) => {
    const baseBuyingPrice =
      getValues(`prices.${baseUnitIndex}.buying_price`) || 0;
    const baseSellingPrice =
      getValues(`prices.${baseUnitIndex}.selling_price`) || 0;

    // Calculate new prices for the unit based on the conversion factor
    const newBuyingPrice = baseBuyingPrice * conversionFactor;
    const newSellingPrice = baseSellingPrice * conversionFactor;

    // Set the calculated prices for the unit
    setValue(
      `prices.${unitIndex}.buying_price`,
      parseFloat(newBuyingPrice.toFixed(2))
    );
    setValue(
      `prices.${unitIndex}.selling_price`,
      parseFloat(newSellingPrice.toFixed(2))
    );
  };

  const baseUnitIndex = useMemo(() => {
    return units.findIndex((unit) => unit.is_base_unit);
  }, [unitsIds]);

  console.log("errors", errors);

  return (
    <View style={[commonStyles.gapLg, commonStyles.marginBottomXxl]}>
      {/* Title */}
      <ThemedText fontSize="xxl" type="medium" color="onBackground">
        Item Info
      </ThemedText>

      <View style={commonStyles.gapVerticalSm}>
        {/* Item Name Field */}
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

        {/* SKU Field */}
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

        {/* Barcode Field */}
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

        {/* Barcode Preview */}
        <Show if={barcode}>
          <View style={commonStyles.alignCenter}>
            <ThemedBarcode value={barcode} rotation={-5} />
          </View>
        </Show>

        {/* Category Picker */}
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

        {/* Sale Type Selector */}
        <FormField
          control={control}
          name="sale_type"
          type="segmented"
          error={errors.sale_type}
          values={["whole", "unit"]}
          labels={[
            getString("items.selling_type.whole"),
            getString("items.selling_type.unit"),
          ]}
          label={getString("items.selling_type.label")}
          helpText={getString("items.selling_type.placeholder")}
        />

        {/* Units Section */}
        <Show if={saleType === "unit"}>
          <Seperator />

          {/* Units Section Header */}
          <View style={[commonStyles.rowSpaceBetween, commonStyles.gapSm]}>
            <View
              style={[
                commonStyles.flex1,
                commonStyles.gapSm,
                commonStyles.col,
                commonStyles.justifyBetween,
              ]}
            >
              <ThemedText type="bold">
                {getString("items.unit.label")}
              </ThemedText>
              <ThemedText type="light" fontSize="sm" style={styles.description}>
                {getString("items.unit.description")}
              </ThemedText>
            </View>
            <ThemedButton
              borderRadius="lg"
              fontSize="sm"
              variant="primary"
              onPress={() => handleItemUnitSelection(null, false)} // Add a new unit
              buttonStyle={commonStyles.paddingMd}
            >
              <ThemedMaterialCommunityIcons
                name="plus"
                size={18}
                color="onPrimary"
              />
            </ThemedButton>
          </View>

          {/* Display List of Units if Available */}
          <Show if={unitsIds?.length}>
            <View style={[commonStyles.gapLg, commonStyles.marginVerticalMd]}>
              {unitsIds?.map((unit, index) => (
                <LabeledBorder
                  key={index}
                  label={getString("items.unit.count", { count: index + 1 })} // Dynamic unit label
                  borderStyle={commonStyles.gapMd}
                >
                  {/* Unit Picker Field */}
                  <FormField
                    control={control}
                    label={getString("items.unit.label")}
                    name={`units.${index}.unit_id`}
                    editable={false} // Unit ID cannot be manually edited
                    type="picker"
                    value={store$.UnitsStore.getUnitName(
                      unit?.unit_id as string
                    )} // Fetch unit name
                    error={errors?.units?.[index]?.unit_id}
                    placeholder={getString("items.unit.placeholder")}
                    pickerSheetTitle={getString("items.unit.label")}
                    fieldValue={(value: string) =>
                      store$.UnitsStore.getUnitName(value)
                    }
                    renderPickerContentComponent={
                      <UnitsList
                        onChange={(newUnit: Unit) => {
                          setValue(`units.${index}.unit_id`, newUnit.id); // Set selected unit
                          setValue(`prices.${index}.unit_id`, newUnit.id); // Set selected unit
                          setError(`units.${index}.unit_id`, {}); // Clear errors
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
                      <ThemedButton
                        variant="text"
                        buttonStyle={commonStyles.paddingNone}
                        onPress={
                          () =>
                            handleItemUnitSelection(
                              unit as unknown as Unit,
                              true
                            ) // Remove unit
                        }
                      >
                        <ThemedMaterialCommunityIcons
                          size={18}
                          name="delete"
                          color="error"
                        />
                      </ThemedButton>
                    }
                  />

                  {/* Prices Section for Each Unit */}
                  <View
                    style={[commonStyles.gapMd, commonStyles.rowAlignCenter]}
                  >
                    {/* Buying Price Field */}
                    <View
                      style={[commonStyles.flex1, commonStyles.alignSelfStart]}
                    >
                      <FormField
                        control={control}
                        label={getString("items.buying_price.label")}
                        name={`prices.${index}.buying_price`}
                        error={errors.prices?.[index]?.buying_price}
                        placeholder={getString(
                          "items.buying_price.placeholder"
                        )}
                        prepend={
                          <ThemedMaterialCommunityIcons
                            size={18}
                            name="cash"
                            color="onSurface"
                          />
                        }
                        interceptOnChange={(value, onChange) => {
                          onChange(value);
                          if (unit.is_base_unit) {
                            unitsIds.forEach((unit, unitIndex) => {
                              if (unitIndex !== index) {
                                updatePrices(
                                  unitIndex,
                                  index,
                                  unit.conversion_factor || 1
                                );
                              }
                            });
                          }
                        }}
                      />
                    </View>

                    {/* Selling Price Field */}
                    <View
                      style={[commonStyles.flex1, commonStyles.alignSelfStart]}
                    >
                      <FormField
                        control={control}
                        label={getString("items.selling_price.label")}
                        name={`prices.${index}.selling_price`}
                        error={errors.prices?.[index]?.selling_price}
                        placeholder={getString(
                          "items.selling_price.placeholder"
                        )}
                        prepend={
                          <ThemedMaterialCommunityIcons
                            size={18}
                            name="cash"
                            color="onSurface"
                          />
                        }
                        interceptOnChange={(value, onChange) => {
                          onChange(value);
                          if (unit.is_base_unit) {
                            // Reset conversion factors of all other units relative to the new base unit
                            unitsIds.forEach((unit, unitIndex) => {
                              if (unitIndex !== index) {
                                updatePrices(
                                  unitIndex,
                                  index,
                                  unit.conversion_factor || 1
                                );
                              }
                            });
                          }
                        }}
                      />
                    </View>
                  </View>

                  {/* Base Unit Checkbox */}
                  <FormField
                    control={control}
                    name={`units.${index}.is_base_unit`}
                    type="checkbox"
                    error={errors?.units?.[index]?.is_base_unit}
                    label={getString("items.is_base_unit.placeholder")}
                    interceptOnChange={(value, onChange) => {
                      if (value) {
                        // If a new base unit is selected:
                        if (baseUnitIndex >= 0) {
                          // Reset the previous base unit's is_base_unit and conversion_factor
                          setValue(
                            `units.${baseUnitIndex}.is_base_unit`,
                            false
                          );
                          setValue(
                            `units.${baseUnitIndex}.conversion_factor`,
                            1
                          );
                        }

                        // Reset conversion factors of all other units relative to the new base unit
                        unitsIds.forEach((unit, unitIndex) => {
                          if (unitIndex !== index) {
                            setValue(
                              `units.${unitIndex}.conversion_factor`,
                              calculateNewConversionFactor(unitIndex, index)
                            );
                          }
                        });
                      } else {
                        // If the current base unit is unchecked, reset its conversion_factor to 0
                        setValue(`units.${index}.conversion_factor`, 1);
                      }

                      // Update the is_base_unit state for the current checkbox
                      onChange(value);
                    }}
                  />

                  {/* Conversion Factor Field (Only for Non-Base Units) */}
                  <Show if={!unit?.is_base_unit}>
                    <FormField
                      control={control}
                      label={getString("items.conversion_factor.label")}
                      name={`units.${index}.conversion_factor`}
                      error={errors.units?.[index]?.conversion_factor}
                      placeholder={getString(
                        "items.conversion_factor.placeholder"
                      )}
                      prepend={
                        <ThemedMaterialCommunityIcons
                          size={18}
                          name="swap-horizontal"
                          color="onSurface"
                        />
                      }
                      helpText={getString(
                        "items.conversion_factor.description"
                      )}
                      interceptOnChange={(value, onChange) => {
                        // Update the is_base_unit state for the current checkbox
                        onChange(value);
                        // Reset conversion factors of all other units relative to the new base unit
                        updatePrices(index, baseUnitIndex, value);
                      }}
                    />
                  </Show>
                </LabeledBorder>
              ))}
            </View>
          </Show>

          {/* Error Message for Units */}
          <Show if={errors.units?.message}>
            <ErrorMessage error={errors.units?.message} />
          </Show>

          <Seperator />
        </Show>
      </View>

      {/* Submit Button */}
      <ThemedButton
        title={getString("common.save.label")}
        onPress={handleSubmitForm}
      />
    </View>
  );
};

export default ItemForm;

// Styles
const styles = StyleSheet.create((theme) => ({
  description: {
    color: getColorWithAlpha(theme.colors.onBackground, 0.5), // Use semi-transparent theme color
  },
}));
