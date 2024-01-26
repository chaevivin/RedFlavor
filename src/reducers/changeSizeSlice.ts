import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ChangeSizeState {
  value: number;
}

const initialState: ChangeSizeState = {
  value: 6
};

export const changeSizeSlice = createSlice({
  name: 'changeSize',
  initialState,
  reducers: {
    changeSize: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    }
  }
});

export const { changeSize } = changeSizeSlice.actions;

export default changeSizeSlice.reducer;
export const selectSizeValue = (state: RootState) => state.changeSize.value;