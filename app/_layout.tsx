import "@/components/sheets/sheets"; // Global Sheets import
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import EventSource from "react-native-sse";

global.EventSource = EventSource as any; // Polyfill for EventSource
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

// Toaster
import { Toaster } from "sonner-native";

const App = () => {
  /** Track font loading state */
  const [fontsLoaded, setFontsLoaded] = useState(false);

  /** Load custom fonts and initialize translations on mount */
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "JetBrainsMono-Regular": require("../assets/fonts/JetBrainsMono-Regular.ttf"),
        "JetBrainsMono-Bold": require("../assets/fonts/JetBrainsMono-Bold.ttf"),
        "JetBrainsMono-SemiBold": require("../assets/fonts/JetBrainsMono-SemiBold.ttf"),
        "JetBrainsMono-ExtraBold": require("../assets/fonts/JetBrainsMono-ExtraBold.ttf"),
        "JetBrainsMono-ExtraLight": require("../assets/fonts/JetBrainsMono-ExtraLight.ttf"),
        "JetBrainsMono-Light": require("../assets/fonts/JetBrainsMono-Light.ttf"),
        "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
        "JetBrainsMono-Thin": require("../assets/fonts/JetBrainsMono-Thin.ttf"),
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
              <Toaster />
            </SheetProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default App;
