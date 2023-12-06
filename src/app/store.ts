import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../reducers/modalSlice';
import heartReducer from '../reducers/heartSlice';
import memberReducer from '../reducers/memberSlice';
import nowPlayingReducer from '../reducers/nowPlayingSlice';
import likeReducer from '../reducers/likeSlice';
import musicReducer from '../reducers/musicSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    heart: heartReducer,
    member: memberReducer,
    nowPlaying: nowPlayingReducer,
    like: likeReducer,
    music: musicReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch