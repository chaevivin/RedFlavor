import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface nowState {
  value: number;
}

const initialState: nowState = {
  value: 1
};

export const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {
    prevClicked: (state) => {
      state.value > 1 ? state.value -= 1 : state.value = 5;
    },
    nextClicked: (state) => {
      state.value < 5 ? state.value += 1 : state.value = 1;
    }
  }
});

export const { prevClicked, nextClicked } = nowPlayingSlice.actions;

export default nowPlayingSlice.reducer;
export const nowValue = (state: RootState) => state.nowPlaying.value;