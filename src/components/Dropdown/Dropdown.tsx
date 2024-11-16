/**
 * Note: imports TextField dumb component
 */
import React, { ReactNode } from "react";
import { Platform, ScrollView, View } from "react-native";
import { List, Menu } from "react-native-paper";

import { COLORS } from "src/constants/colors";
import TextField from "../TextField/TextField";
import { DropdownOption, DropdownProps } from "./types";
import TextFieldOutline from "../TextField/TextFieldOutline";

import ChevronDown from "@assets/icons/chevron-down.svg";

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    options,
    onSelect,
    label,
    placeholder,
    styleItem,
    styleTitle,
    distanceMenuToDropdown = Platform.OS === "android" ? -20 : 0,
    maxHeight,
    error,
    isDisabled,
    required = false,
    titleNumberOfLines = 1,
    testID = "Dropdown",
    value,
    ...rest
  } = props;

  const [visible, setVisible] = React.useState(false);
  const [inputLayout, setInputLayout] = React.useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const openMenu = () => {
    if (!isDisabled) {
      setVisible(true);
    }
  };

  const closeMenu = () => setVisible(false);

  const handleSelect = (o: DropdownOption) => {
    onSelect?.(o);
    closeMenu();
  };

  return (
    <View
      style={{
        zIndex: 9999,
      }}
    >
      <Menu
        testID={testID}
        visible={visible}
        onDismiss={closeMenu}
        theme={{
          colors: {
            primary: COLORS.white,
          },
          roundness: 1,
        }}
        contentStyle={{
          borderRadius: 10,
          borderColor: COLORS.blue,
        }}
        anchor={
          <View onLayout={(e) => setInputLayout(e.nativeEvent.layout)}>
            <TextFieldOutline
              label={label as string}
              onPress={openMenu}
              testID={`${testID}Input`}
              placeholder={placeholder}
              value={value}
              required={required}
              error={error}
              editable={!isDisabled}
              right={<ChevronDown />}
            />
          </View>
        }
        style={[
          {
            width: inputLayout.width,
            marginTop:
              inputLayout.height + distanceMenuToDropdown + (error ? -24 : 2),
          },
        ]}
      >
        <DropdownMaxHeight maxHeight={maxHeight}>
          {options.map((o) => (
            <List.Item
              title={o.label}
              onPress={() => handleSelect(o)}
              key={o.value as string}
              testID={o.testID}
              style={styleItem}
              titleStyle={styleTitle}
              titleNumberOfLines={titleNumberOfLines}
            />
          ))}
        </DropdownMaxHeight>
      </Menu>
    </View>
  );
};

const DropdownMaxHeight = (props: {
  maxHeight?: number;
  children: ReactNode;
}) => {
  const { maxHeight = 350, children } = props;
  return <ScrollView style={{ maxHeight }}>{children}</ScrollView>;
};
