import { registerSheet, SheetDefinition } from "react-native-actions-sheet";

// Sheets
import {
  AddGroupByUrlSheet,
  CategoriesSheet,
  ShareGroupUrlSheet,
  ParticipantsSheet,
  ParticipantDeleteInfoSheet,
} from "./";

import { Category, Participant, Participants } from "@/utils/trpc";

registerSheet("AddGroupByUrlSheet", AddGroupByUrlSheet);
registerSheet("CategoriesSheet", CategoriesSheet);
registerSheet("ShareGroupUrlSheet", ShareGroupUrlSheet);
registerSheet("ParticipantsSheet", ParticipantsSheet);
registerSheet("ParticipantDeleteInfoSheet", ParticipantDeleteInfoSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    AddGroupByUrlSheet: SheetDefinition;
    ParticipantDeleteInfoSheet: SheetDefinition;

    ShareGroupUrlSheet: SheetDefinition<{
      payload: {
        groupId: string;
      };
    }>;
    CategoriesSheet: SheetDefinition<{
      payload: {
        categories: Category[];
        value: Category["id"] | null;
        onChange: (category: Category) => void;
      };
    }>;
    ParticipantsSheet: SheetDefinition<{
      payload: {
        participants: Participants;
        value: Participant["id"] | Participant["id"][] | null;
        multiple?: boolean;
        onChange: (participant: Participant, checked?: boolean) => void;
      };
    }>;
  }
}

export {};
