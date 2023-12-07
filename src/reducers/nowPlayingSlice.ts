import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface NowState {
  value: number;
}

const initialState: NowState = {
  value: 1
};

export const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {
    prevClicked: (state) => {
      state.value = (state.value > 1) ? state.value - 1 : 10;
    },
    nextClicked: (state) => {
      state.value = (state.value < 10) ? state.value + 1 : 1;
    }
  }
});

export const { prevClicked, nextClicked } = nowPlayingSlice.actions;

export default nowPlayingSlice.reducer;
export const nowValue = (state: RootState) => state.nowPlaying.value;