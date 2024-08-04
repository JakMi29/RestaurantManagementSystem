import { Await, defer, json, useLoaderData, } from "react-router-dom";
import classes from '../restaurant/RestaurantPage.module.css';
import { getAuthToken } from "../../util/auth";
import { Suspense, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import TableList from "../../components/restaurant/TableList";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Provider } from "react-redux";
import store from "../../store";

function RestaurantPage() {
    const { tables } = useLoaderData();
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const getAuthToken = () => {
            return localStorage.getItem('token');
        };

        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect(
            { Authorization: `Bearer ${getAuthToken()}` },
            (frame) => {
                console.log('Connected: ' + frame);

                stompClient.subscribe('/topic/tables', (table) => {
                    if (table) {
                        console.log(table.body);
                    }
                });

                setStompClient(stompClient);
            },
            (error) => {
                console.error('STOMP error: ', error);
            }
        );

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <Provider store={store}>
            <TableList />
        </Provider>
        // <div className={classes.restaurantPage}>
        //         <Suspense fallback={<p style={{ textAlign: 'center' }}><CircularProgress /></p>}>
        //             <Await resolve={tables}>
        //                 {(loadedTables) => (
        //                         <div className={classes.tablesContainer}>
        //                             <TableList tables={loadedTables}/>
        //                         </div>
        //                 )}
        //             </Await>
        //         </Suspense>
        // </div>
    );
}
export default RestaurantPage;

async function loadTables() {
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/api/admin/tables/orders?restaurantName=${"Italiano"}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch tables.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader() {
    return defer({
        tables: await loadTables(),
    });
}
