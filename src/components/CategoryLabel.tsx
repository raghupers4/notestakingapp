import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { CategoryLabelProps } from "../constants/types";

const CategoryLabel = ({
  category,
  onCategoryLabelPress,
}: CategoryLabelProps) => {
  const { id, name, ribbonColor } = category;
  return (
    <Pressable
      style={styles.labelContainer}
      onPress={() => onCategoryLabelPress(category)}
    >
      <View
        style={{
          width: 8,
          marginLeft: -1,
          backgroundColor: ribbonColor,
        }}
      ></View>
      <Text style={styles.categoryTitle}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    height: 64,
    flexDirection: "row",
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderColor: "#ced4da",
    borderRadius: 4,
    borderWidth: 2,
  },
  categoryTitle: {
    color: "#000",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  ribbon: {
    width: 16,
  },
});

export default CategoryLabel;
