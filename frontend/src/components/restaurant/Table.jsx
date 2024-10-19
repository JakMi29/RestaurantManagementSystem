import { useNavigate } from 'react-router-dom';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import MessageContext from '../../store/MessageContext';
import React, { useContext, useState } from 'react';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import Order from './Order';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../store/OrderSlice';
import { getAuthToken } from '../../util/auth';
import EditIcon from '@mui/icons-material/Edit';
import DialogComponent from '../dialogs/DialogComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { getRestaurantName } from '../../util/data';
import { Paper } from '@mui/material';

const Table = React.memo(({ table, order, updateTable }) => {
    const admin = localStorage.getItem('role') === 'ADMIN';
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const status = table.status;
    const dispatch = useDispatch();

    const handleChangeStatus = (reverse) => {
        fetch(`http://localhost:8080/api/restaurantManagementSystem/table/waiter?tableName=${table.name}&restaurantName=${"Italiano"}&reverse=${reverse}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthToken()
            },
        })
            .then(response => {
                if (!response.ok) {
                    messageCtx.showMessage('Something went wrong', 'error');
                }
            })
            .catch(error => {
                console.error('An error occurred while sending the request:', error);
            });
    };

    const handleDelete = () => {
        fetch(`http://localhost:8080/api/restaurantManagementSystem/table/admin?tableName=${table.name}&restaurantName=${getRestaurantName()}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getAuthToken()
            },
        })
            .then(response => {
                if (!response.ok) {
                    messageCtx.showMessage('Something went wrong', 'error');
                } else {
                    navigate(0)
                }
            })
            .catch(error => {
                console.error('An error occurred while sending the request:', error);
            });
    };

    const handleOrderDatails = () => {
        navigate(`/statistics/order?number=${order.number}`)
    };

    const handleTableDatails = () => {
        navigate(`statistics/order?number=${order.number}`)
    };

    const craeteOrder = () => {
        const restaurantName = localStorage.getItem('restaurantName');
        const email = localStorage.getItem('email');
        const token = getAuthToken();
        fetch(`http://localhost:8080/api/restaurantManagementSystem/order/waiter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                tableName: table.name,
                restaurantName: restaurantName,
                waiterEmail: email
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    messageCtx.showMessage('Something went wrong', 'error');
                }
            })
            .then(data => {
                dispatch(orderActions.editOrder({ order: data }));
            })
            .catch(error => {
                console.error('An error occurred while sending the request:', error);
            });
    };
    const renderContent = () => {
        if (order && admin) {
            return (
                <div className={classes.contentContainer}>
                    {order ? <Order key={order.number} order={order} admin={true} /> :
                        <div className={classes.iconContainer}>
                            <GroupsIcon sx={{ fontSize: 150, color: 'rgba(60, 60, 211, 0.2)' }} />
                        </div>
                    }
                    <div className={classes.actions}>
                        <button
                            onClick={handleOrderDatails}
                            className={classes.greenButton}
                        >
                            Order details
                        </button>
                        <button onClick={handleTableDatails} className={classes.blueButton}>
                            Table details
                        </button>
                    </div>
                </div>
            )
        }
        switch (status) {
            case 'READY':
                return (
                    <div className={classes.contentContainer}>
                        <div className={classes.iconContainer}>
                            <TableRestaurantIcon sx={{ fontSize: 150, color: 'rgba(60, 60, 211, 0.2)' }} />
                        </div>
                        <div className={classes.actions}>
                            {admin ?
                                <button onClick={handleOrderDatails} className={classes.blueButton}>
                                    Statistics
                                </button> :
                                <button onClick={()=>handleChangeStatus(false)} className={classes.blueButton}>
                                    Ocuppy
                                </button>
                            }
                        </div>
                    </div>
                )
            case 'BUSY':
                return (
                    <div className={classes.contentContainer}>
                        {order ? <Order key={order.number} order={order} admin={false} /> : <>
                            <div className={classes.iconContainer}>
                                <GroupsIcon sx={{ fontSize: 150, color: 'rgba(60, 60, 211, 0.2)' }} />
                            </div>
                            <div className={classes.actions}>
                                {admin ?
                                    <button onClick={handleOrderDatails} className={classes.blueButton}>
                                        Table details
                                    </button> :
                                    <>
                                        <button
                                            onClick={craeteOrder}
                                            className={classes.greenButton}
                                        >
                                            Order
                                        </button>
                                        <button
                                            onClick={()=>handleChangeStatus(true)}
                                            className={classes.redButton}
                                        >
                                            Vacate
                                        </button>
                                    </>
                                }
                            </div>
                        </>
                        }
                    </div>
                )
            case 'DIRTY':
                return (
                    <div className={classes.contentContainer}>
                        <div className={classes.iconContainer}>
                            <CleanHandsIcon sx={{ fontSize: 150, color: 'rgba(255, 224, 99, 0.5)' }} />
                        </div>
                        <div className={classes.actions}>
                            {admin ?
                                <button onClick={handleOrderDatails} className={classes.yellowButton}>
                                    Table statistics
                                </button> :
                                <button onClick={()=>handleChangeStatus(false)} className={classes.yellowButton}>
                                    Clear
                                </button>
                            }
                        </div>
                    </div>
                )
        }
    }

    const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
        color: 'rgba(255, 0, 0, 0.2)',
        '&:hover': {
            color: 'rgb(237, 14, 14)',
        },
    }));

    const StyledEditIcon = styled(EditIcon)(({ theme }) => ({
        color: 'rgb(60, 60, 211, 0.2)',
        '&:hover': {
            color: 'darkblue',
        },
    }));

    return (
        <Paper elevation={4} sx={{ borderRadius: 2 }} className={classes.table}>
            <div className={classes.header}>
                {admin ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%", }}>
                    <StyledDeleteIcon onClick={handleDelete} />
                    {table.name}
                    <StyledEditIcon onClick={() => { updateTable(table.name) }} />
                </div> : table.name}
            </div>
            {renderContent()}
        </Paper>
    );
})

export default Table;