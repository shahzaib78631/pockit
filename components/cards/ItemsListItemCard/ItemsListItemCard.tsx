import { Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { BaseCard } from "@/components/base";
import {
  ThemedButton,
  ThemedMaterialCommunityIcons,
  ThemedMaterialIcons,
  ThemedText,
} from "@/components/ui";

import { StyleSheet } from "react-native-unistyles";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { commonStyles } from "@/theme/styles";
import { useAppContext } from "@/context/AppContext";
import { Item } from "@/types/types";
import { ThemedFontAwesome6 } from "@/components/ui/ThemedIcons/ThemedIcons";
import { getString } from "@/strings/translations";

interface RightActionProps {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  onPress: () => void;
}

function RightAction({ prog, drag, onPress }: RightActionProps) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 70 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View style={styles.rightAction}>
        <View style={styles.rightActionContent}>
          <ThemedButton
            variant="text"
            onPress={onPress}
            buttonStyle={commonStyles.paddingXs}
          >
            <ThemedMaterialCommunityIcons
              color="onError"
              name="delete-outline"
              size={18}
            />
          </ThemedButton>
        </View>
      </View>
    </Reanimated.View>
  );
}

const ItemsListItemCard = ({
  item,
  onPress,
}: {
  item: Item;
  onPress?: (item: Item) => void;
}) => {
  const { store$ } = useAppContext();

  const handleItemPress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={70}
      renderRightActions={(prog, drag) => (
        <RightAction
          drag={drag}
          prog={prog}
          onPress={() => console.log("Delete")}
        />
      )}
    >
      <BaseCard style={styles.cardContainer} onPress={handleItemPress}>
        <View
          style={[
            commonStyles.rowJustifySpaceBetween,
            commonStyles.alignCenter,
            commonStyles.width100,
            commonStyles.paddingLg,
            commonStyles.borderBottom1,
            commonStyles.borderColor("primaryOutline"),
          ]}
        >
          <View style={[commonStyles.rowAlignCenter, commonStyles.gapSm]}>
            <ThemedText
              type="bold"
              fontSize="lg"
            >{`[${item?.sku}] ${item?.name}`}</ThemedText>
          </View>
          <ThemedMaterialCommunityIcons
            color="onSurface"
            name="dots-vertical"
            size={18}
          />
        </View>
        <View
          style={[
            commonStyles.width100,
            commonStyles.paddingLg,
            commonStyles.gapMd,
          ]}
        >
          <View
            style={[
              commonStyles.rowAlignCenter,
              commonStyles.gapSm,
              commonStyles.justifyBetween,
              commonStyles.width100,
            ]}
          >
            <View style={[commonStyles.rowAlignCenter, commonStyles.gapSm]}>
              <ThemedFontAwesome6
                color="cardForeground"
                size={14}
                name="boxes-packing"
              />
              <ThemedText type="semiBold" fontSize="md" color="cardForeground">
                {getString("items.quantity.label")}
              </ThemedText>
            </View>
            <ThemedText type="bold" fontSize="md">
              {`${0} ${
                store$.UnitsStore.getUnit(item?.base_unit?.unit_id as string)
                  ?.symbol
              }`}
            </ThemedText>
          </View>
          <View
            style={[
              commonStyles.rowAlignCenter,
              commonStyles.gapSm,
              commonStyles.justifyBetween,
              commonStyles.width100,
            ]}
          >
            <View style={[commonStyles.rowAlignCenter, commonStyles.gapSm]}>
              <ThemedFontAwesome6
                color="onBackground"
                size={14}
                name="money-bills"
              />
              <ThemedText type="semiBold" fontSize="md" color="cardForeground">
                {getString("items.selling_price.label")}
              </ThemedText>
            </View>
            <ThemedText type="bold" fontSize="md">
              {`${item.base_unit?.selling_price}${"$"}`}
            </ThemedText>
          </View>
        </View>
      </BaseCard>
    </ReanimatedSwipeable>
  );
};

export default ItemsListItemCard;

const styles = StyleSheet.create((theme) => ({
  cardContainer: {
    gap: 0,
    padding: 0,
  },
  swipeable: {
    height: 160,
  },
  rightAction: {
    width: 70,
  },
  rightActionContent: {
    height: 160,
    marginLeft: theme.margin.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.destructive,
    borderRadius: theme.borderRadius.md,
  },
  addBtn: {
    marginTop: "auto",
    marginLeft: "auto",
    padding: theme.padding.lg,
  },
  status: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
}));
