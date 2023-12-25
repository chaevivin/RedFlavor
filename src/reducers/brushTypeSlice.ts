import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface BrushTypeState {
  value: string;
}

const initialState: BrushTypeState = {
  value: 'brush'
};

export const brushTypeSlice = createSlice({
  name: 'brushType',
  initialState,
  reducers: {
    brushType: (state, action: PayloadAction<string>) => {
      const brushType = action.payload;
      state.value = brushType;
    }
  }
});

export const { brushType } = brushTypeSlice.actions;

export default brushTypeSlice.reducer;
export const selectBrushTypeValue = (state: RootState) => state.brushType.value;