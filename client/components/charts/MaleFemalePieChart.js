import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartTitle, Chart } from '../styles/dashboardstyles';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ({ data }) {
  return (
    <Chart>
      <ChartTitle>Gender</ChartTitle>
      <Doughnut data={data} className="pie-chart" />
    </Chart>
  );
}
