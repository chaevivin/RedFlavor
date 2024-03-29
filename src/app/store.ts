import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../reducers/modalSlice';
import heartReducer from '../reducers/heartSlice';
import memberReducer from '../reducers/memberSlice';
import nowPlayingReducer from '../reducers/nowPlayingSlice';
import likeReducer from '../reducers/likeSlice';
import musicReducer from '../reducers/musicSlice';
import exampleReducer from '../reducers/exampleSlice';
import panelReducer from '../reducers/panelSlice';
import choosePanelReducer from '../reducers/choosePanelSlice';
import changeColorReducer from '../reducers/changeColorSlice';
import changeSizeReducer from '../reducers/changeSizeSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    heart: heartReducer,
    member: memberReducer,
    nowPlaying: nowPlayingReducer,
    like: likeReducer,
    music: musicReducer,
    example: exampleReducer,
    panel: panelReducer,
    choosePanel: choosePanelReducer,
    changeColor: changeColorReducer,
    changeSize: changeSizeReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch