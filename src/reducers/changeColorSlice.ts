import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ChangeColorState {
  color: string;
  outline: string;
}

const initialState: ChangeColorState = {
  color: '#ffffff',
  outline: '#ffbfdf'
};

export const changeColorSlice = createSlice({
  name: 'changeColor',
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<ChangeColorState>) => {
      const { color, outline } = action.payload;
      state.color = color;
      state.outline = outline;
    }
  }
});

export const { changeColor } = changeColorSlice.actions;

export default changeColorSlice.reducer;
export const selectColorValue = (state: RootState) => state.changeColor;