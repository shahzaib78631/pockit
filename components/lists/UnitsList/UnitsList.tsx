import React from "react";
import { View } from "react-native";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Components
import { ThemedCheckbox, ThemedList, ThemedRadioButton } from "@/components/ui";
import { Unit, Units } from "@/types/types";
import { unitsTable$ } from "@/store/units";

// Define the prop types for UnitsList
interface UnitsListProps {
  value: string | string[] | null;
  onChange: (unit: Unit, checked?: boolean) => void;
  multiple?: boolean;
}

const UnitsList: React.FC<UnitsListProps> = ({ value, onChange, multiple }) => {
  const { commonStyles } = useThemeContext();

  const Component = multiple ? ThemedCheckbox : ThemedRadioButton;

  return (
    <View style={{ height: 500 }}>
      <ThemedList
        type="flatlist"
        keyExtractor={({ updated_at, id }) => `${id}-${updated_at}`}
        data={Object.values(unitsTable$.get())}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Unit) => item.name,
        }}
        renderItem={({ item }: { item: Unit }) => {
          return (
            <Component
              onValueChange={() =>
                onChange(
                  item,
                  multiple
                    ? value?.includes(item.id) || false
                    : value === item.id
                )
              }
              value={
                Array.isArray(value)
                  ? value.includes(item.id)
                  : value === item.id
              }
              buttonPosition="right"
              label={item.name}
              style={commonStyles.rowJustifySpaceBetween}
            />
          );
        }}
      />
    </View>
  );
};

export default UnitsList;
