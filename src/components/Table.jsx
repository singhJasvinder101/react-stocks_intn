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

const Table = ({ prices, symbol, closingPrice, xAxisValues }) => {
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
    labels: xAxisValues,
    datasets: [
      {
        label: 'Closing Prices ($)',
        data: closingPrice,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    title: { text: 'Line Chart', display: true },
  };

  return (
    <StyledTable>
      <h2>{symbol}</h2>
      <div className='container'>
        <div>
          <h3>Last 30 days closing prices</h3>
          <Line data={data} options={options} className='bar' />
        </div>
      </div>
    </StyledTable>
  );
};

const StyledTable = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .container {
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    & > * {
      width: 100%;
    }
  }
`;
export default Table;
