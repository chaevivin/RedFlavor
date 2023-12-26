import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface IsEditableState {
  value: boolean;
}

const initialState: IsEditableState = {
  value: false
};

export const isEditableSlice = createSlice({
  name: 'isEditable',
  initialState,
  reducers: {
    startEdit: (state) => {
      state.value = true;
    },
    stopEdit: (state) => {
      state.value = false;
    }
  }
});

export const { startEdit, stopEdit } = isEditableSlice.actions;

export default isEditableSlice.reducer;
export const selectisEditable = (state: RootState) => state.isEditable.value;