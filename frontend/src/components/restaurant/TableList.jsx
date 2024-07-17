import classes from '../../pages/restaurant/RestaurantPage.module.css';
import Table from './Table';

function TableList({ tables }) {
  
  return (
    <div className={classes.tablesContainer}>
      {tables.map((table) => (
        <Table key={table.name} table={table}/>
      ))}
    </div>
  );
}

export default TableList;