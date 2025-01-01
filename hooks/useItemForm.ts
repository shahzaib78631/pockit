import { useAppContext } from "@/context/AppContext";
import { generateId, supabase } from "@/database/SupaLegend";
import { ItemFormValues } from "@/forms/schemas/formSchemas";
import { itemsRowSchema } from "@/forms/schemas/schemas";
import { items$, itemsTable$ } from "@/store/items";
import { Item } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


interface Params {
  item: Item | null;
}

const useItemForm = ({item}: Params) => {

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
  } = useForm<ItemFormValues>({
    /** Use Zod schema for form validation */
    defaultValues: item 
    ? {
      ... item,
      created_at: new Date(item.created_at).toISOString().toString(),
      updated_at: new Date().toISOString().toString(),

    } : {
      barcode: null, // Optional field
      category_id: null, // Optional field
      created_at: new Date().toISOString().toString(), // Default to current timestamp
      deleted: false, // Default to not deleted
      id: '', // Default to empty string for unique ID
      is_active: true, // Default to active
      name: '', // Default to empty string for name
      whole_buying_price: 0, // Optional field
      whole_selling_price: 0, // Optional field
      unit_buying_price: 0, // Optional field
      unit_selling_price: 0, // Optional field
      sku: '', // Default to empty string for stock-keeping unit
      supplier_id: null, // Optional field
      whole_unit_id: null,
      sub_unit_id: null,
      units_per_whole: 0, 
      updated_at: new Date().toISOString().toString(), // Default to current timestamp
      selling_type: 'whole', // Default to 'units' as per the new column constraint
    },
    resolver: zodResolver(itemsRowSchema),
  });

  const updateItem = (item: Item) => {
    if (itemsTable$ && itemsTable$[item.id]) {
      itemsTable$[item.id].assign(item);
    }
  };

  const createItem = (item: Item) => {
    const id = generateId()
    if (itemsTable$) {
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

export default useItemForm;
