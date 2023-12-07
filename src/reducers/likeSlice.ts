import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface LikeState {
  num: number;
  liked: boolean;
}

const initialState: LikeState[] = Array.from({ length: 10 }, (_, idx) => ({
  num: idx + 1,
  liked: false
}));

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    likeClicked: (state, action: PayloadAction<number>) => {
      const now = action.payload;
      const likeNum = state.find((s) => now === s.num);
      if (likeNum) {
        likeNum.liked = !likeNum.liked;
      }
    }
  }
});

export const { likeClicked } = likeSlice.actions;

export default likeSlice.reducer;
export const likeValue = (state: RootState) => state.like;
