import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MoveToCategoryProps } from "../constants/types";
import { Categories } from "../constants/constants";

// component that displays list of avaialable categories
const MoveToCategory: React.FC<MoveToCategoryProps> = ({
  currentCategoryId,
  onCategorySelectedHandler,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const destinationCategories = Categories.filter(
    (c) => c.id !== currentCategoryId
  );

  // this handler gets invoked after selecting a category
  const onCategoryPressed = (id: number) => {
    setSelectedCategoryId(id);
    const selectedCategory = destinationCategories.find((c) => c.id === id);
    if (selectedCategory) {
      onCategorySelectedHandler(selectedCategory);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.selectTitle}>{"Select a category"}</Text>
      <View style={styles.titleDivider}></View>
      <View style={styles.itemsContainer}>
        {destinationCategories.map(({ id, name }) => {
          return (
            <View key={id}>
              <Pressable
                style={
                  selectedCategoryId === id ? styles.itemPressed : styles.item
                }
                onPress={() => onCategoryPressed(id)}
              >
                <FontAwesome name="folder" size={24} color="#F8D775" />
                <Text style={styles.categoryName}>{name}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(MoveToCategory);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 8,
  },
  selectTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleDivider: {
    marginTop: 8,
    borderBottomColor: "#1e90ff",
    borderBottomWidth: 2,
  },
  itemsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    flexDirection: "row",
    marginTop: 8,
  },
  categoryName: {
    fontSize: 16,
    marginLeft: 16,
  },
  itemPressed: {
    backgroundColor: "#ccc",
    flexDirection: "row",
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});
