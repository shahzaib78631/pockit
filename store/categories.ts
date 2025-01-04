import { customSynced , supabase} from "@/database/SupaLegend";
import { Category } from "@/types/types";
import { observable } from "@legendapp/state";
import { toast } from "sonner-native";

export const categoriesTable$ = observable(
    customSynced({
      supabase,
      collection: "categories",
      select: (from) => from.select("*"),
      actions: ["read", "create", "update", "delete"],
      initial: Object(),
      update(input, params) {
        return supabase.from("categories").upsert(input as Category).eq("id", input?.id as string).select("*").single()
      },
       // Persist data and pending changes locally
      persist: {
        name: 'categories',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      // Sync only diffs
      changesSince: 'all',
      realtime: true,
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