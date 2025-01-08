import { customSynced , supabase} from "@/database/SupaLegend";
import { ItemUnit } from "@/types/types";
import { observable } from "@legendapp/state";

export const itemPricesTable$ = observable(
    customSynced({
      supabase,
      collection: "item_prices",
      select: (from) => from.select("*"),
      actions: ["read", "create", "update", "delete"],
      initial: Object(),
       update(input, params) {
        return supabase.from("item_prices").upsert(input as ItemUnit).eq("id", input?.id as string).select("*").single()
      },
      mode: "set",
       // Persist data and pending changes locally
      persist: {
        name: 'item_prices',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      // Sync only diffs
      changesSince: 'all',
    })
  );

export const ItemPricesStore$ = observable({
    units: itemPricesTable$.get(),
    getUnits: () => {
        return Object.values(itemPricesTable$.get()) || [];
    },
    getUnit: (id: string) => {
        return itemPricesTable$[id]?.get();
    },
});