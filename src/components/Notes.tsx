import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import constants from "../constants/constants";

const { priorities } = constants;
export default function Notes() {
  const [title, setTitle] = useState<string>("");
  const [titleErrorMsg, setTitleErrorMsg] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const titleRef = useRef<TextInput>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const onTitleChange = (txt: string) => {
    if (txt?.length > 16) {
      setTitleErrorMsg("Title cannot be more than 16 characters long");
    } else {
      setTitleErrorMsg("");
      setTitle(txt);
    }
  };

  return (
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
        onChangeText={(txt) => setNotes(txt)}
        placeholder="Notes"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
