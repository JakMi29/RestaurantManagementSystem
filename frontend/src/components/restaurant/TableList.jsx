import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import uiClasses from '../ui/Ui.module.css';
import Table from './Table';
import { tableActions } from '../../store/TableSlice'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { orderActions } from '../../store/OrderSlice';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DialogComponent from '../dialogs/DialogComponent';

function TableList() {
  const dispatch = useDispatch();
  const loadedTables = useLoaderData();
  const [loading, setLoading] = useState(true)
  const [stompClient, setStompClient] = useState(null);
  const tables = useSelector((state) => state.table.tables);
  const orders = useSelector((state) => state.order.orders);
  const [preprocessedTables, setPreprocessedTables] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const page = useSelector((state) => state.table.pageNumber);
  const [searchTerm, setSearchTerm] = useState(queryParams.get('searchTerm') || '');
  const navigate = useNavigate()
  const [openForm, setOpenForm] = useState(false);
  const [mode, setMode] = useState();
  const [table, setTable] = useState();
  const handleCloseDialog = () => {
    setOpenForm(false)
    setTable(undefined)
  }

  const handleUpdateTable = (table) => {
    setOpenForm(true)
    setMode("update")
    setTable(table)
  }
  const handleCreateTable = () => {
    setOpenForm(true)
    setMode("create")
  }

  const handleNextPage = () => {
    const newPage = page + 1;
    dispatch(tableActions.increasePageNumber(newPage));
    navigate(`/restaurant/tables?&pageNumber=${newPage}&pageSize=${10}${searchTerm ? `&searchTerm=${searchTerm}` : ""}`);
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      const newPage = page - 1;
      dispatch(tableActions.decreasePageNumber(newPage));
      navigate(`/restaurant/tables?&pageNumber=${newPage}&pageSize=${10}${searchTerm ? `&searchTerm=${searchTerm}` : ""}`);
    }
  }

  const handleSearchChange = (event) => {
    const search = event.target.value
    dispatch(tableActions.resetPageNumber());
    dispatch(tableActions.setSearchTerm({ searchTerm: search }));
    setSearchTerm(search);
    navigate(`/restaurant/tables?&pageNumber=${page}&pageSize=${10}${search ? `&searchTerm=${search}` : ""}`);
  };

  useEffect(() => {
    if (loadedTables) {
      dispatch(
        tableActions.getTables({
          tables: loadedTables.tables,
        })
      );
      setLoading(false)
    }
  }, [dispatch, loadedTables]);

  useEffect(() => {
    if (!stompClient) {
      const getAuthToken = () => localStorage.getItem('token');
      const socket = new SockJS('http://localhost:8080/ws');
      const newStompClient = Stomp.over(socket);

      newStompClient.connect(
        { Authorization: `Bearer ${getAuthToken()}` },
        (frame) => {
          console.log('Connected: ' + frame);

          newStompClient.subscribe('/topic/tables', (table) => {
            if (table && table.body) {
              const updatedTable = JSON.parse(table.body);
              dispatch(tableActions.updateTable({ table: updatedTable }));
            }
          });

          newStompClient.subscribe('/topic/orders', (order) => {
            if (order && order.body) {
              const updatedOrder = JSON.parse(order.body);
              console.log(updatedOrder)
              dispatch(tableActions.updateOrder({ order: updatedOrder }));
            }
          });

          newStompClient.subscribe('/topic/table', () => {

          }
          );

          setStompClient(newStompClient);
        },
        (error) => {
          console.error('STOMP error: ', error);
        }
      );

      return () => {
        if (newStompClient && newStompClient.connected) {
          newStompClient.disconnect();
        }
      };
    }
  }, [dispatch, stompClient]);
  console.log(preprocessedTables)
  const getOrder = useCallback((table) => {
    if (table.order) {
      if (table.order.edit) {
        const order = orders.find(order => order.number === table.order.number);
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
    const updatedTables = tables.map((table) => {
      const order = getOrder(table);
      return { ...table, order };
    });
    setPreprocessedTables(updatedTables);
  }, [tables, getOrder]);

  return (
    <div className={classes.restaurantPage}>
      <DialogComponent open={openForm} onClose={handleCloseDialog} mode={mode} name={"table"} object={table} />
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <button className={uiClasses.blueButton} onClick={handleCreateTable}>
          New
        </button>
        <form style={{ marginLeft: "auto" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for tables..."
            className={classes.searchInput}
          />
        </form>
      </div>
      {!loading && (
        <>
          <div className={classes.tablesContainer}>
            {preprocessedTables.map((table) => (
              <Table key={table.name} table={table} order={table.order} updateTable={() => handleUpdateTable(table.name)} />
            ))}
          </div>
          <div>
            {!loadedTables.tables.first && <button
              className={classes.blueButton}
              style={{ position: "absolute", left: "80px", bottom: "30px" }}
              onClick={handlePreviousPage}
            >
              Previous
            </button>}
            {!loadedTables.tables.last && <button
              className={classes.blueButton}
              style={{ position: "absolute", right: "80px", bottom: "30px" }}
              onClick={handleNextPage}
            >
              Next
            </button>}
          </div>
        </>
      )}
    </div>
  );
}

export default TableList;