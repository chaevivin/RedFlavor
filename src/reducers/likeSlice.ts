import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface likeState {
  num: number;
  liked: boolean;
}

const initialState: likeState[] = [
  {num: 1, liked: false},
  {num: 2, liked: false},
  {num: 3, liked: false},
  {num: 4, liked: false},
  {num: 5, liked: false},
];

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    likeClicked: (state, action) => {
      const now = action.payload;
      state.forEach((s) => {
        if (now === s.num) s.liked = !(s.liked);
      });
    }
  }
});

export const { likeClicked } = likeSlice.actions;

export default likeSlice.reducer;
export const likeValue = (state: RootState) => state.like;