import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

function PageHeader() {
    const token = useRouteLoaderData('root');
    return (
        <div className="header">
            <h1>Restaurant Management System</h1>
            {!token && (
            <NavLink
                to="/auth"
                className="login-button"
                activeclassname="active"
            >
                Login
            </NavLink>
        )}
          {token && (
             <Form action="/logout" method="post" className="logout-form">
             <button >Logout</button>
           </Form>
        )}
        </div>
    );
}
export default PageHeader;