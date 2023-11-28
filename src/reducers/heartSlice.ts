import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface heartState {
  value: number;
}

const initialState: heartState = {
  value: 0
};

export const heartSlice = createSlice({
  name: 'heart',
  initialState,
  reducers: {
    heartGauge: (state) => {
      state.value < 5 ? state.value += 1 : state.value = 5;
    }
  }
});

export const { heartGauge } = heartSlice.actions;

export default heartSlice.reducer;
export const heartValue = (state: RootState) => state.heart.value;