import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import WaiterFormDialog from './form/WaiterFormDialog';
import TableFormDialog from './form/TableFormDialog';
import MealFormDialog from './form/MealFormDialog';

function DialogComponent({ open, onClose, name, mode, object }) {
    let content;
    let header;
    switch (name) {
        case "waiter":
            content = <WaiterFormDialog onClose={onClose} mode={mode} waiter={object} />;
            header = mode === "create" ? "Add waiter" : "Update waiter"
            break;
        case "table":
            content = <TableFormDialog onClose={onClose} mode={mode} name={object} />;
            header = mode === "create" ? "Add table" : "Update table"
            break;
        case "meal":
            content = <MealFormDialog onClose={onClose} mode={mode} meal={object} />;
            header = mode === "create" ? "Add meal" : "Update meal"
            break;
        default:
            content = null;
    }

    return (
        <Dialog open={open === true} header={header}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {header}
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
        </Dialog>
    );
}

export default DialogComponent;