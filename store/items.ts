import { buildQuery, customSynced , supabase} from "@/database/SupaLegend";
import { getString } from "@/strings/translations";
import { Item } from "@/types/types";
import { observable } from "@legendapp/state";
import { toast } from "sonner-native";

// Observable for options including pagination and "get all" flag
const options$ = observable({
    search: "",
    searchFields: ["name"],
    sort: "created_at",
    fields: ["*"],
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
      update(input, params) {
        return supabase.from("items").upsert(input as Item).eq("id", input?.id as string).select("*").single()
      },
      updatePartial: true,
      mode: "set",
      actions: ["read", "create", "update", "delete"],
      realtime: true,
      // Sync only diffs
      changesSince: 'last-sync',
      // Persist data and pending changes locally
      persist: {
        name: 'life',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        times: 1,
        infinite: false, // Retry changes with exponential backoff
      },
      onSaved(){
        // toast.success(getString("form.items.on_success.description"))
      },
      onError(error, params) {
          // toast.error(getString("form.items.on_error.description"))
      },
    })
  );


// Items observable
export const items$ = observable<Record<string, Item>>({}); // Initialize as an empty array for "load more"

export const ItemsStore$ = observable({
    options: options$.get(),
    getItems: () => {
        // items$.set((prev) => ({ ...prev, ...itemsTable$.get() }));
        return Object.values(itemsTable$.get()) || [];
    },
    getItem: (id: string) => {
        return itemsTable$[id].get()
    },
    getItemName: (id: string) => {
        return itemsTable$[id].get()?.["name"];
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