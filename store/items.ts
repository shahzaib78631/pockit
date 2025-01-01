import { Tables } from "@/database.types";
import { buildQuery, customSynced , supabase} from "@/database/SupaLegend";
import { Item } from "@/types/types";
import { observable } from "@legendapp/state";
import { SyncTransform } from "@legendapp/state/sync";

// Observable for options including pagination and "get all" flag
const options$ = observable({
    search: "",
    searchFields: ["name"],
    sort: "created_at",
    fields: ["*", "inventory(whole_count, unit_count)"],
    page: 1,        // Pagination: Current page
    limit: 2,      // Pagination: Number of items per page
    getAll: true,  // Flag to fetch all items
});

export const itemsTable$ = observable(
    customSynced({
      supabase,
      collection: "items",
      select: (select) => {
        return buildQuery(select, {
            search: options$.get().search,
            searchFields: options$.get().searchFields,
            sort: options$.get().sort,
            fields: options$.get().fields,
            page: options$.get().page,
            limit: options$.get().limit,
            getAll: options$.get().getAll,
        });
    },
      realtime: true,
      // Sync only diffs
      changesSince: 'last-sync',
      // Persist data and pending changes locally
      persist: {
        name: 'poko',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        times: 1,
        infinite: false, // Retry changes with exponential backoff
      },
    })
  );


// Items observable
export const items$ = observable<Record<string, Item>>({}); // Initialize as an empty array for "load more"

export const ItemsStore$ = observable({
    items: items$.get(),
    options: options$.get(),
    getItems: () => {
        items$.set((prev) => ({ ...prev, ...itemsTable$.get() }));
        return Object.values(items$.get()) || [];
    },
    getItem: (id: string) => {
        return items$.get()?.[id]
    },
    getItemName: (id: string) => {
        return items$.get()?.[id]?.["name"];
    },
    loadMore: () => {
        const currentPage = options$.get().page;
        options$.set((prev) => ({ ...prev, page: currentPage + 1 })); // Increment the page
        ItemsStore$.getItems()
    },
    refresh: () => {
        options$.set((prev) => ({ ...prev, page: 1 })); // Reset to page 1
        items$.set({}); // Clear current items
        ItemsStore$.getItems()

    },
});