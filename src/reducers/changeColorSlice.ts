import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ChangeColorState {
  value: string;
}

const initialState: ChangeColorState = {
  value: 'red'
};

export const changeColorSlice = createSlice({
  name: 'changeColor',
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      state.value = color;
    }
  }
});

export const { changeColor } = changeColorSlice.actions;

export default changeColorSlice.reducer;
export const selectColorValue = (state: RootState) => state.changeColor.value;