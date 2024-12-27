import React from "react";
import { View, StyleProp, TextStyle, ImageStyle } from "react-native";
import Avatar from "../Avatar";
import ThemedText from "../../ui/ThemedText";
import { useThemeContext } from "@/context/ThemeContext";

interface AvatarWithNameProps {
  /** Image URL for the avatar */
  uri: string;
  /** Size of the avatar */
  size: number;
  /** Name to display */
  name: string;
  /** Overlap margin for the avatar */
  overlap?: number;
  /** Additional styles for the avatar */
  avatarStyle?: StyleProp<ImageStyle>;
  /** Additional styles for the name */
  nameStyle?: StyleProp<TextStyle>;
}

const AvatarWithName: React.FC<AvatarWithNameProps> = ({
  uri,
  size,
  name,
  overlap = 0,
  avatarStyle,
  nameStyle,
}) => {
  const { commonStyles } = useThemeContext();

  return (
    <View
      style={[
        commonStyles.col,
        commonStyles.alignCenter,
        commonStyles.marginMd,
      ]}
    >
      <Avatar uri={uri} size={size} overlap={overlap} style={avatarStyle} />
      <ThemedText
        style={[commonStyles.marginTopMd, nameStyle]}
        numberOfLines={1}
        fontSize="md"
      >
        {name}
      </ThemedText>
    </View>
  );
};

export default AvatarWithName;
