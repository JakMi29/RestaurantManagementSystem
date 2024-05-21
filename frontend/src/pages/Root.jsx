import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Sidebar from "../components/SideBar";


function RootLayout() {

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
