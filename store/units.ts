import { customSynced , supabase} from "@/database/SupaLegend";
import { observable } from "@legendapp/state";

export const units$ = observable(
    customSynced({
      supabase,
      collection: "units",
      select: (from) => from.select("*"),
      actions: ["read", "create", "update", "delete"],
      initial: Object(),
       // Persist data and pending changes locally
      persist: {
        name: 'units',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      // Sync only diffs
      changesSince: 'last-sync',
    })
  );

export const UnitsStore$ = observable({
    units: units$.get(),
    getUnits: () => {
        return Object.values(UnitsStore$.units.get()) || [];
    },
    getUnit: (id: string) => {
        return UnitsStore$.units[id]?.get();
    },
    getUnitName: (id: string) => {
        return UnitsStore$.getUnit(id)?.["name"];
    },
});