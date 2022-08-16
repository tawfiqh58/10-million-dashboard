import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ChartTitle } from '../styles/dashboardstyles';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ({ data }) {
  return (
    <Chart>
      <ChartTitle>Devices</ChartTitle>
      <Doughnut data={data} />
    </Chart>
  );
}
