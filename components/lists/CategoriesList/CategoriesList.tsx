import React, { useEffect } from "react";
import { View } from "react-native";

// Components
import { ThemedCheckbox, ThemedList, ThemedRadioButton } from "@/components/ui";
import { Category, Categories } from "@/types/types";
import { observable, observe } from "@legendapp/state";
import { Memo, observer, useObservable } from "@legendapp/state/react";
import { commonStyles } from "@/theme/styles";
import { categoriesTable$ } from "@/store/categories";

// Define the prop types for CategoriesList
interface CategoriesListProps {
  value: string | string[] | null;
  onChange: (category: Category, checked?: boolean) => void;
  multiple?: boolean;
}

const CategoriesList = ({ value, onChange, multiple }: CategoriesListProps) => {
  const Component = multiple ? ThemedCheckbox : ThemedRadioButton;

  return (
    <View style={{ height: 500 }}>
      <ThemedList
        type="flatlist"
        keyExtractor={({ updated_at, id }) => `${id}-${updated_at}`}
        data={Object.values(categoriesTable$.get())}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Category) => item.name,
        }}
        renderItem={({ item }: { item: Category }) => (
          <Component
            onValueChange={() => {
              value = item.id;
              onChange(
                item,
                multiple ? value?.includes(item.id) || false : value === item.id
              );
            }}
            value={
              Array.isArray(value) ? value.includes(item.id) : value === item.id
            }
            buttonPosition="right"
            label={item.name}
            style={commonStyles.rowJustifySpaceBetween}
          />
        )}
      />
    </View>
  );
};

export default CategoriesList;
