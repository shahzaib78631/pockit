import { defaultTheme } from "./defaultTheme";
import { tabbieTheme } from "./tabbieTheme";
import { lavenderTheme } from "./lavender";
import { yotsubaTheme } from "./yotsuba";
import { takoTheme } from "./tako";
import { midnightDusk } from "./midnightDusk";
import { tealTurquoiseTheme } from "./tealTourquoise";
import { strawberryDaiquiriTheme } from "./strawberry";

const Themes = {
  defaultTheme,
  tabbieTheme,
  lavenderTheme,
  yotsubaTheme,
  takoTheme,
  midnightDusk,
  tealTurquoiseTheme,
  strawberryDaiquiriTheme,
};

export const lightThemes = [
  defaultTheme.light,
  midnightDusk.light,
  tealTurquoiseTheme.light,
  yotsubaTheme.light,
  lavenderTheme.light,
  strawberryDaiquiriTheme.light,
  takoTheme.light,
];
export const darkThemes = [
  defaultTheme.dark,
  midnightDusk.dark,
  tealTurquoiseTheme.dark,
  yotsubaTheme.dark,
  lavenderTheme.dark,
  strawberryDaiquiriTheme.dark,
  takoTheme.dark,
];

export default Themes;
