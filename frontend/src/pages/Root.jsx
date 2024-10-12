import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/ui/side-bar/SideBar";
import { useEffect, useState } from "react";
import { getTokenDuration } from "../util/auth";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import MessageModal from "../components/ui/MessageModal";
function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
      <PageHeader />
      {token && (
        <>
          <div className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <ArrowBackIosOutlinedIcon /> : <ArrowForwardIosOutlinedIcon />}
          </div>
          {isOpen && <Sidebar />}
        </>
      )}
      <MessageModal/>
      <div className="page">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout
