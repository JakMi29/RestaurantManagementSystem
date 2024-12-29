import { useFetcher } from 'react-router-dom';
import classes from './Form.module.css';
import uiClasses from '../ux/Ui.module.css';
import { useContext, useEffect, useState } from 'react';
import { Mode } from '../../constants/Mode';
import { TextField } from '@mui/material';
import { getRestaurantName } from '../../services/LocalStorage';
import MessageContext from '../../store/MessageContext';
import { MessageMode } from '../../constants/MessageMode';
import { TableInterface } from '../../interfaces/Table';
import { TableData, updateTable } from '../../api/form/Table';

interface TableFormDialogProps {
  table?: TableInterface;
  mode: Mode;
  onClose: () => void;
}

const TableFormDialog=({ table, mode, onClose }: TableFormDialogProps)=> {
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
        defaultValue={table?.name ?? ''}
      />
      <input type="hidden" name="oldName" value={table?.name} />
      <div className={classes.actions}>
        <button type="button" onClick={onClose} className={uiClasses.redButton}>
          Cancel
        </button>
        <button type="submit" className={uiClasses.greenButton}>
          {mode === Mode.CREATE ? "Create" : "Update"}
        </button>
      </div>
    </fetcher.Form>
  );
}

export async function action({ request }: { request: Request }): Promise<Response> {
  const method = request.method;
  const data = await request.formData();

  const tableData: TableData = {
    name: data.get('name') as string,
    restaurantName: getRestaurantName()??"",
    oldName: data.get('oldName') as string
  };

  const response = await updateTable(method, tableData)

  if (response.status === 422) {
    return response;
  }
  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save table.' }), { status: 500 });
  }

  return response;
}

export default TableFormDialog;