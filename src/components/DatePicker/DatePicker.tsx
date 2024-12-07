import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity, View } from "react-native";
import TextFieldOutline from "../TextField/TextFieldOutline";
import { formatDate } from "src/helpers/formatDate";

export type DatePickerProps = {
  onChange?: (newDate: Date) => void;
  label: string;
};

const DatePicker = (props: DatePickerProps) => {
  const { onChange: _onChange, label } = props;
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
    _onChange?.(selectedDate as Date);
  };

  const showDatePicker = () => setShowPicker(true);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => showDatePicker()}>
        <TextFieldOutline
          label={label}
          value={formatDate(date)}
          editable={false}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
