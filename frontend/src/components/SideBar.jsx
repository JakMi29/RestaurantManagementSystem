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
    <div className={isOpen?"side-bar":"side-bar-hide"}>
      <div className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <ArrowBackIosOutlinedIcon className="icon"/> : <ArrowForwardIosOutlinedIcon className="icon"/>}
      </div>
      <div className="menu-items-container">
      <MenuItem 
      text="Menu" 
      link="/menu" 
      icon={<RestaurantMenuOutlinedIcon className="icon"/>}
      hide={isOpen}
      />
      <MenuItem 
      text="Statistics" 
      link="/statistics" 
      icon={<LeaderboardOutlinedIcon className="icon"/>}
      hide={isOpen}
      />
      <MenuItem 
      text="Restaurant" 
      link="/restaurant" 
      icon={<TableBarOutlinedIcon className="icon"/>}
      hide={isOpen}
      />
      </div>
      {/* <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="content">
          <h2>Sidebar</h2>
          <ul>
            <li><a href="home">Home</a></li>
            <li><a href="about">About</a></li>
            <li><a href="contact">Contact</a></li>
          </ul>
          </div>
        </div>*/}
      {/* <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
  // </div> */}
    </div>
  );
}

export default Sidebar;