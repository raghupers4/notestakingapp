import { configureStore } from "@reduxjs/toolkit";
import CategoryNotesReducer from "./reducers/CategoryNotesSlice";

const store = configureStore({
  reducer: {
    categoryNotes: CategoryNotesReducer,
  },
});

// export the type of store so that the global state can be easily accessed in the
// components using the state
export type RootState = ReturnType<typeof store.getState>;
export default store;
