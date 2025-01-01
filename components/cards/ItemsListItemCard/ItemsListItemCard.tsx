import { Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { BaseCard } from "@/components/base";
import {
  ThemedButton,
  ThemedMaterialCommunityIcons,
  ThemedMaterialIcons,
  ThemedText,
} from "@/components/ui";

import { getString } from "@/strings/translations";
import { StyleSheet } from "react-native-unistyles";
import { formatCurrency } from "@/utils/formatCurrency";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { commonStyles } from "@/theme/styles";
import { Tables } from "@/database/database.types";
import { observer } from "@legendapp/state/react";
import { useAppContext } from "@/context/AppContext";
import { Item } from "@/types/types";

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

  const getBuyingPrice = useMemo(() => {
    if (item?.selling_type === "whole") {
      return formatCurrency("$", item?.whole_buying_price || 0);
    } else if (item?.selling_type === "unit") {
      return formatCurrency("$", item?.unit_buying_price || 0);
    }
  }, [item]);

  const getSellingPrice = useMemo(() => {
    if (item?.selling_type === "whole") {
      return formatCurrency("$", item?.whole_selling_price || 0);
    } else if (item?.selling_type === "unit") {
      return formatCurrency("$", item?.unit_selling_price || 0);
    }
  }, [item]);

  const getAvailableStock = useMemo(() => {
    if (item?.selling_type === "whole") {
      return item?.inventory?.[0]?.whole_count || 0;
    }
    if (item?.selling_type === "unit") {
      return item?.inventory?.[0]?.unit_count || 0;
    }
  }, [item]);

  styles.useVariants({
    color: getAvailableStock === 0,
  });

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
            commonStyles.borderColor("background"),
          ]}
        >
          <View style={[commonStyles.rowAlignCenter, commonStyles.gapSm]}>
            <View style={[styles.status]} />
            <ThemedText
              type="medium"
              fontSize="md"
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
            commonStyles.rowAlignCenter,
            commonStyles.justifyBetween,
          ]}
        >
          <View
            style={[
              commonStyles.paddingLg,
              commonStyles.gapMd,
              commonStyles.flex1,
            ]}
          >
            <View style={[commonStyles.gapXs]}>
              <ThemedText type="regular" fontSize="sm" color="onSurfaceVariant">
                {getString("form.items.current_stock.label")}
              </ThemedText>
              <ThemedText fontSize="sm" type="medium">
                {getAvailableStock}
              </ThemedText>
            </View>
            <View style={[commonStyles.gapXs]}>
              <ThemedText type="regular" fontSize="sm" color="onSurfaceVariant">
                {getString("form.items.selling_price.label")}
              </ThemedText>
              <ThemedText fontSize="sm" type="medium">
                {getSellingPrice}
              </ThemedText>
            </View>
          </View>
          <View
            style={[
              commonStyles.paddingLg,
              commonStyles.gapMd,
              commonStyles.flex1,
            ]}
          >
            <View style={[commonStyles.gapXs]}>
              <ThemedText type="regular" fontSize="sm" color="onSurfaceVariant">
                {getString("form.items.category.label")}
              </ThemedText>
              <ThemedText fontSize="sm" type="medium">
                {item?.category_id
                  ? store$.CategoriesStore.getCategoryName(item?.category_id)
                  : "-"}
              </ThemedText>
            </View>
            <View style={[commonStyles.gapXs]}>
              <ThemedText type="regular" fontSize="sm" color="onSurfaceVariant">
                {getString("form.items.buying_price.label")}
              </ThemedText>
              <ThemedText fontSize="sm" type="medium">
                {getBuyingPrice}
              </ThemedText>
            </View>
          </View>
          <View style={styles.addBtn}>
            <ThemedButton
              color={"secondary"}
              buttonStyle={commonStyles.paddingSm}
            >
              <ThemedMaterialIcons color="onSecondary" name="add" size={18} />
            </ThemedButton>
          </View>
        </View>
      </BaseCard>
    </ReanimatedSwipeable>
  );
};

export default observer(ItemsListItemCard);

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
    backgroundColor: theme.colors.error,
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
    variants: {
      color: {
        true: {
          backgroundColor: theme.colors.error,
        },
      },
    },
  },
}));
