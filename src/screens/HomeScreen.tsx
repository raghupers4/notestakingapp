import React from "react";
import CategoryLabel from "../components/CategoryLabel";
import { ImageBackground, Pressable, View, StyleSheet } from "react-native";
import { HomeScreenProps } from "../constants/interfaces";

const Categories = [
  { id: 1, name: "Personal", ribbonColor: "#3a86ff" },
  { id: 2, name: "Work", ribbonColor: "#eb5e28" },
  { id: 3, name: "Goals", ribbonColor: "#bc4749" },
  { id: 4, name: "Ideas", ribbonColor: "#ffc300" },
];

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onCategoryLabelPress = (name: string) => {
    navigation.navigate("CategoryNotes");
  };
  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../../assets/notesimg.jpg")}
    >
      <View style={styles.categories}>
        {Categories.map((category, index) => (
          <CategoryLabel
            key={index}
            {...category}
            onCategoryLabelPress={onCategoryLabelPress}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: "100%",
  },
  categories: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
