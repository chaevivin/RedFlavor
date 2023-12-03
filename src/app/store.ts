import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../reducers/modalSlice';
import heartReducer from '../reducers/heartSlice';
import memberReducer from '../reducers/memberSlice';
import nowPlayingReducer from '../reducers/nowPlayingSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    heart: heartReducer,
    member: memberReducer,
    nowPlaying: nowPlayingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch