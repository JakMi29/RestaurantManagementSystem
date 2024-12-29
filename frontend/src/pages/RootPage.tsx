import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import { getTokenDuration } from "../services/AuthService";
import PageHeader from "../components/ux/PageHeader";
import Sidebar from "../components/ux/SideBar";
import MessageModal from "../components/ux/dialogs/MessageModal";

const RootLayout = () => {
  const token = useLoaderData() as string;
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

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);

    const clearProgressTimeout = setTimeout(() => {
    }, tokenDuration + 1000);

    return () => clearTimeout(clearProgressTimeout);

  }, [token, submit]);

  return (
    <>
      <MessageModal />
      <PageHeader />
      {token && (<Sidebar />)}
      <div className="page">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout
