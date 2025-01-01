import React from "react";
import { View } from "react-native";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Components
import { ThemedCheckbox, ThemedList, ThemedRadioButton } from "@/components/ui";
import { Suppliers, Supplier } from "@/types/types";

// Define the prop types for SuppliersList
interface SuppliersListProps {
  suppliers: Supplier[];
  value: string | string[] | null;
  onChange: (supplier: Supplier, checked?: boolean) => void;
  multiple?: boolean;
}

const SuppliersList: React.FC<SuppliersListProps> = ({
  suppliers,
  value,
  onChange,
  multiple,
}) => {
  const { commonStyles } = useThemeContext();

  const Component = multiple ? ThemedCheckbox : ThemedRadioButton;

  return (
    <View style={{ height: 500 }}>
      <ThemedList
        type="flatlist"
        keyExtractor={({ updated_at, person_id }) =>
          `${person_id}-${updated_at}`
        }
        data={suppliers}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Supplier) => item.company_name,
        }}
        renderItem={({ item }: { item: Supplier }) => {
          return (
            <Component
              onValueChange={() =>
                onChange(
                  item,
                  multiple
                    ? value?.includes(item.person_id) || false
                    : value === item.person_id
                )
              }
              value={
                Array.isArray(value)
                  ? value.includes(item.person_id)
                  : value === item.person_id
              }
              buttonPosition="right"
              label={item.company_name}
              style={commonStyles.rowJustifySpaceBetween}
            />
          );
        }}
      />
    </View>
  );
};

export default SuppliersList;
