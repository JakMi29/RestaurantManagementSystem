import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import Table from './Table';
import { fetchData } from '../../store/tables-action'
import { tableActions } from '../../store/table-slice'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function TableList() {
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);
  const tables = useSelector((state) => state.table.tables);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
          if (table &&  table.body) {
            const updatedTable = JSON.parse(table.body);
            console.log(updatedTable)
            dispatch(tableActions.updateTable({ table: updatedTable }));
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
  console.log(tables)
  return (
    <div className={classes.tablesContainer}>
      {tables.map((table) => (
        <Table key={table.name} table={table} />
      ))}
    </div>
  );
}

export default TableList;