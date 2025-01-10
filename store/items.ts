import API from "@/api";
import { getString } from "@/strings/translations";
import { Item } from "@/types/types";
import { observable } from "@legendapp/state";
import { syncedCrud } from "@legendapp/state/sync-plugins/crud";
import { toast } from "sonner-native";
import { ObservablePersistMMKV } from
    "@legendapp/state/persist-plugins/mmkv"
import { generateId } from "@/utils/helpers";
import { pb, subscribe } from "@/plugins/pocketbase";

const options = observable({
  offset: 0,
  limit: 10,
})

export const itemsTable$ = observable(
    syncedCrud({
      generateId,
      list: async () => {
        const response = await API.getItems({offset: options.offset.get(), limit: options.limit.get()});
        return response.data
      },
      update: async (item: Item) => {
        await API.saveItem(item)

        return {}
      },
      subscribe: ({ refresh, update }) => {
        pb.collection("items").subscribe("*", async (data) => {
          if (data.action === "create" || data.action === "update") {
            const response = await API.getItem(data.record.id);
            update({ value: [response.data]});
          } else if (data.action === "delete") {
            refresh();
          }
        });
      },
      updatePartial: true,
      mode: "assign",
      // Sync only diffs
      changesSince: 'all',
      initial: Object(),
      retry: {
        times: 1,
        infinite: false, // Retry changes with exponential backoff
      },
      persist: {
        plugin: ObservablePersistMMKV,
        name: "polo",
      },
      onSaved(){
        toast.success("Success")
      },
      onError(error, params) {
        console.log(error, "ERRO")
          toast.error("Error")
      },
    })
  );


// Items observable
export const items$ = observable<Record<string, Item>>({}); // Initialize as an empty array for "load more"

export const ItemsStore$ = observable({
    getItems: () => {
        // items$.set((prev) => ({ ...prev, ...itemsTable$.get() }));
        return Object.values(itemsTable$?.get()) || [];
    },
    getItem: (id: string) => {
        return itemsTable$[id].get()
    },
    getItemName: (id: string) => {
        return itemsTable$[id].get()?.["name"];
    },
});