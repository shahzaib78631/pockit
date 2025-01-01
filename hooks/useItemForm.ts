import { useAppContext } from "@/context/AppContext";
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
    } : {
      barcode: null, // Optional field
      category_id: null, // Optional field
      created_at: new Date().toISOString(), // Default to current timestamp
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
      whole_unit_id: undefined,
      sub_unit_id: undefined,
      units_per_whole: 0, 
      updated_at: new Date().toISOString(), // Default to current timestamp
      selling_type: 'whole', // Default to 'units' as per the new column constraint
    },
    resolver: zodResolver(itemsRowSchema),
  });

  const updateItem = (item: Item) => {

    const newItem = {...item}
    delete newItem.inventory

    if (itemsTable$ && itemsTable$[item.id]) {
      console.log('Updating item', item);
      itemsTable$[item.id].barcode.set(item.barcode);
    }
  };

  const createItem = (item: Item) => {
    
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
