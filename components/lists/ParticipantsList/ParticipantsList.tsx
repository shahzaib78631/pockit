import React from "react";
import { View } from "react-native";

// TRPC
import { Participant, Participants } from "@/utils/trpc";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Components
import { ThemedCheckbox, ThemedList, ThemedRadioButton } from "@/components/ui";

// Define the prop types for ParticipantsList
interface ParticipantsListProps {
  participants: Participants;
  value: Participant["id"] | Participant["id"][] | null;
  onChange: (participant: Participant, checked?: boolean) => void;
  multiple?: boolean;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  value,
  onChange,
  multiple,
}) => {
  const { commonStyles } = useThemeContext();

  const Component = multiple ? ThemedCheckbox : ThemedRadioButton;

  return (
    <View style={{ height: 500 }}>
      <ThemedList
        type="flashlist"
        keyExtractor={({ id }) => String(id)}
        data={participants}
        searchEnabled
        searchConfig={{
          extractSearchableText: (item: Participant) => item.name,
        }}
        estimatedItemSize={41}
        extraData={value}
        renderItem={({ item }: { item: Participant }) => {
          return (
            <Component
              onValueChange={() =>
                onChange(
                  item,
                  multiple
                    ? value?.includes(item.id) || false
                    : value === item.id
                )
              }
              value={
                Array.isArray(value)
                  ? value.includes(item.id)
                  : value === item.id
              }
              buttonPosition="right"
              label={item.name}
              style={commonStyles.rowJustifySpaceBetween}
            />
          );
        }}
      />
    </View>
  );
};

export default ParticipantsList;
