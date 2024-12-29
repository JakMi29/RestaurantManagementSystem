import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Await, defer, json, LoaderFunction, useLoaderData } from "react-router-dom";
import { OrderInterface } from "../../../interfaces/Order";
import { getOrder } from "../../../api/OrderApi";
import OrderDetails from "../components/OrderDetails";

const OrderDetailsPage = () => {
    const { order }: { order: OrderInterface } = useLoaderData() as { order: OrderInterface };
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
            <Await resolve={order}>
                {(order:OrderInterface) => <OrderDetails order={order}/>}
            </Await>
        </Suspense>
    );
}

async function loadOrderDetails(orderNumber: string): Promise<OrderInterface> {
    const response = await getOrder(orderNumber);
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch order.' },
            {
                status: 500,
            }
        );
    }
    return await response.json();
}

export const loader: LoaderFunction<OrderInterface> = async ({ request }) => {
    const url = new URL(request.url);
    const orderNumber = url.searchParams.get("number");

    if (!orderNumber) {
        throw json(
            { message: 'OrderNumber query parameter is required.' },
            { status: 400 }
        );
    }
    return defer({
        order: loadOrderDetails(orderNumber),
    });
}

export default OrderDetailsPage;


