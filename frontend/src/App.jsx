import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
// import router from './pages/router';
import Template from './pages/template';
import HomePage from './pages/home';
import ColorsPage from './pages/colors';
import GameOfLifePage from './pages/gameOfLife';
import TimeDatePage from './pages/timeDate';
import ImagesPage from './pages/images';
import CustomPage from './pages/custom';
import FilesPage from './pages/files';
import ConfigurationPage from './pages/configuration';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "colors",
        element: <ColorsPage />
      },
      {
        path: "game-of-life",
        element: <GameOfLifePage />
      },
      {
        path: "time-date",
        element: <TimeDatePage />
      },
      {
        path: "images",
        element: <ImagesPage />
      },
      {
        path: "custom",
        element: <CustomPage />
      },
      {
        path: "files",
        element: <FilesPage />
      },
      {
        path: "configuration",
        element: <ConfigurationPage />
      }
    ]
  },

])



const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
