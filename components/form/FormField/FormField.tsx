import React, { useRef, useState } from "react";
import {
  Platform,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// React Hook Fomr
import { Control, Controller } from "react-hook-form";

// Action Sheet
import { ActionSheetRef } from "react-native-actions-sheet";

// Date picker
import DateTimePicker from "@react-native-community/datetimepicker";

// Gesture handler
import { Pressable } from "react-native-gesture-handler";

// Context
import { useThemeContext } from "@/context/ThemeContext";

// Components
import BaseBottomActionSheet from "@/components/base/BaseBottomActionSheet";
import ErrorMessage from "@/components/form/ErrorMessage";
import { ThemedTextInput, ThemedText, ThemedCheckbox } from "@/components/ui";
import ThemedSegmentedControls from "@/components/ui/ThemedSegmentedControls";
import dayjs from "dayjs";

/**
 * Props for the base form field component.
 */
interface BaseFormFieldProps extends Omit<TextInputProps, "onChange"> {
  /** The label for the field. */
  label?: string;
  /** The name of the field in the form control. */
  name: string;
  /** Placeholder for the input field. */
  placeholder?: string;
  /** Control object from `react-hook-form`. */
  control: Control<any> | undefined;
  /** Error object for displaying validation errors. */
  error: any;
  /** Enables multiline input. */
  multiline?: boolean;
  /** Custom styles for the input field. */
  inputStyle?: TextStyle;
  /** Custom styles for the container. */
  containerStyle?: ViewStyle;
  /** Element prepended to the input field. */
  prepend?: React.ReactNode;
  /** Element appended to the input field. */
  append?: React.ReactNode;
  /** Help text displayed below the field. */
  helpText?: string;
  /** Type of the input field. */
  type?: "input" | "date" | "time" | "checkbox" | "segmented";
  /** Checkbox label position, defaults to "left". */
  checkboxPosition?: "left" | "right";

  formatter?: (value: string) => string;
}

/**
 * Props for fields of type `picker`.
 */
interface PickerFieldPropsBase extends Omit<BaseFormFieldProps, "type"> {
  type: "picker";
  /** Title for the picker sheet. */
  pickerSheetTitle: string;
  /** Function to format the field value for display. */
  fieldValue: (value: any) => string | null;
  /** Content to render inside the picker bottom sheet. */
  renderPickerContentComponent?: (
    value: any,
    onChange: (...event: any[]) => void
  ) => React.JSX.Element;
}

/**
 * Props for fields of type `segmented`.
 */
interface SegmentedFieldProps extends BaseFormFieldProps {
  type: "segmented";
  /** Labels for the segmented control. */
  labels?: string[];
  /** Values corresponding to each segment. */
  values?: any[];
  /** Custom styles for the segmented control. */
  segmentedControlStyle?: ViewStyle;
}

/**
 * Combined props for picker fields, supporting optional configurations.
 */
type PickerFieldProps = PickerFieldPropsBase &
  (
    | {
        renderPickerComponent: (
          value: any,
          onChange: (...event: any[]) => void
        ) => React.JSX.Element;
        pickerConfig: {
          open: () => void;
          close: () => void;
        };
      }
    | {
        renderPickerComponent?: undefined;
        pickerConfig?: undefined;
      }
  );

/**
 * Combined props for all form fields.
 */
type FormFieldProps =
  | BaseFormFieldProps
  | PickerFieldProps
  | SegmentedFieldProps;

/**
 * A flexible form field component that supports input, date, time, checkbox, and picker types.
 */
const FormField = ({
  label,
  name,
  placeholder,
  control,
  error,
  multiline = false,
  inputStyle = {},
  prepend,
  append,
  containerStyle,
  helpText,
  type = "input",
  checkboxPosition = "left",
  formatter,
  ...props
}: FormFieldProps): JSX.Element => {
  // Use the useThemeContext hook to get the current theme
  const { commonStyles, theme } = useThemeContext();

  const bottomSheetReference = useRef<ActionSheetRef>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [dateTimePickerValue, setDateTimePickerValue] = useState<
    Date | undefined
  >(new Date());

  const {
    pickerConfig,
    renderPickerComponent,
    pickerSheetTitle,
    renderPickerContentComponent,
    fieldValue,
  } = props as PickerFieldProps;

  const { labels, values } = props as SegmentedFieldProps;

  const handleDateTimePickerChange = (
    event: any,
    selectedDateTime: Date | undefined,
    onChange: (value: string) => void
  ) => {
    setShowPicker(false);
    if (selectedDateTime) {
      setDateTimePickerValue(selectedDateTime);
      onChange(selectedDateTime.toISOString());
    }
  };

  const renderFieldByType = ({
    value,
    onChange,
  }: {
    value: any;
    onChange: (value: any) => void;
  }) => {
    if (type === "segmented") {
      return (
        <ThemedSegmentedControls
          values={labels}
          selectedIndex={values?.indexOf(value)}
          onChange={(event) =>
            onChange(values?.[event.nativeEvent.selectedSegmentIndex])
          }
        />
      );
    } else if (type === "picker") {
      return (
        <>
          <TouchableOpacity
            onPress={() =>
              pickerConfig
                ? pickerConfig.open()
                : bottomSheetReference.current?.show()
            }
            activeOpacity={0.8}
          >
            <ThemedTextInput
              placeholder={placeholder}
              value={fieldValue(value) || ""}
              onTouchStart={() =>
                pickerConfig
                  ? pickerConfig.open()
                  : bottomSheetReference.current?.show()
              }
              editable={false}
              inputStyle={inputStyle}
              prepend={prepend}
              append={append}
              containerStyle={containerStyle}
              onPress={() =>
                pickerConfig
                  ? pickerConfig.open()
                  : bottomSheetReference.current?.show()
              }
              {...props}
            />
          </TouchableOpacity>
          {renderPickerContentComponent && (
            <BaseBottomActionSheet
              reference={bottomSheetReference}
              title={pickerSheetTitle}
            >
              {renderPickerContentComponent(value, onChange)}
            </BaseBottomActionSheet>
          )}
          {renderPickerComponent && renderPickerComponent(value, onChange)}
        </>
      );
    }

    if (type === "date" || type === "time") {
      return (
        <>
          <Pressable onPress={() => setShowPicker(true)}>
            <ThemedTextInput
              placeholder={placeholder}
              value={
                value
                  ? type === "date"
                    ? dayjs(value).format("MMM D, YYYY")
                    : value.toLocaleTimeString()
                  : ""
              }
              editable={false}
              inputStyle={inputStyle}
              prepend={prepend}
              append={append}
              containerStyle={containerStyle}
              {...props}
            />
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={value ? dayjs(value).toDate() : new Date()}
              mode={type}
              display="default"
              onChange={(event, date) =>
                handleDateTimePickerChange(event, date, onChange)
              }
            />
          )}
        </>
      );
    }

    if (type === "checkbox") {
      return (
        <ThemedCheckbox
          label={label || ""}
          value={!!value}
          onValueChange={onChange}
          buttonPosition={checkboxPosition}
        />
      );
    }

    return (
      <ThemedTextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
        inputStyle={inputStyle}
        prepend={prepend}
        append={append}
        containerStyle={containerStyle}
        {...props}
      />
    );
  };

  return (
    <View>
      {label && type !== "checkbox" && <ThemedText>{label}</ThemedText>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) =>
          renderFieldByType({
            value,
            onChange: (text) =>
              formatter ? onChange(formatter(text)) : onChange(text),
          })
        }
      />
      {helpText && (
        <ThemedText fontSize="sm" color="outline">
          {helpText}
        </ThemedText>
      )}
      {error && <ErrorMessage error={error.message} />}
    </View>
  );
};

export default FormField;
