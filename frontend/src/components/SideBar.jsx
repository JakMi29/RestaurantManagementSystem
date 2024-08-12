import MenuItem from "./MenuItem";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

function Sidebar() {


  return (
    <div className="side-bar">
      <div className="menu-items-container">
        <MenuItem
          text="Meals"
          link='/meals?category=soup&pageNumber=0&pageSize=10'
          icon={<RestaurantMenuOutlinedIcon />}
        />
        <MenuItem
          text="Restaurant"
          link="/restaurant/tables"
          icon={<TableBarOutlinedIcon />}
        />
        {localStorage.getItem('role') === 'ADMIN' && (
          <>
            <MenuItem
              text="Statistics"
              link="/statistics"
              icon={<LeaderboardOutlinedIcon />}
            />
            <MenuItem
              text="employees"
              link="/employees"
              icon={<GroupOutlinedIcon />}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;