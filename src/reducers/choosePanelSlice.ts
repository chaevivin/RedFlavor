import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ChooseState {
  value: string;
}

const initialState: ChooseState = {
  value: 'member'
};

export const choosePanelSlice = createSlice({
  name: 'choosePanel',
  initialState,
  reducers: {
    choosePanel: (state, action: PayloadAction<string>) => {
      const choice = action.payload;
      state.value = choice;
    }
  }
});

export const { choosePanel } = choosePanelSlice.actions;

export default choosePanelSlice.reducer;
export const selectPanelValue = (state: RootState) => state.choosePanel.value;