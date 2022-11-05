import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryNotes from "../components/CategoryNotes";
import { RootStackParamList } from "../constants/interfaces";
import { StyleSheet } from "react-native";
import Notes from "../components/Notes";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function MainFrame() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="CategoryNotes"
        component={CategoryNotes}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen name="Notes" component={Notes} />
    </Stack.Navigator>
  );
}
