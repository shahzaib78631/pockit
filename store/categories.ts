import { customSynced , supabase} from "@/database/SupaLegend";
import { observable } from "@legendapp/state";

export const categories$ = observable(
    customSynced({
      supabase,
      collection: "categories",
      select: (from) => from.select("*"),
      actions: ["read", "create", "update", "delete"],
      initial: Object(),
       // Persist data and pending changes locally
      persist: {
        name: 'categories',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      // Sync only diffs
      changesSince: 'last-sync',
    })
  );

export const CategoriesStore$ = observable({
    categories: categories$.get(),
    getCategories: () => {
        return Object.values(CategoriesStore$.categories.get()) || [];
    },
    getCategory: (id: string) => {
        return CategoriesStore$.categories[id]?.get();
    },
    getCategoryName: (id: string) => {
        return CategoriesStore$.getCategory(id)?.["name"];
    },
});