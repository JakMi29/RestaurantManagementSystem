import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/HomePage';
import StatisticPage from './pages/StatisticsPage';
import RestaurantPage from './pages/RestaurantPage';
import AuthenticationPage, {
  action as authAction,
} from './pages/AuthenticationPage';
import { tokenLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';
import { action as mealAction } from './components/meals/MealForm';
import ErrorPage from './pages/ErrorPage';
import MealPage from './pages/meals/MealPage';
import MealsRootLayout from './pages/meals/MealRootLayout';
import MealsPage, { loader as mealsLoader } from './pages/meals/MealsPage';
import { loader as mealLoader } from './pages/meals/EditMealPage';
import EditMealPage from './pages/meals/EditMealPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'statistics',
        element: <StatisticPage />,
      },
      {
        path: 'meals',
        id: 'meals',
        element: <MealsRootLayout />,
        children: [
          {
            index: true,
            element: <MealsPage />,
            loader: mealsLoader,
          },
          {
            path: 'new',
            element: <MealPage />,
            action: mealAction,
          },
          {
            path: 'details',
            element: <MealPage />,
            loader: mealAction,
          },
          {
            path: 'edit',
            element: <EditMealPage />,
            loader: mealLoader,
            action: mealAction,
          },
        ],
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