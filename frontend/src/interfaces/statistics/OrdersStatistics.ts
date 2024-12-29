export interface OrdersLoaderData{
    statistics:OrdersStatisticsData
}

export interface DailyOrdersStatistic {
    date: string;
    totalCustomers: number;
    totalOrders: number;
  }
  
  export interface OrdersStatisticsData {
    totalIncome: number;
    averageDailyIncome: number;
    averageOrderIncome: number;
    averageOrderDuration: string;
    totalCustomers: number;
    averageCustomersPerDay: number;
    averageCustomersPerOrder: number;
    totalOrders: number;
    averageOrdersPerDay: number;
    averageMealPerOrder: number;
    dailyStatistics: DailyOrdersStatistic[];
  }