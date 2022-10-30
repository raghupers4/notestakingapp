import React from "react";
import CategoryLabel from "../components/CategoryLabel";
import { Pressable, View, StyleSheet } from "react-native";
import { CategoryLabelProps } from "../constants/interfaces";

const Categories = [
  { name: "Personal", ribbonColor: "#3a86ff" },
  { name: "Work", ribbonColor: "#eb5e28" },
  { name: "Goals", ribbonColor: "#bc4749" },
  { name: "Ideas", ribbonColor: "#ffc300" },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {Categories.map((category, index) => (
        <CategoryLabel key={index} {...category} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});

export default HomeScreen;
