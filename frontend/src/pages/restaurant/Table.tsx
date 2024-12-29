import { useContext } from "react";
import MessageContext from "../../store/MessageContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TableInterface, TableStatus } from "../../interfaces/Table";
import { OrderInterface } from "../../interfaces/Order";
import { changeTableStatus, deleteTable } from "../../api/TableApi";
import { MessageMode } from "../../constants/MessageMode";
import { createOrder } from "../../api/OrderApi";
import { orderActions } from "../../store/OrderSlice";
import { Paper, styled, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from '../../pages/restaurant/RestaurantPage.module.css';
import uiClasses from '../../components/ux/Ui.module.css';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupsIcon from '@mui/icons-material/Groups';
import Order from "./Order";


interface TableProps {
    table: TableInterface,
    order: OrderInterface | undefined,
    updateTable: (table: TableInterface) => void
}

const Table = (props: TableProps) => {
    const { table, order, updateTable } = props
    const admin = localStorage.getItem('role') === 'ADMIN';
    const messageCtx = useContext(MessageContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDisplayOrderDatails = () => {
        navigate(`/statistics/order?number=${order?.number}`)
    };

    const handleChangeStatus = (reverse: boolean) => {
        changeTableStatus(table.name, reverse).then(response => {
            if (!response.ok) {
                messageCtx.showMessage('Something went wrong', MessageMode.ERROR);
            }
        })
    };

    const handleDelete = () => {
        deleteTable(table.name).then(response => {
            if (!response.ok) {
                messageCtx.showMessage('Something went wrong', MessageMode.ERROR);
            } else {
                navigate(0)
            }
        }).catch(error => {
            console.error('An error occurred while sending the request:', error);
        });
    };

    const craeteOrder = () => {
        createOrder(table.name).then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                messageCtx.showMessage('Something went wrong', MessageMode.ERROR);
            }
        })
            .then(data => {
                dispatch(orderActions.editOrder({ order: data }));
            })
            .catch(error => {
                console.error('An error occurred while sending the request:', error);
            });
    };

    const StyledDeleteIcon = styled(DeleteIcon)(() => ({
        color: 'rgba(255, 0, 0, 0.2)',
        '&:hover': {
            color: 'rgb(237, 14, 14)',
        },
    }));

    const StyledEditIcon = styled(EditIcon)(() => ({
        color: 'rgb(60, 60, 211, 0.2)',
        '&:hover': {
            color: 'darkblue',
        },
    }));

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
                            onClick={handleDisplayOrderDatails}
                            className={uiClasses.greenButton}
                        >
                            Order details
                        </button>
                    </div>
                </div>
            )
        }
        switch (table.status) {
            case TableStatus.READY:
                return (
                    <div className={classes.contentContainer}>
                        <div className={classes.iconContainer}>
                            <TableRestaurantIcon sx={{ fontSize: 150, color: 'rgb(60, 60, 211, 0.2)' }} />
                        </div>
                        <div className={classes.actions}>
                            {!admin && <button onClick={() => handleChangeStatus(false)} className={uiClasses.blueButton}>
                                Ocuppy
                            </button>
                            }
                        </div>
                    </div>
                )
            case TableStatus.BUSY:
                return (
                    <div className={classes.contentContainer}>
                        {order ? <Order key={order.number} order={order} admin={false} /> : <>
                            <div className={classes.iconContainer}>
                                <GroupsIcon sx={{ fontSize: 150, color: 'rgba(60, 60, 211, 0.2)' }} />
                            </div>
                            <div className={classes.actions}>
                                {!admin &&
                                    <>
                                        <button
                                            onClick={craeteOrder}
                                            className={uiClasses.greenButton}
                                        >
                                            Order
                                        </button>
                                        <button
                                            onClick={() => handleChangeStatus(true)}
                                            className={uiClasses.redButton}
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
            case TableStatus.DIRTY:
                return (
                    <div className={classes.contentContainer}>
                        <div className={classes.iconContainer}>
                            <CleanHandsIcon sx={{ fontSize: 150, color: 'rgba(255, 224, 99, 0.5)' }} />
                        </div>
                        <div className={classes.actions}>
                            {!admin &&
                                <button onClick={() => handleChangeStatus(false)} className={uiClasses.yellowButton}>
                                    Clear
                                </button>
                            }
                        </div>
                    </div>
                )
        }
    }

    return (
        <Paper elevation={4} sx={{ borderRadius: 2 }} className={classes.table}>
            <div className={classes.header}>
                {admin ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%", }}>
                    <StyledDeleteIcon onClick={handleDelete} />
                    <Typography variant="h6">{table.name}</Typography>
                    <StyledEditIcon onClick={() => { updateTable(table) }} />
                </div> : <Typography variant="h6">{table.name}</Typography>}
            </div>
            {renderContent()}
        </Paper>
    );
}

export default Table