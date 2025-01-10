import React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import Avatar from "@/components/Avatars/Avatar/Avatar";
import { ThemedText, ThemedButton } from "@/components/ui";
import { useThemeContext } from "@/context/ThemeContext";
import { StyleSheet } from "react-native-unistyles";

type AvatarType = {
  uri?: string;
  name?: string;
  [key: string]: string | undefined;
};

interface StackedAvatarsProps {
  /** Array of avatar image URLs */
  avatars: AvatarType[] | undefined;
  /** Array of names corresponding to the avatars */
  names?: string[];
  /** Whether to display names alongside avatars (default: false) */
  showNames?: boolean;
  /** Size of each avatar (default: 50) */
  avatarSize?: number;
  /** Overlap distance between avatars (default: -20) */
  overlap?: number;
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for individual avatars */
  avatarStyle?: StyleProp<ImageStyle>;
  /** Additional styles for names */
  nameStyle?: StyleProp<TextStyle>;
  /** Callback for when the "add" button is pressed */
  onAddPress?: () => void;
  /** Label text for the add button */
  addLabel?: string;
  /** Key to use for names in the avatar object */
  nameKey?: string;
}

const StackedAvatars: React.FC<StackedAvatarsProps> = ({
  avatars = [],
  showNames = false,
  avatarSize = 50,
  overlap = -20,
  containerStyle,
  avatarStyle,
  nameStyle,
  onAddPress = () => {},
  addLabel,
  nameKey = "name",
}) => {
  const { commonStyles } = useThemeContext();

  return (
    <View
      style={[commonStyles.rowCenter, commonStyles.width100, containerStyle]}
    >
      {avatars.map((avatar, index) => (
        <View key={index} style={[commonStyles.alignCenter]}>
          <Avatar
            uri={avatar?.uri}
            name={avatar?.[nameKey]}
            size={avatarSize}
            overlap={index !== 0 ? overlap : 0}
            style={avatarStyle}
          />
          {showNames && avatar?.[nameKey] && (
            <ThemedText
              style={[
                commonStyles.marginTopMd,
                commonStyles.textCenter,
                { marginLeft: index !== 0 ? overlap : 0 },
                nameStyle,
              ]}
              type="thin"
              fontSize="xs"
            >
              {avatar?.[nameKey]}
            </ThemedText>
          )}
        </View>
      ))}
      {/* Add Button */}
      <View style={commonStyles.alignCenter}>
        <ThemedButton
          borderRadius="full"
          variant="dashed-outline"
          onPress={onAddPress}
          buttonStyle={styles.addButton(avatarSize, overlap)}
        >
          <ThemedText fontSize="lg" color="primary">
            +
          </ThemedText>
        </ThemedButton>
        {addLabel && (
          <ThemedText
            style={[
              commonStyles.marginTopMd,
              commonStyles.textCenter,
              styles.addLabel(overlap),
            ]}
            fontSize="xs"
            color="primary"
          >
            {addLabel}
          </ThemedText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  addButton: (avatarSize: number, overlap: number) => ({
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    marginLeft: overlap,
    padding: theme.padding.none,
    backgroundColor: theme.colors.surface,
  }),
  addLabel: (overlap: number) => ({
    marginLeft: overlap,
  }),
}));

export default StackedAvatars;
