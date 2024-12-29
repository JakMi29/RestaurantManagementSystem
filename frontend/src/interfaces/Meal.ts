export interface MealInterface {
    name: string;
    category: string;
    price: number;
    description: string;
    status: string;
    image: string;
    mealOfTheDay: boolean;
}
export interface MealsLoaderData{
    meals:MealsResponse;
}

export interface MealsResponse {
    content: MealInterface[];
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