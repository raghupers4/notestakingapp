import React from "react";
import CategoryLabel from "../components/CategoryLabel";
import { ImageBackground, Pressable, View, StyleSheet } from "react-native";
import { HomeScreenProps, Category } from "../constants/types";
import { Categories } from "../constants/constants";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onCategoryLabelPress = (category: Category) => {
    navigation.navigate("CategoryNotes", {
      ...category,
    });
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
              category={category}
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
