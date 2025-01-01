import {
  changeNavigationBarColor,
  setStatusBarColor,
} from "@/theme/utils/setBarColor";
import React, { createContext, ReactNode, useEffect } from "react";
import Color from "color";
import { UnistylesTheme } from "react-native-unistyles/lib/typescript/src/types";
import { UnistylesRuntime } from "react-native-unistyles";
import { commonStyles } from "@/theme/styles";
import { AppThemeName } from "react-native-unistyles/lib/typescript/src/specs/types";
import { Platform } from "react-native";

// Define the shape of the context data
interface ThemeContextType {
  commonStyles: typeof commonStyles;
  theme: UnistylesTheme;
  setTheme: (name?: AppThemeName) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Todo: Remove this and make it dynamic
  const theme: UnistylesTheme = UnistylesRuntime.getTheme();

  useEffect(() => {
    setTheme();
  }, []);

  const setTheme = (name?: AppThemeName) => {
    if (name) {
      UnistylesRuntime.setTheme(name);
    }

    const theme: UnistylesTheme = UnistylesRuntime.getTheme();

    if (Platform.OS === "android") {
      setTimeout(async () => {
        setStatusBarColor(theme.colors);
        changeNavigationBarColor(
          Color(theme.colors.surface2).hex(),
          theme.colors.isDark
        );
      }, 50);
    } else {
      setStatusBarColor(theme.colors);
      changeNavigationBarColor(
        Color(theme.colors.surface2).hex(),
        theme.colors.isDark
      );
    }
  };

  const setDarkMode = () => {
    setTheme("dark");
  };

  return (
    <ThemeContext.Provider value={{ commonStyles, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
