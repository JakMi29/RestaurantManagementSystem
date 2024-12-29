import { OrderInterface } from "./Order";
export interface TableResponse {
    content: TableInterface[];
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

export interface TableInterface {
    name: string;
    order?: OrderInterface;
    status:TableStatus;
    new?:boolean;
    edit?:boolean;
}

export enum TableStatus {
    BUSY = "BUSY",
    DIRTY = "DIRTY",
    READY = "READY"
}