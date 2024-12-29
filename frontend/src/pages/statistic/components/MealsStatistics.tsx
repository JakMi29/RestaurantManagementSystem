import { paperStyle } from '../../../theme/theme';
import Grid from '@mui/material/Grid2';
import { Box, Paper, Typography } from '@mui/material';
import { MealsStatisticsData } from '../../../interfaces/statistics/MealsStatistics';

export const MealsStatistics = (props: { statistics: MealsStatisticsData }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Meals Statistics
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid size={3}>
          <Paper elevation={4} sx={paperStyle}>
            <Typography variant="h6">Average daily sold meals</Typography>
            <Typography variant="h4">{props.statistics.averageDailySoldMeals}</Typography>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper elevation={4} sx={paperStyle}>
            <Typography variant="h6">Total sold meals</Typography>
            <Typography variant="h4">{props.statistics.totalSoldMeals}</Typography>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper elevation={4} sx={paperStyle}>
            <Typography variant="h6">Average meals per order</Typography>
            <Typography variant="h4">{props.statistics.averageMealsPerOrder}</Typography>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper elevation={4} sx={paperStyle}>
            <Typography variant="h6">Average meal preapering time</Typography>
            <Typography variant="h4">{props.statistics.averagePrepareMealTime} min</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>

  );
};
