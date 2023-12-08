import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ExampleState {
  value: boolean;
}

const initialState: ExampleState = {
  value: false
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    showExample: (state) => {
      state.value = true;
    },
    closeExample: (state) => {
      state.value = false;
    }
  }
});

export const { showExample, closeExample } = exampleSlice.actions;

export default exampleSlice.reducer;
export const selectExample = (state: RootState) => state.example.value;