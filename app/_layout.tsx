import { Stack } from "expo-router";
import { useEffect, useState } from "react";

// Import fonts library
import * as Font from "expo-font";

// Translation
import { initI18n } from "@/strings/translations";
import { View } from "react-native";
import { commonStyles } from "@/theme/styles";
import { ThemedActivityIndicator } from "@/components/ui";
import { ThemeProvider } from "@/context/ThemeContext";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// React Query and TRPC imports
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AppProvider } from "@/context/AppContext";

const App = () => {
  /** Track font loading state */
  const [fontsLoaded, setFontsLoaded] = useState(false);

  /** Load custom fonts and initialize translations on mount */
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "e-Ukraine-Regular": require("../assets/fonts/e-Ukraine-Regular.otf"),
        "e-Ukraine-Bold": require("../assets/fonts/e-Ukraine-Bold.otf"),
        "e-Ukraine-Light": require("../assets/fonts/e-Ukraine-Light.otf"),
        "e-Ukraine-Thin": require("../assets/fonts/e-Ukraine-Thin.otf"),
        "e-Ukraine-Medium": require("../assets/fonts/e-Ukraine-Medium.otf"),
        "e-Ukraine-UltraLight": require("../assets/fonts/e-Ukraine-UltraLight.otf"),
      });
      setFontsLoaded(true);
    };

    initI18n(); // Initialize i18n translations
    loadFonts(); // Load fonts
  }, []);

  /** Show loading indicator while fonts are loading */
  if (!fontsLoaded) {
    return (
      <View
        style={[
          commonStyles.flex1,
          commonStyles.center,
          commonStyles.container,
        ]}
      >
        <ThemedActivityIndicator />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={commonStyles.flex1}>
      <AppProvider>
        <KeyboardProvider>
          <ThemeProvider>
            <SheetProvider>
              <Stack
                screenOptions={{
                  headerShown: false, // Hide header globally
                  animation: "slide_from_bottom",
                }}
              >
                {/* Load the main tabs screen */}
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(items)" />
              </Stack>
            </SheetProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default App;
