import React from 'react';
import styled from 'styled-components';

const ChartDaily = ({ dailyPrices, date }) => {
  return (
    <StyledChart>
      <h3>Daily Price Summary</h3>
      <h4>{date}</h4>
      <table>
        <thead>
          <tr>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$ {dailyPrices[0]}</td>
            <td>$ {dailyPrices[1]}</td>
            <td>$ {dailyPrices[2]}</td>
            <td>$ {dailyPrices[3]}</td>
            <td>$ {dailyPrices[4]}</td>
          </tr>
        </tbody>
      </table>
    </StyledChart>
  );
};

const StyledChart = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

export default ChartDaily;
