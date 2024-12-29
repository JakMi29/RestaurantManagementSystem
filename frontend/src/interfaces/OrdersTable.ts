export interface Order {
    number: string;
    waiterEmail: string;
    tableName: string;
    price: number;
    customerQuantity: number;
    meals: number;
    completedDateTime: string;
    receivedDateTime: string;
    duration: number;
}

export interface OrderResponse {
    content: Order[];
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