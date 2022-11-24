import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryNotesDetails } from "../constants/types";
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
  },
});

export const { addNotesToList, updateNotes } = categoryNotesSlice.actions;

export default categoryNotesSlice.reducer;
