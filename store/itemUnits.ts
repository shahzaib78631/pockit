import { customSynced , supabase} from "@/database/SupaLegend";
import { ItemUnit } from "@/types/types";
import { observable } from "@legendapp/state";

export const itemUnitsTable$ = observable(
    customSynced({
      supabase,
      collection: "item_units",
      select: (from) => from.select("*"),
      actions: ["read", "create", "update", "delete"],
      initial: Object(),
       update(input, params) {
        return supabase.from("item_units").upsert(input as ItemUnit).eq("id", input?.id as string).select("*").single()
      },
      mode: "set",
       // Persist data and pending changes locally
      persist: {
        name: 'item_units',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      // Sync only diffs
      changesSince: 'all',
    })
  );

export const ItemUnitsStor$ = observable({
    units: itemUnitsTable$.get(),
    getUnits: () => {
        return Object.values(itemUnitsTable$.get()) || [];
    },
    getUnit: (id: string) => {
        return itemUnitsTable$[id]?.get();
    },
});