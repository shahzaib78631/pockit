import API from "@/api";
import { observable } from "@legendapp/state";
import { syncedCrud } from "@legendapp/state/sync-plugins/crud";

export const unitsTable$ = observable(
    syncedCrud({
      list: async () => {
        const units = await API.getUnits();
        return units;
      },
      mode: "set",
      
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