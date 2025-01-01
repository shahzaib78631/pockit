import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "@/strings/locales/en-US/translation.json";
import { StringMap } from "./types";

const resources = {
  en: { translation: translationEn },
};

export const initI18n = async () => {
  // let savedLanguage = await AsyncStorage.getItem("language");
  let savedLanguage = "en";

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

export const getString = (stringKey: keyof StringMap, options?: any) => {
  return i18n.t(stringKey, options) as string;
};

export default i18n;
