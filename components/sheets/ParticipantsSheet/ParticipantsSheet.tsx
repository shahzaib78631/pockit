import React from "react";
import { getString } from "@/strings/translations";
import ParticipantsList from "@/components/lists/UnitsList";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import { SheetProps } from "react-native-actions-sheet";

const ParticipantsSheet: React.FC<SheetProps<"ParticipantsSheet">> = ({
  payload,
}) => {
  if (!payload) return null;

  const { participants, value, onChange, multiple } = payload;

  return (
    <BaseBottomActionSheet title={getString("common.participants")}>
      <ParticipantsList
        participants={participants}
        value={value}
        onChange={onChange}
        multiple={multiple}
      />
    </BaseBottomActionSheet>
  );
};

export default ParticipantsSheet;
