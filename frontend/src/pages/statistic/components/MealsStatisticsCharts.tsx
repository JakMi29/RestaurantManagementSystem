import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ChartComponent from '../../../components/ux/ChartComponent';
import { chartPaperStyle } from '../../../theme/theme';
import {MealsStatisticsData } from '../../../interfaces/statistics/MealsStatistics';

const MealsStatisticsCharts = (props: { statistics: MealsStatisticsData }) => {
  return (
    <Box sx={{ marginTop: 4 }} >
      <Typography variant="h4" sx={{ marginBottom: 3, color: "rgba(60, 60, 211,1)", fontWeight: "bold" }}>
        Charts
      </Typography>
      <Grid container spacing={1}>
        <Grid size={6}>
          <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={props.statistics.dailyStatistics}
              xLabel="date"
              yLabel="quantity"
              title="Ordered meals"
              dataKey="quantity"
              labelKey="date"
            />
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={props.statistics.dailyStatistics}
              xLabel="date"
              yLabel="time"
              title="Average preapare meal time"
              dataKey="duration"
              labelKey="date"
            />
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={props.statistics.mostSalesMeal}
              xLabel="name"
              yLabel="quantity"
              title="Most sales meal"
              dataKey="quantity"
              labelKey="name"
            />
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper elevation={3} sx={chartPaperStyle}>
            <ChartComponent
              dataset={props.statistics.highestIncomeMeal}
              xLabel="name"
              yLabel="price"
              title="Highest income meal"
              dataKey="price"
              labelKey="name"
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealsStatisticsCharts;