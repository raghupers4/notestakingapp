import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useSelector } from "react-redux";
import Draggable from "react-native-draggable";
import ImageZoom from "react-native-image-pan-zoom";
import {
  CategoryNotesDetails,
  CategoryNotesScreenProps,
} from "../constants/types";
import { RootState } from "../store";
import { Ionicons } from "@expo/vector-icons";

// This screen displays list of notes for each category in a two dimensional grid
function CategoryNotes({ navigation, route }: CategoryNotesScreenProps) {
  const notesList = useSelector(
    (state: RootState) => state.categoryNotes.notes
  );
  const [selectedId, setSelectedId] = useState<string>("");
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, [navigation, route]);

  // navigating to NotesScreen on press of each notes card
  const openNotes = (notesDetails: CategoryNotesDetails) => {
    setSelectedId(notesDetails.id);
    navigation.navigate("Notes", {
      categoryId: route.params.id,
      notesDetails,
    });
  };

  const handlesNotesLongPress = () => {
    console.log("long press");
  };

  // notes that are pinned
  const pinnedCategoryNotesList = useMemo(() => {
    return notesList.filter(
      (n) => n.categoryId === route.params.id && n.isPinned
    );
  }, [notesList]);

  // notes that are not pinned
  const otherCategoryNotesList = useMemo(() => {
    return notesList.filter(
      (n) => n.categoryId === route.params.id && !n.isPinned
    );
  }, [notesList]);

  const handleDragRelease = () => {
    console.log("on drag release");
  };

  // called for each item in the FlatList
  const renderItem: ListRenderItem<CategoryNotesDetails> = ({ item }) => {
    return (
      <Pressable
        onPress={() => openNotes(item)}
        onLongPress={handlesNotesLongPress}
      >
        <Image
          style={[styles.notesImg, { borderColor: route.params.ribbonColor }]}
          source={{ uri: item.notesImageUri }}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.pinnedCategoryNotes}>
        <Text style={styles.categoryTitle}>Pinned</Text>
        <FlatList
          data={pinnedCategoryNotesList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          extraData={selectedId}
        />
      </View>
      <View style={styles.otherCategoryNotes}>
        <Text style={styles.categoryTitle}>Others</Text>
        <FlatList
          data={otherCategoryNotesList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          extraData={selectedId}
        />
      </View>
      <Pressable
        style={styles.btnAddNotes}
        onPress={() =>
          openNotes({
            id: "New Notes",
            isPinned: false,
            categoryId: route.params.id,
            contents: {
              title: "",
              notes: "",
            },
            notesImageUri: "",
          })
        }
      >
        <Ionicons
          name="md-add-circle"
          size={56}
          color={route.params.ribbonColor}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pinnedCategoryNotes: {
    flex: 3,
  },
  otherCategoryNotes: {
    flex: 6,
  },
  notesImg: {
    width: 160,
    height: 160,
    marginHorizontal: 16,
    marginVertical: 8,
    resizeMode: "stretch",
    borderWidth: 2,
    borderRadius: 8,
    opacity: 1,
  },
  btnAddNotes: {
    flex: 1,
    alignSelf: "flex-end",
    marginRight: 24,
    marginBottom: 16,
  },
});

export default CategoryNotes;
