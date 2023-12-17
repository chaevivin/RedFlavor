import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface PanelState {
  value: boolean;
}

const initialState: PanelState = {
  value: false
};

export const panelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    openPanel: (state) => {
      state.value = true;
    },
    closePanel: (state) => {
      state.value = false;
    }
  }
});

export const { openPanel, closePanel } = panelSlice.actions;

export default panelSlice.reducer;
export const selectPanel = (state: RootState) => state.panel.value;