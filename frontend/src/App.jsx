import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/HomePage';
import StatisticPage from './pages/StatisticsPage';
import MenuPage from './pages/MenuPage';
import RestaurantPage from './pages/RestaurantPage';
import AuthenticationPage, {
  action as authAction,
} from './pages/AuthenticationPage';
import { tokenLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'statistics',
        element: <StatisticPage />,
      },
      {
        path: 'menu',
        element: <MenuPage />,
      },
      {
        path: 'restaurant',
        element: <RestaurantPage />,
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;