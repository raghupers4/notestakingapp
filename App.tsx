import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import MainFrame from "./src/routes/MainFrame";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainFrame />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
