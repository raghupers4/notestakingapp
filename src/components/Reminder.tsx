import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomDropDown from "./CustomDropDown";
import { DropDownItem } from "../constants/types";

const addReminderTitle = "Add Reminder";
const editReminderTitle = "Edit Reminder";
const timeTitle = "Time";
const dates: DropDownItem[] = [
  {
    displayLabel: "Today",
    displayLabelValue: "Dec 10",
  },
  {
    displayLabel: "Tomorrow",
    displayLabelValue: "Dec 11",
  },
];

const timeSlots = [
  {
    label: "Morning",
  },
];

const Reminder = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const onDateChanged = (itemValue: string, itemIndex: number) => {
    setSelectedDate(itemValue);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{addReminderTitle}</Text>
      <View>
        <Text style={styles.timeTitle}>{timeTitle}</Text>
        <CustomDropDown
          data={dates}
          selectedValue={selectedDate}
          onDropDownValueChanged={onDateChanged}
        />
      </View>
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    width: 240,
  },
  title: {
    fontSize: 24,
    color: "black",
  },
  timeContainer: {
    flex: 2,
  },
  timeTitle: {
    fontSize: 18,
  },
});
