import { createBrowserRouter } from 'react-router';
import Layout from './layout/Layout';
import { MainPath } from './layout/nav/enums';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ParamsPage from './pages/ParamsPage';

const routeConfig = createBrowserRouter([
  {
    path: MainPath.Root,
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'params',
        element: <ParamsPage />,
      },
    ],
  },
]);

export default routeConfig;
