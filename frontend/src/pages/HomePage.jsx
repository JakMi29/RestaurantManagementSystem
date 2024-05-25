import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import classes from './HomePage.module.css';
function HomePage() {
  return (
    <div className="page">
        <div className={classes.content}>
          <div className={classes.container}>
          <h1>Welcome in our management system</h1>
          <div className={classes.images}>
            <RestaurantMenuOutlinedIcon sx={{ fontSize: 100 }} />
            <GroupOutlinedIcon sx={{ fontSize: 100 }}  />
          </div>
          <div className={classes.images}>
            <InsertChartOutlinedIcon sx={{ fontSize: 100 }}  />
            <AttachMoneyOutlinedIcon sx={{ fontSize: 100 }}  />
            <div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default HomePage;
