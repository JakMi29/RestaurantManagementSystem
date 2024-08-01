import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import { useContext } from 'react';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import Order from './Order';

function Table({ table }) {
    const admin = localStorage.getItem('role') === 'ADMIN';
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const status = table.status;
    let content;
    console.log(table)
    const handleChangeStatus = () => {
        fetch(`http://localhost:8080/api/admin/tables?tableName=${table.name}&restaurantName=${"Italiano"}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    navigate('/restaurant');
                } else {
                    messageCtx.showMessage('Something went wrong', 'error');
                }
            })
            .catch(error => {
                console.error('An error occurred while sending the request:', error);
            });
    };

    switch (status) {
        case 'READY':
            content = (
                <div className={classes.contentContainer}>
                    <div className={classes.iconContainer}>
                        <TableRestaurantIcon sx={{ fontSize: 150, color: 'rgba(60, 60, 211, 0.2)' }} />
                    </div>
                    <div className={classes.actions}>
                        <button onClick={handleChangeStatus} className={classes.blueButton}>
                            Ocuppy
                        </button>
                    </div>
                </div>
            )
            break;
        case 'BUSY':
            content = (
                <div className={classes.contentContainer}>
                    {table.order ? <Order order={table.order} /> : <>
                        :<div className={classes.iconContainer}>
                            <GroupsIcon sx={{ fontSize: 150, color: 'rgba(60, 60, 211, 0.2)' }} />
                        </div>
                        <div className={classes.actions}>
                            <button
                                onClick={handleChangeStatus}
                                className={classes.greenButton}
                            >
                                Order
                            </button>
                        </div>
                    </>
                    }
                </div>
            )
            break;
        case 'DIRTY':
            content = (
                <div className={classes.contentContainer}>
                    <div className={classes.iconContainer}>
                        <CleanHandsIcon sx={{ fontSize: 150, color: 'rgba(255, 224, 99, 0.5)' }} />
                    </div>
                    <div className={classes.actions}>
                        <button onClick={handleChangeStatus} className={classes.yellowButton}>
                            Clear
                        </button>
                    </div>
                </div>
            )
            break;
    }


    return (
        <div className={classes.table}>
            <div className={classes.header}>
                {table.name}
            </div>
            {content}

        </div>
    );
}
{/* <div className={classes.contentContainer}>
<div>Number of People: {4}</div>
<div className={classes.mealList}>
    { }
    {/* {table.meals.map(meal => (
    <div key={meal.id} className={classes.mealItem}>
        <span>{meal.name}</span>
        <button>Served</button>
    </div>
))}
</div>
<div>Total Price: ${table.totalPrice}</div>
<div className={classes.actions}>
    <button onClick={handleChangeStatus} className={className}>
        {label}
    </button>
    {status === 'BUSY' && <button className={classes.editButton}>Edit</button>}
</div>
</div> */}

export default Table;