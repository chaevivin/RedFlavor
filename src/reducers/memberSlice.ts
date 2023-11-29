import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface memberState {
  value: string;
}

const initialState: memberState = {
  value: 'joy'
};

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    memberUpdated(state, action) {
      state.value = action.payload;
    }
  }
});

export const { memberUpdated } = memberSlice.actions;

export default memberSlice.reducer;
export const memberValue = (state: RootState) => state.member.value;
