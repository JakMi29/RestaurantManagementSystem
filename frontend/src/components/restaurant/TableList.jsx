import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import Table from './Table';
import { fetchData } from '../../store/tables-action'
import { tableActions } from '../../store/table-slice'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { orderActions } from '../../store/order-slice';

function TableList() {
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);
  const tables = useSelector((state) => state.table.tables);
  const orders = useSelector((state) => state.order.orders);
  const [preprocessedTables, setPreprocessedTables] = useState([]);
  console.log(tables)
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
          newStompClient.disconnect();
        }
      };
    }
  }, [dispatch, stompClient]);
  
  const getOrder = useCallback((table) => {
    if (table.order) {
      if (table.order.edit) {
        const order = orders.find(order => order.number === table.order.number);
        if (!order) {
          dispatch(orderActions.editOrder({ order: table.order}));
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
    <div className={classes.tablesContainer}>
      {preprocessedTables.map((table) => (
        <Table key={table.name} table={table} order={table.order} />
      ))}
    </div>
  );
}

export default TableList;