import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  PixelRatio,
  BackHandler,
  Pressable,
} from "react-native";
import { footerBtns, NotesScreenProps } from "../constants/types";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ViewShot, { captureRef } from "react-native-view-shot";
import { HeaderBackButton } from "@react-navigation/elements";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addNotesToList, updateNotes } from "../reducers/CategoryNotesSlice";
import ModalDialog from "../components/ModalDialog";
import Reminder from "../components/Reminder";
// Screen where users can add or edit the notes by providing title and notes
export default function Notes({ navigation, route }: NotesScreenProps) {
  const [title, setTitle] = useState<string>("");
  const [titleErrorMsg, setTitleErrorMsg] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isNotesEdited, setIsNotesEdited] = useState<boolean>(false);
  const [capturingScreenShot, setCapturingScreenShot] =
    useState<boolean>(false);
  const [contentsNotChanged, setContentsNotChanged] = useState<boolean>(false);
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
  const titleRef = useRef<TextInput>(null);
  const viewShotRef = useRef<ViewShot>(null);
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
      headerLeft: () => <HeaderBackButton onPress={backButtonOnPress} />,
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
              <FontAwesome
                name="bell"
                color="black"
                size={24}
                onPress={handleReminderIconPress}
              />
            </View>
          </View>
        );
      },
    });
    // handling device back button
    // works only for Android devices
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [navigation, isPinned, title, notes, titleErrorMsg, contentsNotChanged]);

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

  const backAction = () => {
    handleViewShotCapture();
    return true;
  };

  // invoked when header back button is pressed
  // TODO:: when existing notes is opened, viewshot captured pictured quality is not good
  const backButtonOnPress = async () => {
    if (isNotesEdited && route?.params?.notesDetails?.contents) {
      const { title: prevTitle, notes: prevNotes } =
        route.params.notesDetails.contents;
      if (title === prevTitle) {
        if (notes === prevNotes) {
          // notes or title has not been changed when notes screen is opened for editing
          // titleRef.current?.setNativeProps({
          //   selection: { start: title.length - 1, end: title.length - 1 },
          // });
          // setContentsNotChanged(true);
        }
      }
    }
    await handleViewShotCapture();
  };

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

  const handleReminderIconPress = () => {
    setShowReminderModal((showReminder) => !showReminder);
  };

  const saveReminder = () => {};

  const cancelReminder = () => {};

  const reminderFooterBtns: footerBtns = {
    positiveBtn: {
      text: "Save",
      handler: saveReminder,
    },
    negativeBtn: {
      text: "Cancel",
      handler: cancelReminder,
    },
  };

  // captures the screenshot on header back button click or hardward back button (for Android)
  const handleViewShotCapture = async () => {
    try {
      // capture the screenshot only if there are no validation errors
      if (!titleErrorMsg && viewShotRef?.current) {
        setCapturingScreenShot(true);
        // viewShotRef.current.lastCapturedURI = "";
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
        setCapturingScreenShot(false);
        if (notes || title) {
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
  };
  // <ViewShot> component is used to take the screenshot of the screen
  // without header buttons
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
          style={
            capturingScreenShot
              ? [styles.title, { fontSize: 24 }]
              : styles.title
          }
          value={title}
          placeholder="Title"
          onChangeText={onTitleChange}
          underlineColorAndroid="transparent"
          caretHidden={capturingScreenShot}
        />
        {titleErrorMsg ? (
          <Text style={styles.titleErrorMsg}>{titleErrorMsg}</Text>
        ) : (
          ""
        )}
        <View style={styles.titleDivider}></View>
        <TextInput
          style={
            capturingScreenShot // enlarging font size of notes, so that user can see the contents clearly in the screenshot
              ? [styles.notes, { fontSize: 24 }]
              : styles.notes
          }
          multiline
          value={notes}
          onChangeText={onNotesChange}
          placeholder="Notes"
          caretHidden={capturingScreenShot} // not showing cursor in the screenshot
          underlineColorAndroid="transparent"
        />
      </View>
      {showReminderModal && (
        <ModalDialog
          modalVisible={showReminderModal}
          footerBtns={reminderFooterBtns}
        >
          <Reminder />
        </ModalDialog>
      )}
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
