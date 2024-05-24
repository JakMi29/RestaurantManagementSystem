import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/SideBar";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";


function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);
  

  return (
    <>
      <PageHeader />
      <div className="main-container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
