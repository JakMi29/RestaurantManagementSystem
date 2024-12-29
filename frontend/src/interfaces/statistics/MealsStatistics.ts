export interface MealsLoaderData{
    statistics:MealsStatisticsData
}

export interface DailyMealsStatistic {
    date: string;
    quantity: number;
    duration: string;
  }

export interface MostMealsStatistic {
    name: string;
    price: string;
    quantity: number;
  }
  
  export interface MealsStatisticsData {
    averageDailySoldMeals: number;
    totalSoldMeals: number;
    averageMealsPerOrder: number;
    averagePrepareMealTime: string;
    mostSalesMeal: MostMealsStatistic[];
    highestIncomeMeal: MostMealsStatistic[];
    dailyStatistics: DailyMealsStatistic[];
  }