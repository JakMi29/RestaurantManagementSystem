import { Form, Link, useActionData, useSearchParams } from 'react-router-dom';
import classes from '../Form.module.css';
import { useEffect, useState } from 'react';
import { getRestaurantName } from '../../../util/data';
import { getAuthToken } from '../../../util/auth';

function TableFormDialog({ name, mode, onClose }) {
    const [error, setError] = useState(false);
    const data = useActionData();

    useEffect(() => {
        if (data) {
            if (data.code === 200) {
                onClose()
            } else {
                setError(true);
            }
        }
    }, [data]);

    const handleChange = (event) => {
        setError(false);
    }

    return (
        <div>
            <Form method="post">
                {error && <p style={{ color: "red" }}>{data.message}</p>}
                <div className={classes.inputContainer}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        onChange={handleChange}
                        defaultValue={name ? name : ''}
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
            </Form>
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