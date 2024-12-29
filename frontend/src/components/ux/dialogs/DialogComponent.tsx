import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import MealFormDialog from "../../forms/MealFormDialog";
import { Mode } from "../../../constants/Mode";
import { DialogMode } from "../../../constants/DialogMode";
import WaiterFormDialog from "../../forms/WaiterFormDialog";
import TableFormDialog from "../../forms/TableFormDialog";

interface DialogComponentProps {
    open: boolean,
    onClose: any,
    type: DialogMode,
    object: any
    mode: Mode,
}


const DialogComponent = (props: DialogComponentProps) => {
    let content;
    let header="";
    switch (props.type) {
        case DialogMode.WAITER:
            content = <WaiterFormDialog onClose={props.onClose} mode={props.mode} waiter={props.object} />;
            header = props.mode === Mode.CREATE ? "Add waiter" : "Update waiter"
            break;
        case DialogMode.TABLE:
            content = <TableFormDialog onClose={props.onClose} mode={props.mode} table={props.object} />;
            header = props.mode === Mode.CREATE ? "Add table" : "Update table"
            break;
        case DialogMode.MEAL:
            content = <MealFormDialog onClose={props.onClose} mode={props.mode} meal={props.object} />;
            header = props.mode === Mode.CREATE ? "Add meal" : "Update meal"
            break;
        default:
            content = null;
    }

    return (
        <Dialog open={props.open}>
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