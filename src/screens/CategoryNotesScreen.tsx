import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  BackHandler,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ImageZoom from "react-native-image-pan-zoom";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import {
  CategoryNotesDetails,
  CategoryNotesScreenProps,
  footerBtns,
  Category,
} from "../constants/types";
import { RootState } from "../store";
import ModalDialog from "../components/ModalDialog";
import MoveToCategory from "../components/MoveToCategory";
import {
  deleteNotes,
  moveToAnotherCategory,
} from "../reducers/CategoryNotesSlice";
import { dummyCategory, newNotes } from "../constants/constants";
// This screen displays list of notes for each category in a two dimensional grid
function CategoryNotes({ navigation, route }: CategoryNotesScreenProps) {
  const notesList = useSelector(
    (state: RootState) => state.categoryNotes.notes
  );
  const [selectedId, setSelectedId] = useState<string>("");
  const [longPressed, setLongPressed] = useState<boolean>(false);
  const notesItemsRef = useRef<typeof Pressable[]>(new Array());
  const [allNotesSelected, setAllNotesSelected] = useState<boolean>(false);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [showMoveCategoryModal, setShowMoveCategoryModal] =
    useState<boolean>(false);
  const [showDeleteNotesModal, setShowDeleteNotesModal] =
    useState<boolean>(false);
  const [selectedDestCategory, setSelectedDestCategory] =
    useState<Category>(dummyCategory);
  const dispatch = useDispatch();

  // handling device back button
  // works only for Android devices
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [longPressed]);

  // runs when multiple items are selected on long press
  useEffect(() => {
    if (longPressed) {
      // changing title and adding header right buttons
      navigation.setOptions({
        title:
          selectedNotes.length === 0
            ? "Select notes"
            : `${selectedNotes.length} selected`,
        headerRight: () => {
          return (
            <View style={styles.headerRightStyle}>
              {!allNotesSelected && (
                <Entypo
                  name="circle"
                  size={18}
                  color="black"
                  onPress={() => handleAllNotesSelection(true)}
                />
              )}
              {allNotesSelected && (
                <AntDesign
                  name="checkcircle"
                  size={18}
                  color="black"
                  onPress={() => handleAllNotesSelection(false)}
                />
              )}
              <Text style={{ fontSize: 12 }}>All</Text>
            </View>
          );
        },
      });
    } else {
      // displaying default values when long press is not activated
      navigation.setOptions({
        title: route.params.name,
        headerRight: () => {
          return <></>;
        },
      });
    }
  }, [navigation, route, longPressed, selectedNotes, allNotesSelected]);

  // on press of headerRight button (All)
  const handleAllNotesSelection = (allSelected: boolean) => {
    setSelectedNotes(allSelected ? notesList.map((n) => n.id) : []);
    setAllNotesSelected(allSelected);
  };

  // device back button handler event
  const backAction = () => {
    if (longPressed) {
      setLongPressed(false);
      setSelectedNotes([]);
      setAllNotesSelected(false);
    }
    return true;
  };

  // navigating to NotesScreen on press of each notes card
  const openNotes = (notesDetails: CategoryNotesDetails) => {
    setSelectedId(notesDetails.id);
    if (longPressed) {
      // remove the item if it is already in the list
      if (selectedNotes.find((n) => n === notesDetails.id)) {
        setSelectedNotes((selectedNotes) =>
          selectedNotes.filter((n) => n !== notesDetails.id)
        );
      } else {
        // add the item if it is not selected earlier
        setSelectedNotes((selectedNotes) => [
          ...selectedNotes,
          notesDetails.id,
        ]);
      }
    } else {
      navigation.navigate("Notes", {
        categoryId: route.params.id,
        notesDetails,
      });
    }
  };

  // handling long press event for each item
  const handlesNotesLongPress = (notesDetails: CategoryNotesDetails) => {
    setLongPressed(true);
    if (!selectedNotes.find((n) => n === notesDetails.id)) {
      setSelectedNotes((selectedNotes) => [...selectedNotes, notesDetails.id]);
    }
  };

  // notes that are pinned
  const pinnedCategoryNotesList = useMemo(() => {
    return notesList.filter(
      (n: CategoryNotesDetails) =>
        n.categoryId === route.params.id && n.isPinned
    );
  }, [notesList, route.params.id]);

  // notes that are not pinned
  const otherCategoryNotesList = useMemo(() => {
    return notesList.filter(
      (n: CategoryNotesDetails) =>
        n.categoryId === route.params.id && !n.isPinned
    );
  }, [notesList, route.params.id]);

  // called for each item in the FlatList
  // when item is long pressed item background color is changed to #ccc
  const renderItem: ListRenderItem<CategoryNotesDetails> = ({
    item,
    index,
  }) => {
    return (
      <Pressable
        onPress={() => openNotes(item)}
        onLongPress={() => handlesNotesLongPress(item)}
      >
        <Image
          style={[
            styles.notesImg,
            {
              backgroundColor: selectedNotes.find((n) => n === item.id)
                ? "#ccc"
                : "white",
              borderColor: route.params.ribbonColor,
            },
          ]}
          source={{ uri: item.notesImageUri }}
        />
      </Pressable>
    );
  };

  // displayed when long press is activated and atleast one item is selected
  const footerComponent = () => {
    if (longPressed && selectedNotes.length > 0) {
      return (
        <View style={[styles.footerMenu]}>
          <View style={styles.footerMenuItem}>
            <Pressable onPress={handleMove}>
              <AntDesign
                style={{ alignSelf: "center" }}
                name="arrowright"
                size={24}
                color={"black"}
              />
              <Text style={[styles.footerMenuItemText, { marginTop: 1 }]}>
                Move
              </Text>
            </Pressable>
          </View>
          <View style={styles.footerMenuItem}>
            <Pressable onPress={handleDelete}>
              <Ionicons
                style={{ alignSelf: "center" }}
                name="trash"
                size={24}
                color="black"
              />
              <Text style={styles.footerMenuItemText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  const onCategorySelectedHandler = useCallback(
    (selectedCategory: Category) => {
      setSelectedDestCategory(selectedCategory);
    },
    [setSelectedDestCategory]
  );

  const handleMove = () => {
    setShowMoveCategoryModal(true);
  };

  // this method is invoked when a category is selected in the modal dialog
  const moveToSelectedCategory = () => {
    // update redux store
    if (selectedNotes.length > 0) {
      dispatch(
        moveToAnotherCategory({
          selectedNotesIds: selectedNotes,
          selectedCategory: selectedDestCategory,
        })
      );
      setShowMoveCategoryModal(false);
      setLongPressed(false);
    }
  };

  // display modal dialog having Yes and No buttons
  const handleDelete = () => {
    setShowDeleteNotesModal(true);
  };

  const moveNotesToTrash = () => {
    if (selectedNotes.length > 0) {
      dispatch(deleteNotes(selectedNotes));
      setShowDeleteNotesModal(false);
      setLongPressed(false);
    }
  };

  // configuring MoveToCategory component footer buttons in the modal dialog
  const moveCategoryFooterBtns: footerBtns = useMemo(() => {
    return {
      positiveBtn: {
        text: "OK",
        handler: moveToSelectedCategory,
      },
      negativeBtn: {
        text: "Cancel",
        handler: () => setShowMoveCategoryModal(false),
      },
    };
  }, [showMoveCategoryModal]);

  // configuring footer buttons for delete operation in the modal dialog
  const deleteNotesFooterBtns: footerBtns = useMemo(() => {
    return {
      positiveBtn: {
        text: "Yes",
        handler: moveNotesToTrash,
      },
      negativeBtn: {
        text: "No",
        handler: () => setShowDeleteNotesModal(false),
      },
    };
  }, [showDeleteNotesModal]);

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
      <View style={styles.btnAddNotes}>
        <Pressable
          onPress={() =>
            openNotes({
              ...newNotes,
              categoryId: route.params.id,
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
      {footerComponent()}
      <ModalDialog
        modalVisible={showMoveCategoryModal}
        footerBtns={moveCategoryFooterBtns}
      >
        <MoveToCategory
          currentCategoryId={route.params.id}
          onCategorySelectedHandler={onCategorySelectedHandler}
        />
      </ModalDialog>
      <ModalDialog
        modalVisible={showDeleteNotesModal}
        footerBtns={deleteNotesFooterBtns}
      >
        <Text>{"Move the selected notes to trash?"}</Text>
      </ModalDialog>
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
  headerRightStyle: {
    marginRight: 16,
    marginTop: 8,
  },
  pinnedCategoryNotes: {
    flex: 8,
  },
  otherCategoryNotes: {
    flex: 18,
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
    alignSelf: "flex-end",
    marginRight: 16,
  },
  footerMenu: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 8,
  },
  footerMenuItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  footerMenuItemText: {
    color: "black",
    fontSize: 16,
  },
  iOSBoxShadow: {
    shadowColor: "blue",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  androidBoxShadow: {
    shadowColor: "blue",
    elevation: 20,
  },
});

export default CategoryNotes;
