import { z } from "zod";
import { itemsRowSchema } from "./schemas";

export type ItemFormValues = z.infer<typeof itemsRowSchema>;