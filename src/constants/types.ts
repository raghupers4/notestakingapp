import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Category = {
  id: number;
  name: string;
  ribbonColor: string;
};

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
type CategoryLabelProps = {
  category: Category;
  onCategoryLabelPress: (category: Category) => void;
};

type footerBtns = {
  positiveBtn: {
    text: string;
    handler: () => void;
  };
  negativeBtn?: {
    text: string;
    handler: () => void;
  };
};

type ModalDialogProps = {
  modalVisible: boolean;
  animationType?: "none" | "slide" | "fade" | undefined;
  children: React.ReactNode;
  footerBtns: footerBtns;
};

type MoveToCategoryProps = {
  currentCategoryId: number;
  onCategorySelectedHandler: (category: Category) => void;
};

type RootStackParamList = {
  Home: undefined;
  CategoryNotes: Category;
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
  Category,
  CategoryNotesDetails,
  CategoryLabelProps,
  RootStackParamList,
  HomeScreenProps,
  CategoryNotesScreenProps,
  NotesScreenProps,
  ModalDialogProps,
  MoveToCategoryProps,
  footerBtns,
};
