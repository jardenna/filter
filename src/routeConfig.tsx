import { createBrowserRouter } from 'react-router';
import Layout from './layout/Layout';
import { MainPath } from './layout/nav/enums';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

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
    ],
  },
]);

export default routeConfig;
