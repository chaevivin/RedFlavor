import React from 'react';
import './App.css';
import Intro from './pages/Intro';
import Main from './pages/Main';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Profile from './pages/Profile';
import PhotoCard from './pages/PhotoCard';
import MyRoom from './pages/MyRoom';
import PlayList from './pages/PlayList';
import ProfileDetail from './pages/ProfileDetail';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Intro /> },
      { path: 'main', element: <Main /> },
      { path: 'profile', element: <Profile /> },
      { path: 'photocard', element: <PhotoCard /> },
      { path: 'myroom', element: <MyRoom /> },
      { path: 'playlist', element: <PlayList /> },
      { path: 'profile/:profileId', element: <ProfileDetail /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
