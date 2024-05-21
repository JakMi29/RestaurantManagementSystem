import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/HomePage';
import StatisticPage from './pages/StatisticsPage';
import MenuPage from './pages/MenuPage';
import RestaurantPage from './pages/RestaurantPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;