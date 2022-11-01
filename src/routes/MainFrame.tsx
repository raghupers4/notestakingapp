import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryNotes from "../components/CategoryNotes";
import { RootStackParamList } from "../constants/interfaces";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function MainFrame() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CategoryNotes" component={CategoryNotes} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
