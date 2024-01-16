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
import ErrorPage from './pages/ErrorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './pages/Loading';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Intro /> },
      { path: 'main', element: <Main /> },
      { path: 'profile', element: <Profile /> },
      { path: 'profile/:profileId', element: <ProfileDetail /> },
      { path: 'photocard', element: <PhotoCard /> },
      { path: 'myroom', element: <MyRoom /> },
      { path: 'playlist', element: <PlayList /> },
      { path: 'loading', element: <Loading /> },
      { errorElement: <ErrorPage /> },
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <section className='appBackground'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </section>
  );
}

export default App;
