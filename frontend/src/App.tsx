import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthenticationPage, { action as authAction } from './pages/AuthenticationPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import RootLayout from './pages/RootPage';
import { getAuthToken, action as logoutAction } from './services/AuthService'
import { action as mealAction } from './components/forms/MealFormDialog'
import MenuPage, { loader as mealsLoader } from './pages/menu/MenuPage';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material';
import { MessageContextProvider } from './store/MessageContext';
import StatisticPage from './pages/statistic/StatisticPage';
import OrdersStatisticsPage, { loader as ordersStatisticsLoader } from './pages/statistic/pages/OrdersStatisticsPage';
import MealsStatisticsPage, { loader as mealsStatisticsLoader } from './pages/statistic/pages/MealsStatisticsPage';
import WaitersStatisticsPage, { loader as waitersStatisticsLoader } from './pages/statistic/pages/WaitersStatisticsPage';
import OrderDetailsPage, { loader as orderDetailsStatisticsLoader } from './pages/statistic/pages/OrderDetailsPage';
import WaiterStatisticsPage, { loader as waiterStatisticsLoader } from './pages/statistic/pages/WaiterStatisticsPage';
import PeriodStatisticsPage from './pages/statistic/pages/PeriodStatisticsPage';
import WaitersPage, { loader as waitersLoader } from './pages/waiters/WaitersPage';
import { action as waiterAction } from './components/forms/WaiterFormDialog';
import RestaurantPage from './pages/restaurant/RestaurantPage';
import RestaurantView from './pages/restaurant/RestaurantView';
import {action as tableAction}  from './components/forms/TableFormDialog'
import EditOrderPage from './pages/restaurant/EditOrder/OrderEditPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: getAuthToken,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'statistics',
        element: <StatisticPage />,
        children: [
          {
            path: '',
            element: <PeriodStatisticsPage />,
            children: [
              {
                path: "orders",
                element: <OrdersStatisticsPage />,
                loader: ordersStatisticsLoader,
              },
              {
                path: "meals",
                element: <MealsStatisticsPage />,
                loader: mealsStatisticsLoader,
              },
              {
                path: "waiters",
                element: <WaitersStatisticsPage />,
                loader: waitersStatisticsLoader,
              }
            ]
          },
          {
            path: "waiter",
            element: <WaiterStatisticsPage />,
            loader: waiterStatisticsLoader,
          },
          {
            path: "order",
            element: <OrderDetailsPage />,
            loader: orderDetailsStatisticsLoader,
          }
        ]
      },
      {
        path: 'restaurant',
        element: <RestaurantPage />,
        children: [
          {
            path: "orderMeals",
            element: <EditOrderPage />
          },
          {
            path: "view",
            element: <RestaurantView />,
            action: tableAction,
          },
        ]
      },
      {
        path: 'meals',
        element: <MenuPage />,
        action: mealAction,
        loader: mealsLoader,
      },
      {
        path: 'waiters',
        element: <WaitersPage />,
        action: waiterAction,
        loader: waitersLoader,
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
    <ThemeProvider theme={theme}>
      <MessageContextProvider>
        <RouterProvider router={router} />
      </MessageContextProvider>
    </ThemeProvider>
  );
}
export default App;
