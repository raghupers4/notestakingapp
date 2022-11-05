import type { NativeStackScreenProps } from "@react-navigation/native-stack";
interface CategoryLabelProps {
  id: number;
  name: string;
  ribbonColor: string;
  onCategoryLabelPress: (name: string) => void;
}

type RootStackParamList = {
  Home: undefined;
  CategoryNotes: { name: string };
  Notes: undefined;
  // Profile: { userId: string };
  // Feed: { sort: "latest" | "top" } | undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type CategoryNotesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CategoryNotes"
>;
type NotesScreenProps = NativeStackScreenProps<RootStackParamList, "Notes">;
export {
  CategoryLabelProps,
  RootStackParamList,
  HomeScreenProps,
  CategoryNotesScreenProps,
  NotesScreenProps,
};
