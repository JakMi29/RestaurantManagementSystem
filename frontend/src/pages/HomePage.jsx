import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import classes from './HomePage.module.css';
function HomePage() {
 
  return (
        <div className={classes.content}>
          <div className={classes.container}>
          <h1>Manage your entire restaurant in one application</h1>
          <div className={classes.images}>
            <RestaurantMenuOutlinedIcon sx={{ fontSize: 150 }} />
            <GroupOutlinedIcon sx={{ fontSize: 150 }}  />
          </div>
          <div className={classes.images}>
            <InsertChartOutlinedIcon sx={{ fontSize: 150 }}  />
            <AttachMoneyOutlinedIcon sx={{ fontSize: 150 }}  />
            <div>
            </div>
          </div>
          </div>
      </div>
  );
}

export default HomePage;
