import { buildQuery, customSynced , supabase} from "@/database/SupaLegend";
import { observable } from "@legendapp/state";


// Observable for options including pagination and "get all" flag
const options$ = observable({
    search: "",
    searchFields: ["company_name"],
    sort: "created_at",
    fields: ["*"],
    getAll: true,  // Flag to fetch all items
});

export const suppliers$ = observable(
    customSynced({
      supabase,
      collection: "suppliers",
      select: (select) => {
              return buildQuery(select, {
                  search: options$.get().search,
                  searchFields: options$.get().searchFields,
                  sort: options$.get().sort,
                  fields: options$.get().fields,
                  getAll: options$.get().getAll,
              });
          },
      actions: ["read", "create", "update", "delete"],
      initial: Object(),
      fieldId: "person_id",
       // Persist data and pending changes locally
      persist: {
        name: 'suppliers',
        retrySync: true, // Persist pending changes and retry
      },
      retry: {
        infinite: true, // Retry changes with exponential backoff
      },
      // Sync only diffs
      changesSince: 'last-sync',
    })
  );

export const SuppliersStore$ = observable({
    suppliers: suppliers$.get(),
    getSuppliers: () => {
        return Object.values(SuppliersStore$.suppliers.get()) || [];
    },
    getSupplier: (id: string) => {
        return SuppliersStore$.suppliers[id]?.get();
    },
    getSupplierName: (id: string) => {
        return SuppliersStore$.getSupplier(id)?.["company_name"];
    },
});