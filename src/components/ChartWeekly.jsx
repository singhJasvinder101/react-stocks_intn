import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const ChartWeekly = ({ weeklyPrices, date, xWeeklyValues }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    LineController,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const data = {
    labels: xWeeklyValues,
    datasets: [
      {
        label: 'Closing prices ($) ',
        data: weeklyPrices,
        backgroundColor: ['rgba(129,201,149,1)'],
        borderColor: ['rgba(129,201,149,1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    title: { text: 'Line Chart', display: true },
  };

  return (
    <StyledChart>
      <h3>Weekly Closing Prices</h3>
      <h4>Refreshed: {date}</h4>
      <Line data={data} options={options} className='bar' />
    </StyledChart>
  );
};

const StyledChart = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

export default ChartWeekly;
