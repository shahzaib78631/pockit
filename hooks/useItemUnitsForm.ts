import { useAppContext } from "@/context/AppContext";
import { generateId, supabase } from "@/database/SupaLegend";
import { ItemFormValues, ItemUnitFormValues } from "@/forms/schemas/formSchemas";
import { itemsRowSchema, itemUnitsRowSchema } from "@/forms/schemas/schemas";
import { items$, itemsTable$ } from "@/store/items";
import { Item, ItemUnit } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { use$ } from "@legendapp/state/react";
import { useForm } from "react-hook-form";


interface Params {
  itemUnit: ItemUnit | null;
}

const useItemUnitForm = ({itemUnit}: Params) => {

  const {store$} = useAppContext();

  /**
   * Form controller with dynamic initial values and Zod validation
   */
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ItemUnitFormValues>({
    /** Use Zod schema for form validation */
    defaultValues: itemUnit 
    ? {
      ... itemUnit,
      created_at: new Date(itemUnit.created_at).toISOString().toString(),
      updated_at: new Date().toISOString().toString(),

    } : {
      item_id: null,
      is_primary: false,
      unit_id: null,
      deleted: false,
      created_at: new Date().toISOString().toString(), // Default to current timestamp
      updated_at: new Date().toISOString().toString(), // Default to current timestamp
    },
    resolver: zodResolver(itemUnitsRowSchema),
  });

  const updateItem = (item: Item) => {
    if (itemsTable$ && itemsTable$[item.id]) {
      itemsTable$[item.id].assign(item);
    }
  };

  const createItem = (item: Item) => {

    const id = generateId()
    if (itemsTable$ && itemsTable$[id]) {
      itemsTable$[id].assign({...item, id});
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    getValues,
    updateItem,
    createItem
  };
};

export default useItemUnitForm;
