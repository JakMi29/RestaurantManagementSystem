import classes from '../../pages/restaurant/RestaurantPage.module.css';


function Table({ table }) {
    const admin = localStorage.getItem('role') === 'ADMIN';
    const status = table.status;

    const getStatusProps = () => {
        switch (status) {
            case 'READY':
                return { label: 'Occupied    ', color: 'blue' };
            case 'BUSY':
                return { label: 'Complete', color: 'green' };
            case 'DIRTY':
                return { label: 'Clear', color: 'red' };
            default:
                return { label: 'Unknown', color: 'gray' };
        }
    };

    const { label, color } = getStatusProps();

    const handleChangeStatus = () => {

    }

    return (
        <div className={classes.table} >
            {table.name}
            <div className={classes.actions}>
                <button
                    className={classes.editButton}
                    style={{ backgroundColor: color }}
                    onClick={handleChangeStatus}
                >
                    {label}
                </button>
            </div>
        </div>
    )
}
export default Table;