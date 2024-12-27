import React from "react";
import { getString } from "@/strings/translations";
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import { ThemedText } from "@/components/ui";
import { View } from "react-native";

const ParticipantDeleteInfoSheet: React.FC = () => {
  return (
    <BaseBottomActionSheet snapPoints={[100]} title={getString("common.oops")}>
      <View style={{ height: 80 }}>
        <ThemedText fontSize="md">
          {getString("groupform.participants.protectedparticipant")}
        </ThemedText>
      </View>
    </BaseBottomActionSheet>
  );
};

export default ParticipantDeleteInfoSheet;
