import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface musicState {
  value: boolean;
}

const initialState: musicState = {
  value: true
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    playClicked: (state) => {
      state.value = true;
    },
    pauseClicked: (state) => {
      state.value = false;
    }
  }
});

export const { playClicked, pauseClicked } = musicSlice.actions;

export default musicSlice.reducer;
export const musicValue = (state: RootState) => state.music.value;