import API from "@/api";
import { getString } from "@/strings/translations";
import { Item } from "@/types/types";
import { observable } from "@legendapp/state";
import { syncedCrud } from "@legendapp/state/sync-plugins/crud";
import { toast } from "sonner-native";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { generateId } from "@/utils/helpers";
import { db } from "@/plugins/pocketbase";

const options = observable({
  offset: 0,
  limit: 10,
});

export const itemsTable$ = observable(
  syncedCrud({
    generateId,
    list: async () => {
      const response = await API.getItems({
        offset: options.offset.get(),
        limit: options.limit.get(),
      });
      return response;
    },
    update: async (input, data) => {
      const response = await API.saveItem(input as Item);
      if (response.status === 200) {
      } else {
        throw new Error();
      }
    },
    subscribe: ({ refresh, update }) => {
      db.from("items").subscribe("*", async (data) => {
        refresh();
      });
    },
    fieldUpdatedAt: "updated_at",
    fieldCreatedAt: "created_at",
    fieldDeleted: "deleted",
    mode: "set",
    // Sync only diffs
    changesSince: "all",
    initial: Object(),
    retry: {
      times: 1,
      infinite: false, // Retry changes with exponential backoff
    },
    persist: {
      plugin: ObservablePersistMMKV,
      name: "test",
    },
    onSaved: () => {
      toast.success("Success");
    },
    onError(error, params) {
      console.log(error, "ERRO");
      toast.error("Error");
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
    return itemsTable$[id].get();
  },
  getItemName: (id: string) => {
    return itemsTable$[id].get()?.["name"];
  },
});
