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

const ChartIntra = ({ intraPrices, date, xIntraValues }) => {
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
    labels: xIntraValues,
    datasets: [
      {
        label: 'Closing Price',
        data: intraPrices,
        backgroundColor: ['rgba(153, 102, 255, 1)'],
        borderColor: ['rgba(153, 102, 255, 0.6)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(243, 149, 255, 0.87)'],
      },
    ],
  };

  const options = {
    responsive: true,
    title: { text: 'Line Chart', display: true },
  };

  return (
    <StyledChart>
      <h3>Intraday Closing Prices</h3>
      <h4>Refreshed: {date}</h4>
      <Line data={data} options={options} className='bar' />
    </StyledChart>
  );
};

const StyledChart = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  h4 {
    margin-bottom: 20px;
  }
`;

export default ChartIntra;
