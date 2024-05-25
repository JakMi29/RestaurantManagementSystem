import MenuItem from "./MenuItem";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';

function Sidebar() {


  return (
    <div className="side-bar">
      <div className="menu-items-container">
        <MenuItem
          text="Menu"
          link="/menu"
          icon={<RestaurantMenuOutlinedIcon />}
        />
        <MenuItem
          text="Statistics"
          link="/statistics"
          icon={<LeaderboardOutlinedIcon />}
        />
        <MenuItem
          text="Restaurant"
          link="/restaurant"
          icon={<TableBarOutlinedIcon />}
        />
      </div>
    </div>
  );
}

export default Sidebar;