import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, TextInput, PixelRatio } from "react-native";
import constants from "../constants/constants";
import { NotesScreenProps } from "../constants/types";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ViewShot, { captureRef } from "react-native-view-shot";
import { HeaderBackButton } from "@react-navigation/elements";
import { useDispatch, useSelector } from "react-redux";
import { addNotesToList, updateNotes } from "../reducers/CategoryNotesSlice";
import { nanoid } from "nanoid";

// Screen where users can add or edit the notes by providing title and notes
export default function Notes({ navigation, route }: NotesScreenProps) {
  const [title, setTitle] = useState<string>("");
  const [titleErrorMsg, setTitleErrorMsg] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isNotesEdited, setIsNotesEdited] = useState<boolean>(false);
  const titleRef = useRef<TextInput>(null);
  const viewShotRef = useRef<any>(null);
  const viewRef = useRef<View>(null);
  const dispatch = useDispatch();
  const targetPixelCount = 1080; // full HD pictures
  const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
  // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
  const pixels = targetPixelCount / pixelRatio;

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // dynamically setting navigation options like backbutton and headerRight buttons
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton onPress={handleViewShotCapture} />,
      headerRight: () => {
        return (
          <View style={styles.headerRightButtons}>
            <View style={styles.pinIcon}>
              <AntDesign
                name={isPinned ? "pushpin" : "pushpino"}
                size={24}
                onPress={handlePinPress}
                color="black"
              />
            </View>
            <View style={styles.bellIcon}>
              <FontAwesome name="bell" color="black" size={24} />
            </View>
          </View>
        );
      },
    });
  }, [navigation, isPinned, title, notes]);

  useEffect(() => {
    if (
      route.params.notesDetails &&
      Object.keys(route.params.notesDetails).length > 0 &&
      route.params.notesDetails.id !== "New Notes"
    ) {
      const { isPinned, contents } = route.params.notesDetails;
      setIsPinned(isPinned);
      setTitle(contents.title);
      setNotes(contents.notes);
      setIsNotesEdited(true);
    }
  }, [route]);

  const onTitleChange = (txt: string) => {
    if (txt?.length > 16) {
      setTitleErrorMsg("Title cannot be more than 16 characters long");
    } else {
      setTitleErrorMsg("");
      setTitle(txt);
    }
  };

  const onNotesChange = (txt: string) => {
    setNotes(txt);
  };

  const handlePinPress = () => {
    setIsPinned((isPin) => !isPin);
  };

  // captures the screenshot on header back button click
  const handleViewShotCapture = useCallback(async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();
        const details = {
          categoryId: route.params.categoryId,
          isPinned,
          notesImageUri: uri,
          contents: {
            title,
            notes,
          },
        };
        if (notes && title) {
          if (isNotesEdited) {
            dispatch(
              updateNotes({
                id: route.params.notesDetails.id,
                ...details,
              })
            );
          } else {
            dispatch(
              addNotesToList({
                id: nanoid(),
                ...details,
              })
            );
          }
        }
        navigation.goBack();
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }, [title, notes, isPinned, route]);

  // <ViewShot> component is used to take the screenshot of the screen
  return (
    <ViewShot
      style={styles.viewShot}
      ref={viewShotRef}
      options={{
        format: "png",
        quality: 1,
        result: "data-uri",
      }}
    >
      <View style={styles.container}>
        <TextInput
          ref={titleRef}
          style={styles.title}
          value={title}
          placeholder="Title"
          onChangeText={onTitleChange}
        />
        {titleErrorMsg ? (
          <Text style={styles.titleErrorMsg}>{titleErrorMsg}</Text>
        ) : (
          ""
        )}
        <View style={styles.titleDivider}></View>
        <TextInput
          style={styles.notes}
          multiline
          value={notes}
          onChangeText={onNotesChange}
          placeholder="Notes"
        />
      </View>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  viewShot: {
    flex: 1,
  },
  headerRightButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 16,
  },
  pinIcon: {
    borderColor: "black",
    borderRadius: 2,
  },
  bellIcon: {
    marginLeft: 16,
  },
  container: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  title: {
    color: "black",
    fontSize: 20,
  },
  titleErrorMsg: {
    color: "red",
    fontSize: 16,
    marginTop: 8,
  },
  titleDivider: {
    marginTop: 8,
    borderTopColor: "#1e90ff",
    borderTopWidth: 4,
    alignSelf: "stretch",
    height: 8,
    width: "100%",
  },
  notes: {
    color: "black",
    fontSize: 16,
  },
});
