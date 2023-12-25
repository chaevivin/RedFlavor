import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ChangeEraserState {
  value: number;
}

const initialState: ChangeEraserState = {
  value: 10
};

export const changeEraserSlice = createSlice({
  name: 'changeEraser',
  initialState,
  reducers: {
    changeEraser: (state, action: PayloadAction<number>) => {
      const eraserSize = action.payload;
      state.value = eraserSize;
    }
  }
});

export const { changeEraser } = changeEraserSlice.actions;

export default changeEraserSlice.reducer;
export const selectEraserValue = (state: RootState) => state.changeEraser.value;