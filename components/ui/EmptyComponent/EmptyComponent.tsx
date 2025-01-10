import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import ThemedText from "@/components/ui/ThemedText";
import { ThemedMaterialCommunityIcons } from "@/components/ui/ThemedIcons";

// Define the props for the component
export interface ThemedListEmptyComponentProps {
  /** Icon to be displayed, provided as a React element. If not provided, a default icon is used. */
  icon?: React.ReactNode;
  /** The main title to be displayed. */
  title?: string;
  /** The subtitle to be displayed below the title. */
  subtitle?: string;
  /** Optional custom styles for the container. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Optional custom styles for the title. */
  titleStyle?: StyleProp<TextStyle>;
  /** Optional custom styles for the subtitle. */
  subtitleStyle?: StyleProp<TextStyle>;
}

const ThemedListEmptyComponent: React.FC<ThemedListEmptyComponentProps> = ({
  icon,
  title = "Yo~ It's empty here!",
  subtitle = "Please check back later or try refreshing.",
  containerStyle,
}) => {
  const { commonStyles } = useThemeContext();

  /**
   * Default icon component to display when no custom icon is provided.
   */
  const DefaultIcon = () => (
    <ThemedMaterialCommunityIcons name="balloon" size={120} color={"surface"} />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>{icon ? icon : <DefaultIcon />}</View>
      <View style={[commonStyles.gapSm, commonStyles.alignCenter]}>
        <ThemedText fontSize="xxxl" type="medium" color="onPrimaryContainer">
          {title}
        </ThemedText>
        <ThemedText fontSize="sm" type="regular" color="outline">
          {subtitle}
        </ThemedText>
      </View>
    </View>
  );
};

export default ThemedListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 10,
  },
});
