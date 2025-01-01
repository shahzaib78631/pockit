import React from "react";
import { View } from "react-native";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Components
import { ThemedCheckbox, ThemedList, ThemedRadioButton } from "@/components/ui";
import { Category, Categories } from "@/types/types";

// Define the prop types for CategoriesList
interface CategoriesListProps {
  categories: Categories;
  value: string | string[] | null;
  onChange: (category: Category, checked?: boolean) => void;
  multiple?: boolean;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
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
        keyExtractor={({ updated_at, id }) => `${id}-${updated_at}`}
        data={categories}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Category) => item.name,
        }}
        renderItem={({ item }: { item: Category }) => {
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

export default CategoriesList;
