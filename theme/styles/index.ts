import {
  Dimensions,
  DimensionValue,
  I18nManager,
  TextStyle,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Margins,
  Paddings,
  Spacing,
} from "../types";

const { width, height } = Dimensions.get("window");

// COMMON STYLESHEET
export const commonStyles = StyleSheet.create((theme) => ({
  // width
  width: (width: DimensionValue) => ({
    width: width as DimensionValue,
  }),

  // height
  height: (height: DimensionValue) => ({
    height: height as DimensionValue,
  }),

  // Border Color
  borderColor: (color: keyof Colors | (string & {})) => ({
    borderColor: theme.colors[color as keyof Colors] ?? color,
  }),

  // Background Color
  backgroundColor: (color: keyof Colors | (string & {})) => ({
    backgroundColor: theme.colors[color as keyof Colors] ?? color,
  }),

  // COLOR
  color: (color: keyof Colors | (string & {})) => ({
    color: theme.colors[color as keyof Colors] ?? color,
  }),

  textAlign: (alignment: TextStyle["textAlign"]) => ({
    textAlign: alignment,
  }),

  // CONTAINER
  container: {
    paddingHorizontal: theme.padding.md,
    backgroundColor: theme?.colors?.background,
    flex: 1,
  },

  // WINDOW WIDTH AND HEIGHT
  windowHeight: { height: height },
  windowWidth: { width: width },

  // WIDTHS PERCENTAGE
  width100: { width: "100%" },
  width90: { width: "90%" },
  width80: { width: "80%" },
  width70: { width: "70%" },
  width60: { width: "60%" },
  width50: { width: "50%" },
  width40: { width: "40%" },
  width30: { width: "30%" },
  width20: { width: "20%" },
  width10: { width: "10%" },
  width0: { width: "0%" },

  // HEIGHTS PERCENTAGE
  height100: { height: "100%" },
  height90: { height: "90%" },
  height80: { height: "80%" },
  height70: { height: "70%" },
  height60: { height: "60%" },
  height50: { height: "50%" },
  height40: { height: "40%" },
  height30: { height: "30%" },
  height20: { height: "20%" },
  height10: { height: "10%" },
  height0: { height: "0%" },

  // Flex
  flex1: { flex: 1 },
  flex0: { flex: 0 },

  // Flex grow
  flexGrow1: { flexGrow: 1 },

  // Flex wrap
  flexWrap: { flexWrap: "wrap" },

  // Item Separator
  itemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: theme?.colors?.outline,
  },

  // Justify content
  justifyCenter: { justifyContent: "center" },
  justifyFlexEnd: { justifyContent: "flex-end" },
  justifyFlexStart: { justifyContent: "flex-start" },
  justifyBetween: { justifyContent: "space-between" },

  // Align Items
  alignCenter: { alignItems: "center" },
  alignLeft: { alignItems: "flex-start" },
  alignRight: { alignItems: "flex-end" },

  // Align Self
  alignSelfCenter: { alignSelf: "center" },
  alignSelfStart: { alignSelf: "flex-start" },
  alignSelfEnd: { alignSelf: "flex-end" },

  // Center Alignment
  center: { justifyContent: "center", alignItems: "center" },

  // Directions
  row: { flexDirection: "row" },
  col: { flexDirection: "column" },

  // Row Alignments
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  spaceBetween: {
    justifyContent: "space-between",
  },

  rowJustifySpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Positions
  absolute: { position: "absolute" },
  relative: { position: "relative" },

  // Absolute Positioning
  top0: { top: 0 },
  bottom0: { bottom: 0 },
  left0: { left: 0 },
  right0: { right: 0 },

  transform: { transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] },

  // Display
  displayNone: { display: "none" },
  displayFlex: { display: "flex" },

  // TEXT ALIGNMENT
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
  textLeft: { textAlign: "left" },

  //** PADDINGS */
  padding: (padding: keyof Paddings) => ({
    padding: theme.padding[padding],
  }),

  paddingHorizontal: (padding: keyof Paddings) => ({
    paddingHorizontal: theme.padding[padding],
  }),

  paddingVertical: (padding: keyof Paddings) => ({
    paddingVertical: theme.padding[padding],
  }),

  paddingTop: (padding: keyof Paddings) => ({
    paddingTop: theme.padding[padding],
  }),

  paddingBottom: (padding: keyof Paddings) => ({
    paddingBottom: theme.padding[padding],
  }),

  paddingLeft: (padding: keyof Paddings) => ({
    paddingLeft: theme.padding[padding],
  }),

  paddingRight: (padding: keyof Paddings) => ({
    paddingRight: theme.padding[padding],
  }),

  paddingXxl: {
    padding: theme.padding.xxl,
  },
  paddingXl: {
    padding: theme.padding.xl,
  },
  paddingLg: {
    padding: theme.padding.lg,
  },
  paddingMd: {
    padding: theme.padding.md,
  },
  paddingSm: {
    padding: theme.padding.sm,
  },
  paddingXs: {
    padding: theme.padding.xs,
  },
  paddingNone: {
    padding: theme.padding.none,
  },

  // Padding Left
  paddingLeftXxl: {
    paddingLeft: theme.padding.xxl,
  },
  paddingLeftXl: {
    paddingLeft: theme.padding.xl,
  },
  paddingLeftLg: {
    paddingLeft: theme.padding.lg,
  },
  paddingLeftMd: {
    paddingLeft: theme.padding.md,
  },
  paddingLeftSm: {
    paddingLeft: theme.padding.sm,
  },
  paddingLeftXs: {
    paddingLeft: theme.padding.xs,
  },
  paddingLeftNone: {
    paddingLeft: theme.padding.none,
  },

  // Padding Right
  paddingRightXxl: {
    paddingRight: theme.padding.xxl,
  },
  paddingRightXl: {
    paddingRight: theme.padding.xl,
  },
  paddingRightLg: {
    paddingRight: theme.padding.lg,
  },
  paddingRightMd: {
    paddingRight: theme.padding.md,
  },
  paddingRightSm: {
    paddingRight: theme.padding.sm,
  },
  paddingRightXs: {
    paddingRight: theme.padding.xs,
  },
  paddingRightNone: {
    paddingRight: theme.padding.none,
  },

  // Padding Top
  paddingTopXxl: {
    paddingTop: theme.padding.xxl,
  },
  paddingTopXl: {
    paddingTop: theme.padding.xl,
  },
  paddingTopLg: {
    paddingTop: theme.padding.lg,
  },
  paddingTopMd: {
    paddingTop: theme.padding.md,
  },
  paddingTopSm: {
    paddingTop: theme.padding.sm,
  },
  paddingTopXs: {
    paddingTop: theme.padding.xs,
  },
  paddingTopNone: {
    paddingTop: theme.padding.none,
  },

  // Padding Bottom
  paddingBottomXxl: {
    paddingBottom: theme.padding.xxl,
  },
  paddingBottomXl: {
    paddingBottom: theme.padding.xl,
  },
  paddingBottomLg: {
    paddingBottom: theme.padding.lg,
  },
  paddingBottomMd: {
    paddingBottom: theme.padding.md,
  },
  paddingBottomSm: {
    paddingBottom: theme.padding.sm,
  },
  paddingBottomXs: {
    paddingBottom: theme.padding.xs,
  },
  paddingBottomNone: {
    paddingBottom: theme.padding.none,
  },

  // Padding Horizontal (Left and Right)
  paddingHorizontalXxl: {
    paddingHorizontal: theme.padding.xxl,
  },
  paddingHorizontalXl: {
    paddingHorizontal: theme.padding.xl,
  },
  paddingHorizontalLg: {
    paddingHorizontal: theme.padding.lg,
  },
  paddingHorizontalMd: {
    paddingHorizontal: theme.padding.md,
  },
  paddingHorizontalSm: {
    paddingHorizontal: theme.padding.sm,
  },
  paddingHorizontalXs: {
    paddingHorizontal: theme.padding.xs,
  },
  paddingHorizontalNone: {
    paddingHorizontal: theme.padding.none,
  },

  // Padding Vertical (Top and Bottom)
  paddingVerticalXxl: {
    paddingVertical: theme.padding.xxl,
  },
  paddingVerticalXl: {
    paddingVertical: theme.padding.xl,
  },
  paddingVerticalLg: {
    paddingVertical: theme.padding.lg,
  },
  paddingVerticalMd: {
    paddingVertical: theme.padding.md,
  },
  paddingVerticalSm: {
    paddingVertical: theme.padding.sm,
  },
  paddingVerticalXs: {
    paddingVertical: theme.padding.xs,
  },
  paddingVerticalNone: {
    paddingVertical: theme.padding.none,
  },

  //** MARGINS */

  margin: (margin: keyof Margins) => ({
    margin: theme.margin[margin],
  }),

  marginHorizontal: (margin: keyof Margins) => ({
    marginHorizontal: theme.margin[margin],
  }),

  marginVertical: (margin: keyof Margins) => ({
    marginVertical: theme.margin[margin],
  }),

  marginTop: (margin: keyof Margins) => ({
    marginTop: theme.margin[margin],
  }),

  marginBottom: (margin: keyof Margins) => ({
    marginBottom: theme.margin[margin],
  }),

  marginLeft: (margin: keyof Margins) => ({
    marginLeft: theme.margin[margin],
  }),

  marginRight: (margin: keyof Margins) => ({
    marginRight: theme.margin[margin],
  }),

  // Themed Margin
  marginXxl: {
    margin: theme.margin.xxl,
  },
  marginXl: {
    margin: theme.margin.xl,
  },
  marginLg: {
    margin: theme.margin.lg,
  },
  marginMd: {
    margin: theme.margin.md,
  },
  marginSm: {
    margin: theme.margin.sm,
  },
  marginXs: {
    margin: theme.margin.xs,
  },

  // Margin Left
  marginLeftXxl: {
    marginLeft: theme.margin.xxl,
  },
  marginLeftXl: {
    marginLeft: theme.margin.xl,
  },
  marginLeftLg: {
    marginLeft: theme.margin.lg,
  },
  marginLeftMd: {
    marginLeft: theme.margin.md,
  },
  marginLeftSm: {
    marginLeft: theme.margin.sm,
  },
  marginLeftXs: {
    marginLeft: theme.margin.xs,
  },

  // Margin Right
  marginRightXxl: {
    marginRight: theme.margin.xxl,
  },
  marginRightXl: {
    marginRight: theme.margin.xl,
  },
  marginRightLg: {
    marginRight: theme.margin.lg,
  },
  marginRightMd: {
    marginRight: theme.margin.md,
  },
  marginRightSm: {
    marginRight: theme.margin.sm,
  },
  marginRightXs: {
    marginRight: theme.margin.xs,
  },

  // Margin Top
  marginTopXxl: {
    marginTop: theme.margin.xxl,
  },
  marginTopXl: {
    marginTop: theme.margin.xl,
  },
  marginTopLg: {
    marginTop: theme.margin.lg,
  },
  marginTopMd: {
    marginTop: theme.margin.md,
  },
  marginTopSm: {
    marginTop: theme.margin.sm,
  },
  marginTopXs: {
    marginTop: theme.margin.xs,
  },

  // Margin Bottom
  marginBottomXxl: {
    marginBottom: theme.margin.xxl,
  },
  marginBottomXl: {
    marginBottom: theme.margin.xl,
  },
  marginBottomLg: {
    marginBottom: theme.margin.lg,
  },
  marginBottomMd: {
    marginBottom: theme.margin.md,
  },
  marginBottomSm: {
    marginBottom: theme.margin.sm,
  },
  marginBottomXs: {
    marginBottom: theme.margin.xs,
  },

  // Margin Horizontal (Left and Right)
  marginHorizontalXxl: {
    marginHorizontal: theme.margin.xxl,
  },
  marginHorizontalXl: {
    marginHorizontal: theme.margin.xl,
  },
  marginHorizontalLg: {
    marginHorizontal: theme.margin.lg,
  },
  marginHorizontalMd: {
    marginHorizontal: theme.margin.md,
  },
  marginHorizontalSm: {
    marginHorizontal: theme.margin.sm,
  },
  marginHorizontalXs: {
    marginHorizontal: theme.margin.xs,
  },

  // Margin Vertical (Top and Bottom)
  marginVerticalXxl: {
    marginVertical: theme.margin.xxl,
  },
  marginVerticalXl: {
    marginVertical: theme.margin.xl,
  },
  marginVerticalLg: {
    marginVertical: theme.margin.lg,
  },
  marginVerticalMd: {
    marginVertical: theme.margin.md,
  },
  marginVerticalSm: {
    marginVertical: theme.margin.sm,
  },
  marginVerticalXs: {
    marginVertical: theme.margin.xs,
  },

  borderRadius: (radius: keyof BorderRadius) => ({
    borderRadius: theme.borderRadius[radius],
  }),

  borderRadiusTopLeft: (radius: keyof BorderRadius) => ({
    borderTopLeftRadius: theme.borderRadius[radius],
  }),

  borderRadiusTopRight: (radius: keyof BorderRadius) => ({
    borderTopRightRadius: theme.borderRadius[radius],
  }),

  borderRadiusBottomLeft: (radius: keyof BorderRadius) => ({
    borderBottomLeftRadius: theme.borderRadius[radius],
  }),

  borderRadiusBottomRight: (radius: keyof BorderRadius) => ({
    borderBottomRightRadius: theme.borderRadius[radius],
  }),

  borderRadiusHorizontal: (radius: keyof BorderRadius) => ({
    borderTopLeftRadius: theme.borderRadius[radius],
    borderTopRightRadius: theme.borderRadius[radius],
    borderBottomLeftRadius: theme.borderRadius[radius],
    borderBottomRightRadius: theme.borderRadius[radius],
  }),

  borderRadiusVertical: (radius: keyof BorderRadius) => ({
    borderTopLeftRadius: theme.borderRadius[radius],
    borderTopRightRadius: theme.borderRadius[radius],
    borderBottomLeftRadius: theme.borderRadius[radius],
    borderBottomRightRadius: theme.borderRadius[radius],
  }),

  // Themed Border Radius
  borderRadiusXxl: {
    borderRadius: theme.borderRadius.xxl,
  },
  borderRadiusXl: {
    borderRadius: theme.borderRadius.xl,
  },
  borderRadiusLg: {
    borderRadius: theme.borderRadius.lg,
  },
  borderRadiusMd: {
    borderRadius: theme.borderRadius.md,
  },
  borderRadiusSm: {
    borderRadius: theme.borderRadius.sm,
  },
  borderRadiusXs: {
    borderRadius: theme.borderRadius.xs,
  },

  // Border Radius Top Left
  borderRadiusTopLeftXxl: {
    borderTopLeftRadius: theme.borderRadius.xxl,
  },
  borderRadiusTopLeftXl: {
    borderTopLeftRadius: theme.borderRadius.xl,
  },
  borderRadiusTopLeftLg: {
    borderTopLeftRadius: theme.borderRadius.lg,
  },
  borderRadiusTopLeftMd: {
    borderTopLeftRadius: theme.borderRadius.md,
  },
  borderRadiusTopLeftSm: {
    borderTopLeftRadius: theme.borderRadius.sm,
  },
  borderRadiusTopLeftXs: {
    borderTopLeftRadius: theme.borderRadius.xs,
  },

  // Border Radius Top Right
  borderRadiusTopRightXxl: {
    borderTopRightRadius: theme.borderRadius.xxl,
  },
  borderRadiusTopRightXl: {
    borderTopRightRadius: theme.borderRadius.xl,
  },
  borderRadiusTopRightLg: {
    borderTopRightRadius: theme.borderRadius.lg,
  },
  borderRadiusTopRightMd: {
    borderTopRightRadius: theme.borderRadius.md,
  },
  borderRadiusTopRightSm: {
    borderTopRightRadius: theme.borderRadius.sm,
  },
  borderRadiusTopRightXs: {
    borderTopRightRadius: theme.borderRadius.xs,
  },

  // Border Radius Bottom Left
  borderRadiusBottomLeftXxl: {
    borderBottomLeftRadius: theme.borderRadius.xxl,
  },
  borderRadiusBottomLeftXl: {
    borderBottomLeftRadius: theme.borderRadius.xl,
  },
  borderRadiusBottomLeftLg: {
    borderBottomLeftRadius: theme.borderRadius.lg,
  },
  borderRadiusBottomLeftMd: {
    borderBottomLeftRadius: theme.borderRadius.md,
  },
  borderRadiusBottomLeftSm: {
    borderBottomLeftRadius: theme.borderRadius.sm,
  },
  borderRadiusBottomLeftXs: {
    borderBottomLeftRadius: theme.borderRadius.xs,
  },

  // Border Radius Bottom Right
  borderRadiusBottomRightXxl: {
    borderBottomRightRadius: theme.borderRadius.xxl,
  },
  borderRadiusBottomRightXl: {
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  borderRadiusBottomRightLg: {
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  borderRadiusBottomRightMd: {
    borderBottomRightRadius: theme.borderRadius.md,
  },
  borderRadiusBottomRightSm: {
    borderBottomRightRadius: theme.borderRadius.sm,
  },
  borderRadiusBottomRightXs: {
    borderBottomRightRadius: theme.borderRadius.xs,
  },

  // Border Radius Horizontal (Left and Right)
  borderRadiusHorizontalXxl: {
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    borderBottomLeftRadius: theme.borderRadius.xxl,
    borderBottomRightRadius: theme.borderRadius.xxl,
  },
  borderRadiusHorizontalXl: {
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  borderRadiusHorizontalLg: {
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  borderRadiusHorizontalMd: {
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
  },
  borderRadiusHorizontalSm: {
    borderTopLeftRadius: theme.borderRadius.sm,
    borderTopRightRadius: theme.borderRadius.sm,
    borderBottomLeftRadius: theme.borderRadius.sm,
    borderBottomRightRadius: theme.borderRadius.sm,
  },
  borderRadiusHorizontalXs: {
    borderTopLeftRadius: theme.borderRadius.xs,
    borderTopRightRadius: theme.borderRadius.xs,
    borderBottomLeftRadius: theme.borderRadius.xs,
    borderBottomRightRadius: theme.borderRadius.xs,
  },

  // Border Radius Vertical (Top and Bottom)
  borderRadiusVerticalXxl: {
    borderTopLeftRadius: theme.borderRadius.xxl,
    borderTopRightRadius: theme.borderRadius.xxl,
    borderBottomLeftRadius: theme.borderRadius.xxl,
    borderBottomRightRadius: theme.borderRadius.xxl,
  },
  borderRadiusVerticalXl: {
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
  },
  borderRadiusVerticalLg: {
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  borderRadiusVerticalMd: {
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomLeftRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md,
  },
  borderRadiusVerticalSm: {
    borderTopLeftRadius: theme.borderRadius.sm,
    borderTopRightRadius: theme.borderRadius.sm,
    borderBottomLeftRadius: theme.borderRadius.sm,
    borderBottomRightRadius: theme.borderRadius.sm,
  },
  borderRadiusVerticalXs: {
    borderTopLeftRadius: theme.borderRadius.xs,
    borderTopRightRadius: theme.borderRadius.xs,
    borderBottomLeftRadius: theme.borderRadius.xs,
    borderBottomRightRadius: theme.borderRadius.xs,
  },

  // BACKGROUND COLORS
  bgTransparent: { backgroundColor: "transparent" },

  // COLOR
  colorBlack: { color: "black" },

  // Overflow Hidden
  overflowHidden: { overflow: "hidden" },

  // TEXT DECORATION
  textDecorationSolidUnderline: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },

  // BORDER
  noBorder: { borderWidth: 0 },
  borderBottom0: { borderBottomWidth: 0 },
  borderTop0: { borderTopWidth: 0 },
  borderLeft0: { borderLeftWidth: 0 },
  borderRight0: { borderRightWidth: 0 },
  borderDanger: { borderColor: theme.colors.error, borderWidth: 1 },
  borderPrimary: { borderColor: theme.colors.primaryOutline, borderWidth: 1 },

  border: (width: number, color: keyof Colors) => ({
    borderWidth: width,
    borderColor: theme.colors[color],
  }),

  borderTop: (width: number, color: keyof Colors) => ({
    borderTopWidth: width,
    borderTopColor: theme.colors[color],
  }),

  borderBottom: (width: number, color: keyof Colors) => ({
    borderBottomWidth: width,
    borderBottomColor: theme.colors[color],
  }),

  borderLeft: (width: number, color: keyof Colors) => ({
    borderLeftWidth: width,
    borderLeftColor: theme.colors[color],
  }),

  borderRight: (width: number, color: keyof Colors) => ({
    borderRightWidth: width,
    borderRightColor: theme.colors[color],
  }),

  borderLeft1: {
    borderLeftWidth: 1,
    borderColor: theme.colors.outline,
  },
  border1: {
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  border2: {
    borderWidth: 2,
    borderColor: theme.colors.outline,
  },
  borderTop1: {
    borderTopWidth: 1,
    borderColor: theme.colors.outline,
  },
  borderBottom1: {
    borderBottomWidth: 1,
    borderColor: theme.colors.primaryOutline,
  },
  borderRight1: {
    borderRightWidth: 1,
    borderColor: theme.colors.outline,
  },

  gap: (gap: keyof Spacing) => ({
    gap: theme.spacing[gap],
  }),

  gapVertical: (gap: keyof Spacing) => ({
    rowGap: theme.spacing[gap],
  }),

  gapHorizontal: (gap: keyof Spacing) => ({
    columnGap: theme.spacing[gap],
  }),

  // Themed Gap
  gapXxl: {
    gap: theme.spacing.xxl,
  },
  gapXl: {
    gap: theme.spacing.xl,
  },
  gapLg: {
    gap: theme.spacing.lg,
  },
  gapMd: {
    gap: theme.spacing.md,
  },
  gapSm: {
    gap: theme.spacing.sm,
  },
  gapXs: {
    gap: theme.spacing.xs,
  },

  // Gap Between Rows (Vertical)
  gapVerticalXxl: {
    rowGap: theme.spacing.xxl,
  },
  gapVerticalXl: {
    rowGap: theme.spacing.xl,
  },
  gapVerticalLg: {
    rowGap: theme.spacing.lg,
  },
  gapVerticalMd: {
    rowGap: theme.spacing.md,
  },
  gapVerticalSm: {
    rowGap: theme.spacing.sm,
  },
  gapVerticalXs: {
    rowGap: theme.spacing.xs,
  },

  // Gap Between Columns (Horizontal)
  gapHorizontalXxl: {
    columnGap: theme.spacing.xxl,
  },
  gapHorizontalXl: {
    columnGap: theme.spacing.xl,
  },
  gapHorizontalLg: {
    columnGap: theme.spacing.lg,
  },
  gapHorizontalMd: {
    columnGap: theme.spacing.md,
  },
  gapHorizontalSm: {
    columnGap: theme.spacing.sm,
  },
  gapHorizontalXs: {
    columnGap: theme.spacing.xs,
  },

  tabsContainer: {
    height: 32,
  },

  fontSize: (size: keyof FontSize) => ({
    fontSize: theme.fontSize[size],
  }),

  // Themed Font Size
  fontSizeXxl: {
    fontSize: theme.fontSize.xxl,
  },
  fontSizeXl: {
    fontSize: theme.fontSize.xl,
  },
  fontSizeLg: {
    fontSize: theme.fontSize.lg,
  },
  fontSizeMd: {
    fontSize: theme.fontSize.md,
  },
  fontSizeSm: {
    fontSize: theme.fontSize.sm,
  },
  fontSizeXs: {
    fontSize: theme.fontSize.xs,
  },

  // Font Size for Heading (Example)
  headingXxl: {
    fontSize: theme.fontSize.xxl,
    fontFamily: theme.fontFamily.bold,
  },
  headingXl: {
    fontSize: theme.fontSize.xl,
    fontFamily: theme.fontFamily.bold,
  },
  headingLg: {
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.bold,
  },

  fontFamily: (weight: keyof FontFamily) => ({
    fontFamily: theme.fontFamily[weight],
  }),

  fontRegular: {
    fontFamily: theme.fontFamily.regular,
  },

  fontExtraBold: {
    fontFamily: theme.fontFamily.extraBold,
  },
  fontExtraLight: {
    fontFamily: theme.fontFamily.extraLight,
  },

  fontMedium: {
    fontFamily: theme.fontFamily.medium,
  },

  fontLight: {
    fontFamily: theme.fontFamily.light,
  },

  fontBold: {
    fontFamily: theme.fontFamily.bold,
  },
  fontSemiBold: {
    fontFamily: theme.fontFamily.semiBold,
  },

  fontThin: {
    fontFamily: theme.fontFamily.thin,
  },
}));
