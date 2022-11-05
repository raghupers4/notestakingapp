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
    // navigation.navigate("CategoryNotes", {
    //   name,
    // });
    navigation.navigate("Notes");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/notesimg.jpg")}
      >
        <View style={styles.categories}>
          {Categories.map((category) => (
            <CategoryLabel
              key={category.id}
              {...category}
              onCategoryLabelPress={onCategoryLabelPress}
            />
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  categories: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
