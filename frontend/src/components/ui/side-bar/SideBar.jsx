import MenuItem from "./MenuItem";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import TableBarOutlinedIcon from '@mui/icons-material/TableBarOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import classes from '../Ui.module.css';


function Sidebar() {

  return (
    <div className={classes.sidebar}>
      <div className={classes.menuItemsContainer}>
        <MenuItem
          text="Meals"
          link='/meals?category=appetizer&pageNumber=0&pageSize=10'
          icon={<RestaurantMenuOutlinedIcon />}
        />
        <MenuItem
          text="Restaurant"
          link="/restaurant/tables?pageNumber=0&pageSize=10"
          icon={<TableBarOutlinedIcon />}
        />
        {localStorage.getItem('role') === 'ADMIN' && (
          <>
            <MenuItem
              text="Statistics"
              link="/statistics/orders?period=today"
              icon={<LeaderboardOutlinedIcon />}
            />
            <MenuItem
              text="Waiters"
              link="/waiters/all?pageNumber=0&pageSize=12"
              icon={<GroupOutlinedIcon />}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;