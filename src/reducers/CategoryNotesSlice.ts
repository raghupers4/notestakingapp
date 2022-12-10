import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryNotesDetails } from "../constants/types";
type CategoryNotesState = {
  notes: CategoryNotesDetails[];
};
const initialState: CategoryNotesState = { notes: [] };

//reducer for handling CategoryNotesScreen operations
const categoryNotesSlice = createSlice({
  name: "categoryNotes",
  initialState,
  reducers: {
    addNotesToList: (state, action: PayloadAction<CategoryNotesDetails>) => {
      state.notes.push(action.payload);
    },
    updateNotes: (state, action: PayloadAction<CategoryNotesDetails>) => {
      const notes = state.notes.find((n) => n.id === action.payload.id);
      if (notes) {
        notes.isPinned = action.payload.isPinned;
        notes.contents.notes = action.payload.contents.notes;
        notes.contents.title = action.payload.contents.title;
        notes.notesImageUri = action.payload.notesImageUri;
      }
    },
    deleteNotes: (state, action: PayloadAction<string[]>) => {
      // action.payload will have selected notes ids (Array of strings)
      state.notes = state.notes.filter(
        (notes) =>
          notes.id !==
          action.payload.find((selectedNotesId) => selectedNotesId === notes.id)
      );
    },
    // when notes is moved to another category
    moveToAnotherCategory: (
      state,
      action: PayloadAction<{
        selectedNotesIds: string[];
        selectedCategory: Category;
      }>
    ) => {
      if (action.payload.selectedNotesIds.length > 0) {
        const { selectedNotesIds, selectedCategory } = action.payload;
        const selectedNotes = state.notes.filter(
          (notes) => notes.id === selectedNotesIds.find((n) => n === notes.id)
        );
        if (selectedNotes.length > 0) {
          selectedNotes.forEach(
            (notes) => (notes.categoryId = selectedCategory.id)
          );
        }
      }
    },
  },
});

export const {
  addNotesToList,
  updateNotes,
  deleteNotes,
  moveToAnotherCategory,
} = categoryNotesSlice.actions;

export default categoryNotesSlice.reducer;
