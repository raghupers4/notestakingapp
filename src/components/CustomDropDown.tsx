import React, { useState } from "react";
import { View, Text, StyleSheet, Picker } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CustomDropDownProps } from "../constants/types";

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  data,
  selectedValue,
  onDropDownValueChanged,
}) => {
  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onDropDownValueChanged}
      >
        {data.map(({ displayLabel, displayLabelValue }, index) => {
          return (
            <>
              <Picker.Item
                key={index}
                label={displayLabel}
                value={displayLabelValue}
              />
              <View style={styles.seperator} />
            </>
          );
        })}
      </Picker>
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  seperator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 8,
  },
});
