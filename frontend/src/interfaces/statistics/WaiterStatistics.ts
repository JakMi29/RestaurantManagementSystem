import { WaiterInterface } from "../Waiter";
import { OrdersStatisticsData } from "./OrdersStatistics";
import { MealsStatisticsData } from './MealsStatistics';

export interface WaiterLoaderData{
    statistics:WaiterStatisticsResponse
}

export interface WaiterStatistics {
    date: string;
    totalCustomers: number;
    totalOrders: number;
  }
  export interface WaiterStatisticsResponse {
    waiter: WaiterInterface;
    orderStatistic: OrdersStatisticsData
    mealsStatistic: MealsStatisticsData
}