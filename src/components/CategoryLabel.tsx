import React from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import { CategoryLabelProps } from "../constants/interfaces";

const CategoryLabel = ({ name, ribbonColor }: CategoryProps) => {
  return (
    <Pressable style={styles.container}>
      <View
        style={{
          width: 8,
          backgroundColor: ribbonColor,
        }}
      ></View>
      <Text style={styles.categoryTitle}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 64,
    borderColor: "#ced4da",
    borderRadius: 4,
    borderWidth: 2,
    width: 256,
    marginBottom: 8,
  },
  categoryTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 8,
  },
  ribbon: {
    width: 16,
  },
});

export default CategoryLabel;
