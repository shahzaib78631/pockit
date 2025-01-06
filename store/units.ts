import { customSynced , supabase} from "@/database/SupaLegend";
import { Units } from "@/types/types";
import { observable } from "@legendapp/state";

export const unitsTable$ = observable(
    customSynced({
      supabase,
      collection: "units",
      select: (from) => from.select("*"),
      actions: ["read", "create", "update", "delete"],
      initial: Object(),
       update(input, params) {
        return supabase.from("units").upsert(input as Units).eq("id", input?.id as string).select("*").single()
      },
      mode: "set",
       // Persist data and pending changes locally
      persist: {
        name: 'units',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      // Sync only diffs
      changesSince: 'all',
    })
  );

export const UnitsStore$ = observable({
    units: unitsTable$.get(),
    getUnits: () => {
        return Object.values(unitsTable$.get()) || [];
    },
    getUnit: (id: string) => {
        return unitsTable$[id]?.get();
    },
    getUnitName: (id: string) => {
        return UnitsStore$.getUnit(id)?.["name"];
    },
});