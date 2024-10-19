import { Form, Link, useActionData } from 'react-router-dom';
import classes from '../Form.module.css';
import { useContext, useEffect, useState } from 'react';
import { getRestaurantName } from '../../../util/data';
import { getAuthToken } from '../../../util/auth';
import MessageContext from '../../../store/MessageContext';
import { useFetcher } from 'react-router-dom';


function TableFormDialog({ name, mode, onClose }) {
    const fetcher = useFetcher();
    const [error, setError] = useState(false);
    const messageCtx = useContext(MessageContext);

    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.code === 200) {
                onClose();
                messageCtx.showMessage(fetcher.data.message, 'info');
            } else {
                setError(true);
            }
        }
    }, [fetcher.data]);

    const handleChange = (event) => {
        setError(false);
    };

    return (
        <div>
            <fetcher.Form method="post" onChange={handleChange}>
                {error && <p style={{ color: "red" }}>{fetcher.data?.message}</p>}
                <div className={classes.inputContainer}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        defaultValue={name || ''}
                    />
                </div>
                <input type="hidden" name="oldName" value={name} />
                <input type="hidden" name="mode" value={mode} />
                <div className={classes.actions}>
                    <button type="button" onClick={onClose} className={classes.actionButton}>
                        Cancel
                    </button>
                    <button type="submit" className={classes.actionButton}>
                        {mode === "create" ? "Create" : "Update"}
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}

export const action = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const oldName = formData.get('oldName');
    const restaurantName = getRestaurantName();
    const mode = formData.get('mode');

    const response = await fetch(`http://localhost:8080/api/restaurantManagementSystem/table/admin?tableName=${name}` +
        (mode === "create" ? "" : `&oldTableName=${oldName}`) +
        `&restaurantName=${restaurantName}`, {
        method: mode === "create" ? "POST" : "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
        }
    });

    if (response.status === 422) {
        return response;
    }
    if (response.status === 400) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save table.' }, { status: 500 });
    }

    return response;
};

export default TableFormDialog;
