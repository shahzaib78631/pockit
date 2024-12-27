import React from "react";
import { View } from "react-native";
import { ThemedText } from "@/components/ui"; // Assuming you have a styled text component
import { getString } from "@/strings/translations";
import { StringMap } from "@/strings/types";

type ErrorMessageProps = {
  error: any; // Error object, as returned by react-hook-form validation
  style?: object; // Optional custom style
};

const ErrorMessage = ({ error, style }: ErrorMessageProps) => {
  if (!error) return null; // Don't render anything if there is no error

  // Get the error message using the error key and the translations
  const errorMessage = getString(error as keyof StringMap);

  return (
    <View style={style}>
      <ThemedText color={"error"} fontSize={"sm"}>
        {errorMessage}
      </ThemedText>
    </View>
  );
};

export default ErrorMessage;
