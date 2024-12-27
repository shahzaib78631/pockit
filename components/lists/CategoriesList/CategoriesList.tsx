import React, { useMemo } from "react";
import { View } from "react-native";

// Trpc
import { Category } from "@/utils/trpc";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Styles
import { StyleSheet } from "react-native-unistyles";

// Components
import { ThemedText, ThemedList, ThemedRadioButton } from "@/components/ui";

interface CategoriesListProps {
  categories: Category[];
  value: Category["id"] | null;
  onChange: (category: Category) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
  value,
  onChange,
}) => {
  const { commonStyles } = useThemeContext();

  // Organize categories into sections
  const allSections = useMemo(
    () =>
      Object.entries(
        categories.reduce<Record<string, Category[]>>(
          (acc, category) => ({
            ...acc,
            [category.grouping]: [...(acc[category.grouping] ?? []), category],
          }),
          {}
        )
      ).map(([group, categories]) => ({
        title: group,
        data: categories,
      })),
    [categories]
  );

  return (
    <View style={{ height: 500 }}>
      <ThemedList
        type="sectionlist"
        data={allSections}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Category) => item.name,
        }}
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeaderContainer]}>
            <ThemedText fontSize="lg" type="bold" color="secondary">
              {section.title}
            </ThemedText>
          </View>
        )}
        renderItem={({ item }: { item: Category }) => (
          <View>
            <ThemedRadioButton
              onValueChange={() => onChange(item)}
              value={value === item.id}
              buttonPosition="right"
              label={item.name}
              style={[commonStyles.rowJustifySpaceBetween]}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  sectionHeaderContainer: {
    backgroundColor: theme.colors.background,
    paddingVertical: theme.padding.md,
  },
}));

export default CategoriesList;
