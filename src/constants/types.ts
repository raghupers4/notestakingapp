import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type CategoryNotesDetails = {
  id: string;
  categoryId: number;
  isPinned: boolean;
  contents: {
    title: string;
    notes: string;
  };
  notesImageUri: string;
};
type NotesCategory = {
  id: number;
  name: string;
  ribbonColor: string;
};
type CategoryLabelProps = {
  category: NotesCategory;
  onCategoryLabelPress: (category: NotesCategory) => void;
};

type RootStackParamList = {
  Home: undefined;
  CategoryNotes: NotesCategory;
  Notes: { categoryId: number; notesDetails: CategoryNotesDetails };
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
  CategoryNotesDetails,
  NotesCategory,
  CategoryLabelProps,
  RootStackParamList,
  HomeScreenProps,
  CategoryNotesScreenProps,
  NotesScreenProps,
};
