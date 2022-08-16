import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  BarElement,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartTitle, Chart } from '../styles/dashboardstyles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function ({ data }) {
  return (
    <Chart>
      <ChartTitle>Top countris</ChartTitle>
      <Bar data={data} />
    </Chart>
  );
}
