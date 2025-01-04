import { Text, View } from "react-native";
import React, { FC } from "react";
import { FormField } from "@/components/form";
import useUnitsForm from "@/hooks/useUnitsForm";
import { Unit } from "@/types/types";
import { StyleSheet } from "react-native-unistyles";
import { getString } from "@/strings/translations";
import { ThemedButton } from "@/components/ui";
import { commonStyles } from "@/theme/styles";

type UnitForm = {
  unit: Unit | null;
  onChange?: (unit: Unit) => void;
};

const UnitForm: FC<UnitForm> = ({ unit, onChange }) => {
  const { control, errors, handleSubmit, updateUnit, createUnit } =
    useUnitsForm({
      unit,
      onChange,
    });

  const handleFormSubmit = () => {
    if (unit) {
      handleSubmit(updateUnit)();
    } else {
      handleSubmit(createUnit)();
    }
  };

  return (
    <View>
      <View style={commonStyles.marginBottomXl}>
        <FormField
          control={control}
          name="name"
          error={errors.name}
          label={getString("units.name.label")}
          placeholder={getString("units.name.placeholder")}
        />
        <FormField
          control={control}
          name="symbol"
          error={errors.symbol}
          label={getString("units.symbol.label")}
          placeholder={getString("units.symbol.placeholder")}
        />

        <FormField
          control={control}
          name="base_unit"
          type="checkbox"
          error={errors.base_unit}
          label={getString("units.base_unit.label")}
          placeholder={getString("units.base_unit.placeholder")}
        />
      </View>

      <ThemedButton
        title={getString("common.save.label")}
        onPress={handleFormSubmit}
      />
    </View>
  );
};

export default UnitForm;

const styles = StyleSheet.create((theme) => ({}));
