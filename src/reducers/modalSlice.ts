import { createSlice } from '@reduxjs/toolkit'

export interface modalState {
  value: boolean;
}

const initialState: modalState = {
  value: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.value = true;
    },
    closeModal: (state) => {
      state.value = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;