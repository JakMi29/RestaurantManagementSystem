import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/SideBar";
import { useEffect, useState } from "react";
import { getTokenDuration } from "../util/auth";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

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
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);
  


  return (
    <>
      <PageHeader />
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <ArrowBackIosOutlinedIcon /> : <ArrowForwardIosOutlinedIcon />}
      </div>
        {isOpen && <Sidebar />}
        <Outlet />
    </>
  );
}

export default RootLayout;
