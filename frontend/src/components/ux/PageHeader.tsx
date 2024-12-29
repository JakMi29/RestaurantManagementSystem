import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./Ui.module.css"

const PageHeader = () => {
    const token = useRouteLoaderData('root') as string;
    return (
        <div className={classes.header}>
            <h1>Restaurant Management System</h1>
            {!token && (
                <NavLink
                    to="/auth?mode=login"
                    className={({ isActive }: { isActive: boolean }) => 
                         `${classes.navLinkLogin} ${isActive ? classes.active : ''}`
                    }
                >
                    Login
                </NavLink>
            )}
            {token && (
                <Form action="/logout" method="post">
                    <button className={classes.blueButton}>Logout</button>
                </Form>
            )}
        </div>
    );
}
export default PageHeader;