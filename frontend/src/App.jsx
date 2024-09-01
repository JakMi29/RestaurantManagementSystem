import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/HomePage';
import StatisticPage from './pages/statistics/StatisticsPage';
import RestaurantPage, { loader as tableLoader } from './pages/restaurant/RestaurantPage';
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
import OrdersStatisticsPage, { loader as orderStatisticLoader } from './pages/statistics/Orders/OrdersStatisticPage';
import { MessageContextProvider } from './store/MessageContext';
import OrderMealsPage from './pages/restaurant/OrderMealsPage';
import TableList from './components/restaurant/TableList';
import MealsStatisticsPage, { loader as mealsStatisticLoader } from './pages/statistics/Meals/MealsStatisticPage';
import OrderDetailsPage, { loader as orderDetailsLoader } from './pages/statistics/Orders/OrderDetailsPage';
import PeriodStatisticPage from './pages/statistics/PeriodStatisticsPage';


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
        children: [
          {
            path: '',
            element: <PeriodStatisticPage />,
            children: [
              {
                path: "orders",
                element: <OrdersStatisticsPage />,
                loader: orderStatisticLoader,
              },
              {
                path: "meals",
                element: <MealsStatisticsPage />,
                loader: mealsStatisticLoader,
              },
            ]
          },
          {
            path: "order",
            element: <OrderDetailsPage />,
            loader: orderDetailsLoader,
          }
        ]
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
            action: mealAction,
          },
          {
            path: 'details',
            element: <MealPage />,
            loader: mealAction,
          },
        ],
      },
      {
        path: 'restaurant',
        element: <RestaurantPage />,
        children: [
          {
            path: "orderMeals",
            element: <OrderMealsPage />
          },
          {
            path: "tables",
            element: <TableList />,
            loader: tableLoader,
          },
        ]
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
  return (
    <MessageContextProvider>
      <RouterProvider router={router} />
    </MessageContextProvider>
  );
}
export default App;