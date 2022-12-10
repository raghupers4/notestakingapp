import { Category, CategoryNotesDetails } from "./types";

const priorities = [
  {
    id: 1,
    type: "High",
    color: "red",
  },
  {
    id: 2,
    type: "Medium",
    color: "blue",
  },
  {
    id: 3,
    type: "Low",
    color: "yellow",
  },
];

const Categories: Category[] = [
  { id: 1, name: "Personal", ribbonColor: "#3a86ff" },
  { id: 2, name: "Work", ribbonColor: "#eb5e28" },
  { id: 3, name: "Goals", ribbonColor: "#bc4749" },
  { id: 4, name: "Ideas", ribbonColor: "#ffc300" },
];

const dummyCategory: Category = {
  id: 0,
  name: "",
  ribbonColor: "",
};

// dummy data for new notes
const newNotes: CategoryNotesDetails = {
  id: "New Notes",
  isPinned: false,
  categoryId: 1,
  contents: {
    title: "",
    notes: "",
  },
  notesImageUri: "",
};

export { priorities, Categories, dummyCategory, newNotes };
