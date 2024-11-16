import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface DropdownProps {
  /**
   * Test identifier
   */
  testID?: string;
  /**
   * Alias for DropDownPickerProps.items
   */
  options: DropdownOption[];
  /**
   * Callback for selecting an item
   */
  onSelect?: (option: DropdownOption) => void;
  /**
   * Label of the dropdown
   */
  label?: string;
  /**
   * Placeholder text to display when not option is selected
   */
  placeholder?: string;
  /**
   * RNPaper TextInput Props
   */
  variant?: "flat" | "outlined";
  /**
   * Item list style
   */
  styleItem?: StyleProp<ViewStyle>;
  /**
   * Item title style
   */
  styleTitle?: StyleProp<TextStyle>;
  /**
   * Distance px from menu to dropdown ui
   */
  distanceMenuToDropdown?: number;
  /**
   * Placeholder text color
   */
  placeholderTextColor?: string;
  /**
   * Dropdown maxHeight
   */
  maxHeight?: number;
  /**
   * Disable dropdown
   */
  isDisabled?: boolean;
  /**
   * Title style disabled.
   * Note: Used in pb
   */
  isTitleDisabled?: boolean;

  /**
   * Magiging importante ka sa buhay nya
   */
  required?: boolean;

  /**
   * Title number of lines
   */
  titleNumberOfLines?: number;

  error?: string;

  value: string;
}

export interface DropdownOption {
  /**
   * Test identifier
   */
  testID?: string;
  /**
   * Unique ID
   */
  id: string | number;
  /**
   * Text displayed on the dropdown
   */
  label: string;
  /**
   * Value held by the option
   */
  value: string | object;
  /**
   * Flag for selecting the tab option
   */
  selected?: boolean;
  /**
   * Flag for disallowing the option to be selected
   */
  disabled?: boolean;
}

export interface TitleProps {
  isPlaceholder?: boolean;
}
