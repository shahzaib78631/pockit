import React from "react";
import {
  Text,
  Image,
  View,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from "react-native";
import Color from "color";
import ThemedText from "../../ui/ThemedText";
import { StyleSheet } from "react-native-unistyles";

interface AvatarProps {
  /** Image URL for the avatar */
  uri?: string;
  /** Full name to use for generating initials when no URI is provided */
  name?: string;
  /** Size of the avatar */
  size: number;
  /** Overlap margin for the avatar */
  overlap?: number;
  /** Additional styles for the avatar */
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const generateColorFromName = (name: string): string => {
  // Simple hash function to generate a consistent color for a name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a color
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
};

const getInitials = (name: string): string => {
  const nameParts = name.split(" ");
  return nameParts.length > 1
    ? nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
    : name.charAt(0).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size,
  overlap = 0,
  style,
  containerStyle,
}) => {
  // Avatar content: Image or Placeholder
  const avatarContent = uri ? (
    <Image
      source={{ uri }}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          marginLeft: overlap,
        },
        style,
      ]}
    />
  ) : (
    <View
      style={[
        styles.avatar,
        styles.placeholderAvatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          marginLeft: overlap,
          backgroundColor: name ? generateColorFromName(name) : undefined,
        },
        containerStyle,
      ]}
    >
      {name && (
        <ThemedText type="light" style={styles.initials(size, name)}>
          {getInitials(name)}
        </ThemedText>
      )}
    </View>
  );

  return avatarContent;
};

const styles = StyleSheet.create((theme) => ({
  avatar: {
    borderWidth: 1,
    borderColor: theme.colors.outline,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderAvatar: {
    backgroundColor: theme.colors.surface,
  },
  initials: (size, name) => ({
    fontSize: size / 3,
    color: Color(generateColorFromName(name)).isDark() ? "white" : "black",
  }),
}));

export default Avatar;
