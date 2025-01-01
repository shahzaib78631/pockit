import { customSynced , supabase} from "@/database/SupaLegend";
import { observable } from "@legendapp/state";

export const inventoryTable$ = observable(
    customSynced({
      supabase,
      collection: "inventory",
      select: (from) => from.select("*"),
      actions: ["read", "create", "update", "delete"],
       // Persist data and pending changes locally
      persist: {
        name: 'inventory',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      realtime: true,
      fieldId: "item_id",
      // Sync only diffs
      changesSince: 'last-sync',
    })
  );

export const InventoryStore$ = observable({
    inventory: inventoryTable$.get(),
    getInventoryItems: () => {
        return Object.values(inventoryTable$.get()) || [];
    },
    getInventoryItem: (id: string) => {
        return inventoryTable$?.[id]?.get()
    },
});