import classes from './RestaurantPage.module.css';
import uiClasses from '../../components/ux/Ui.module.css';
import DialogComponent from '../../components/ux/dialogs/DialogComponent';
import { CircularProgress, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Mode } from '../../constants/Mode';
import { TableInterface, TableResponse } from '../../interfaces/Table';
import { DialogMode } from '../../constants/DialogMode';
import { useDispatch, useSelector } from 'react-redux';
import { tableActions } from '../../store/TableSlice';
import { RootState } from '../../store/indext';
import Grid from '@mui/material/Grid2';
import Table from './Table';
import { getAuthToken } from '../../services/AuthService';
import SockJS from 'sockjs-client';
import { OrderInterface } from '../../interfaces/Order';
import Stomp, { Client, Frame, Message } from 'stompjs';
import { orderActions } from '../../store/OrderSlice';
import Role from '../../constants/Role';
import { getRole } from '../../services/LocalStorage';
import { getTables } from '../../api/TableApi';

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const RestaurantView = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const queryParams = new URLSearchParams(location.search);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState(queryParams.get('searchTerm') || '');
    const [tableResponse, setTableResponse] = useState<TableResponse>();
    const [table, setTable] = useState<TableInterface | undefined>();
    const [tableWithOrders, setTablesWithOrders] = useState<TableInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const tables = useSelector((state: RootState) => state.table.tables);
    const orders = useSelector((state: RootState) => state.order.orders);
    const [mode, setMode] = useState<Mode | undefined>();
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const role = getRole();

    const getOrder = useCallback((table: TableInterface) => {
        if (table.order) {
            if (table.order.edit) {
                const order = orders.find(order => order.number === table?.order?.number);
                if (!order) {
                    dispatch(orderActions.editOrder({ order: table.order }));
                    return table.order;
                } else {
                    return order;
                }
            } else {
                return table.order;
            }
        }
        return undefined;
    }, [orders, dispatch]);

    useEffect(() => {
        const updatedTables: TableInterface[] = tables.map((table) => {
            const order = getOrder(table);
            return { ...table, order };
        });
        setTablesWithOrders(updatedTables);
    }, [orders, tables])

    useEffect(() => {
        if (!stompClient) {
            const socket = new SockJS(`${apiUrl}/ws`);
            const newStompClient = Stomp.over(socket);
            newStompClient.connect(
                { Authorization: `Bearer ${getAuthToken()}` },
                (frame: Frame | undefined) => {
                    if (!frame) {
                        console.error('Connection failed');
                        return;
                    }
                    newStompClient.subscribe('/topic/tables', (message: Message) => {
                        if (message && message.body) {
                            const updatedTable = JSON.parse(message.body);
                            dispatch(tableActions.updateTable({ table: updatedTable }));
                        }
                    });
                    newStompClient.subscribe('/topic/orders', (order: Message) => {
                        if (order && order.body) {
                            const updatedOrder: OrderInterface = JSON.parse(order.body);
                            dispatch(tableActions.updateOrder({ order: updatedOrder }));
                        }
                    });
                    setStompClient(newStompClient);
                },
                (error) => {
                    console.error('STOMP error: ', error);
                }
            );
            return () => {
                if (newStompClient && newStompClient.connected) {
                    newStompClient.disconnect(() => { });
                }
            };
        }
    }, [dispatch, stompClient]);

    useEffect(() => {
        setLoading(true)
        const fetchTableData = async () => {
            const response: TableResponse = await getTables(
                pageNumber,
                '10',
                searchTerm === '' ? undefined : searchTerm
            );
            dispatch(
                tableActions.getTables({
                    tables: response.content,
                })
            );
        };
        setLoading(false)
        fetchTableData();
    }, [searchTerm, pageNumber]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        setSearchTerm(search);
    };

    const handleOpenDialog = () => {
        setOpenForm(true);
        setMode(Mode.CREATE);
    };

    const handleNextPage = () => {
        if (pageNumber < (tableResponse?.totalPages ?? 0)) {
            const page = pageNumber + 1;
            setPageNumber(page);
        }
    };

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            const page = pageNumber - 1;
            setPageNumber(page);
        }
    };

    const handleEditTable = (table: TableInterface) => {
        setTable(table);
        setMode(Mode.EDIT);
        setOpenForm(true);
    };

    const handleCloseDialog = () => {
        setOpenForm(false);
        setTable(undefined);
    };

    return (
        <div className={classes.page}>
            <DialogComponent open={openForm} onClose={handleCloseDialog} type={DialogMode.TABLE} mode={mode ?? Mode.READ} object={table} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {role === Role.ADMIN && <button className={uiClasses.blueButton} onClick={handleOpenDialog}>
                    New
                </button>}
                <form>
                    <TextField
                        type="text"
                        label="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </form>
            </div>
            {loading ? <CircularProgress /> :
                <>
                    <Grid container sx={{ width: "100%", height: "100%" }}>
                        {tableWithOrders.map((table: TableInterface) => (
                            <Grid size={2.4} key={table.name}>
                                <Table table={table} order={table.order} updateTable={handleEditTable} />
                            </Grid>
                        ))}
                    </Grid>
                    <div className={classes.paginationContainer}>
                        {!tableResponse?.first && <button
                            className={uiClasses.blueButton}
                            onClick={handlePreviousPage}
                        >
                            Previous
                        </button>}
                        {!tableResponse?.last && <button style={{ marginLeft: "auto" }}
                            className={uiClasses.blueButton}
                            onClick={handleNextPage}
                        >
                            Next
                        </button>}
                    </div>
                </>}
        </div>
    )
}

export default RestaurantView