import { useState } from "react";
import MenuItem from "./MenuItem";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? "side-bar" : "side-bar-hide"}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <ArrowBackIosOutlinedIcon /> : <ArrowForwardIosOutlinedIcon />}
      </div>
      <div className="menu-items-container">
        <MenuItem
          text="Menu"
          link="/menu"
          icon={<RestaurantMenuOutlinedIcon />}
          hide={isOpen}
        />
        <MenuItem
          text="Statistics"
          link="/statistics"
          icon={<LeaderboardOutlinedIcon />}
          hide={isOpen}
        />
        <MenuItem
          text="Restaurant"
          link="/restaurant"
          icon={<TableBarOutlinedIcon />}
          hide={isOpen}
        />
      </div>
    </div>
  );
}

export default Sidebar;