import { WaiterInterface } from "../Waiter";

export interface WaitersLoaderData{
    statistics:WaitersStatisticsResponse
}

export interface WaiterStatistics {
    date: string;
    totalCustomers: number;
    totalOrders: number;
  }
  
  export interface WaitersStatisticsData {
    waiter:WaiterInterface;
    totalCustomers:number;
    totalOrders:number;
    totalMeals:number;
    totalIncome:string;
  }

  export interface WaitersStatisticsResponse {
    content: WaitersStatisticsData[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        unpaged: boolean;
        paged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}