import { useFetcher } from 'react-router-dom';
import classes from './Form.module.css';
import uiClasses from '../ux/Ui.module.css';
import { useContext, useEffect, useState } from 'react';
import { Mode } from '../../constants/Mode';
import { TextField } from '@mui/material';
import { updateWaiter, WaiterData} from '../../api/form/Waiter';
import { getRestaurantName } from '../../services/LocalStorage';
import MessageContext from '../../store/MessageContext';
import { MessageMode } from '../../constants/MessageMode';

interface WaiterFormDialogProps {
  waiter?: any;
  mode: Mode;
  onClose: () => void;
}

function WaiterFormDialog({ waiter, mode, onClose }: WaiterFormDialogProps) {
  const fetcher = useFetcher();
  const [error, setError] = useState<boolean>(false);
  const messageCtx = useContext(MessageContext);
  const method = mode === Mode.CREATE ? 'post' : 'put';

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.code === 200) {
        messageCtx.showMessage(fetcher.data.message, MessageMode.INFO);
        onClose();
      } else {
        setError(true);
      }
    }
  }, [fetcher.data]);

  const handleChange = (_event: any) => {
    setError(false);
  };

  return (
      <fetcher.Form method={method} className={classes.form}>
        {error && <p style={{ color: "red" }}>{fetcher.data?.message}</p>}

        <TextField
          id="name"
          label="Name"
          name="name"
          required
          onChange={handleChange}
          defaultValue={waiter ? waiter.name : ''}
        />

        <TextField
          id="surname"
          label="Surname"
          name="surname"
          required
          onChange={handleChange}
          defaultValue={waiter ? waiter.surname : ''}
        />

        <TextField
          id="email"
          label="Email"
          name="email"
          required
          onChange={handleChange}
          defaultValue={waiter ? waiter.email : ''}
        />

        <TextField
          id="phone"
          label="Phone"
          name="phone"
          required
          onChange={handleChange}
          defaultValue={waiter ? waiter.phone : ''}
        />

        <TextField
          id="salary"
          type="number"
          name="salary"
          label="Salary"
          required
          onChange={handleChange}
          defaultValue={waiter ? waiter.salary : ''}
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          required
          onChange={handleChange}
          defaultValue={waiter ? waiter.password : ''}
        />
        <input type="hidden" name="oldEmail" value={waiter ? waiter.email : ''} />
        <div className={classes.actions}>
          <button type="button" onClick={onClose} className={uiClasses.redButton}>
            Cancel
          </button>
          <button type="submit" className={uiClasses.greenButton}>
            {Mode.CREATE ? "Create" : "Update"}
          </button>
        </div>
      </fetcher.Form>
  );
}

export async function action({ request }: { request: Request }): Promise<Response> {
  const method = request.method;
  const data = await request.formData();

  const waiterData: WaiterData = {
    email: data.get('email') as string,
    name: data.get('name') as string,
    surname: data.get('surname') as string,
    salary: data.get('salary') as string,
    phone: data.get('phone') as string,
    restaurantName: getRestaurantName()??"rrrr",
    oldEmail: data.get('oldEmail') as string,
    password: data.get('password') as string
  };

  const response = await updateWaiter(method,waiterData)

  if (response.status === 422) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save waiter.' }), { status: 500 });
  }

  return response;
}

export default WaiterFormDialog;