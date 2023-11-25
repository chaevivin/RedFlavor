import React from 'react';
import './App.css';
import Intro from './pages/Intro';
import Main from './pages/Main';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Intro /> },
      { path: 'main', element: <Main /> },
      { path: 'profile', element: <Profile /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
