import API from "@/api";
import { generateId } from "@/utils/helpers";
import { observable } from "@legendapp/state";
import { syncedCrud } from "@legendapp/state/sync-plugins/crud";

export const categoriesTable$ = observable(
  syncedCrud({
    generateId,
    list: async () => {
      const categories = await API.getCategories();
      return categories
    },
    retry: {
      infinite: false, // Retry changes with exponential backoff
    },
    fieldId: 'id',
    fieldCreatedAt: 'created_at',
    fieldUpdatedAt: 'updated_at',
    fieldDeleted: 'deleted',
    changesSince: 'last-sync',
  })
);

export const CategoriesStore$ = observable({
  categories: categoriesTable$.get(),
  getCategories: () => {
    return Object.values(categoriesTable$.get()) || [];
  },
  getCategory: (id: string) => {
    return categoriesTable$[id]?.get();
  },
  getCategoryName: (id: string) => {
    return categoriesTable$?.[id]?.get()?.name;
  },
});
