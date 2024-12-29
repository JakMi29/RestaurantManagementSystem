import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import classes from './Ui.module.css';
import { useState } from "react";
import SidebarItem from './SidebarItem';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={classes.sideBarButton} onClick={toggleSidebar}>
        {isOpen ? <ArrowBackIosOutlinedIcon sx={{fontSize:"16px"}}/> : <ArrowForwardIosOutlinedIcon sx={{fontSize:"16px"}}/>}
      </button>
      {isOpen && <div className={classes.sidebar}>
        <div className={classes.sidebarMenu}>
          <SidebarItem
            text="Meals"
            link='/meals?category=appetizer&pageNumber=0&pageSize=10'
            icon={<RestaurantMenuOutlinedIcon />}
          />
          <SidebarItem
            text="Restaurant"
            link="/restaurant/view?pageNumber=0&pageSize=10"
            icon={<TableBarOutlinedIcon />}
          />
          {localStorage.getItem('role') === 'ADMIN' && (
            <>
              <SidebarItem
                text="Statistics"
                link="/statistics/orders?period=today"
                icon={<LeaderboardOutlinedIcon />}
              />
              <SidebarItem
                text="Waiters"
                link="/waiters?pageNumber=0&pageSize=12"
                icon={<GroupOutlinedIcon />}
              />
            </>
          )}
        </div>
      </div>}
    </>
  );
}

export default Sidebar;