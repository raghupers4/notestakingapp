import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryNotesScreen from "../screens/CategoryNotesScreen";
import { RootStackParamList } from "../constants/types";
import { StyleSheet, View } from "react-native";
import NotesScreen from "../screens/NotesScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
// navigation routes for all screens
export default function MainFrame() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CategoryNotes" component={CategoryNotesScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconsList: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bellIcon: {
    marginLeft: 32,
  },
});
