import { MealInterface } from "./Meal";
import { WaiterInterface } from "./Waiter";

export interface OrderInterface {
    number: string;
    status: string;
    waiter: WaiterInterface;
    tableName: string;
    completedDateTime: string;
    receivedDateTime: string;
    durationTime: string;
    edit: boolean;
    editor: WaiterInterface | null;
    price: number;
    customerQuantity: number;
    meals: OrderMealInterface[];
}
export interface OrderMealInterface {
    meal: MealInterface;
    price: number | null;
    quantity: number;
    status: OrderMealStatus;
}

export enum OrderMealStatus {
    NEW='NEW',
    PREPARING='PREPARING',
    RELEASED='RELEASED',
    READY='READY'
 }