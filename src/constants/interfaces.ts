import type { NativeStackScreenProps } from "@react-navigation/native-stack";
interface CategoryLabelProps {
  id: number;
  name: string;
  ribbonColor: string;
  onCategoryLabelPress: (name: string) => void;
}

type RootStackParamList = {
  Home: undefined;
  CategoryNotes: undefined;
  // Profile: { userId: string };
  // Feed: { sort: "latest" | "top" } | undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export { CategoryLabelProps, RootStackParamList, HomeScreenProps };
