import { useAppContext } from "@/context/AppContext";

import { zodResolver } from "@hookform/resolvers/zod";

// Store
import {  unitsTable$ } from "@/store/units";

// helopers
import { generateId } from "@/utils/helpers";

// Form
import { useForm } from "react-hook-form";

// Schema
import { unitSchema } from "@/schema";

// Types
import { UnitsFormValues , Unit} from "@/types";

interface Params {
  unit: Unit | null;
  onChange?: (unit: Unit) => void;
}

const useUnitsForm = ({unit, onChange}: Params) => {

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
  } = useForm<UnitsFormValues>({
    /** Use Zod schema for form validation */
    defaultValues: unit 
    ? {
      ... unit,
      created_at: new Date(unit.created_at).toString(),
      updated_at: new Date().toString(),

    } : {
        id: generateId(),
        name: "",
        symbol: "",
        base_unit: false,
        deleted: false,
        created_at: new Date().toString(),
      updated_at: new Date().toString(),
    },
    resolver: zodResolver(unitSchema),
  });

  const updateUnit = (unit: Unit) => {
    if (unitsTable$ && unitsTable$[unit.id]) {
      unitsTable$[unit.id].assign(unit);

      if (onChange) {
        onChange(unitsTable$[unit.id].get());
      }
    }
  };

  const createUnit = (unit: Unit) => {
    unitsTable$[unit.id].assign(unit);

    if (onChange) {
      onChange(unit);
    }

  }

  return {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    getValues,
    updateUnit,
    createUnit
  };
};

export default useUnitsForm;
