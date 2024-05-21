import React from 'react';
import styled from 'styled-components';
import ChartDaily from './ChartDaily';
import ChartWeekly from './ChartWeekly';
import ChartIntra from './ChartIntra';

const Chart = ({
  dailyPrices,
  weeklyPrices,
  intraPrices,
  date,
  xIntraValues,
  xWeeklyValues
}) => {
  return (
    <StyledChart>
      {intraPrices.length > 0 && (
        <ChartIntra
          intraPrices={intraPrices}
          date={date}
          xIntraValues={xIntraValues}
        />
      )}
      {dailyPrices.length > 0 && (
        <ChartDaily dailyPrices={dailyPrices} date={date} />
      )}
      {weeklyPrices.length > 0 && (
        <ChartWeekly weeklyPrices={weeklyPrices} date={date} xWeeklyValues={xWeeklyValues}/>
      )}
    </StyledChart>
  );
};

const StyledChart = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    &:before {
      left: 0%;
      background: #e975fd7b;
      width: 100%;
    }
  }
`;

export default Chart;
