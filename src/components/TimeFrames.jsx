import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Chart from './Chart';

const TimeFrames = ({
  symbol,
  textInput,
  weeklyPrices,
  setWeeklyPrices,
  dailyPrices,
  setDailyPrices,
  intraPrices,
  setIntraPrices,
}) => {
  const [radio, setRadio] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState([]);
  const [xIntraValues, setXIntraValues] = useState([]);
  const [xWeeklyValues, setXWeeklyValues] = useState([]);

  const onClickHandler = (e) => {
    setTarget(e.target);
    setRadio(e.target.value);
  };

  const getData = async (e) => {
    e.preventDefault();

    const intraURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${textInput}&interval=60min&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`;
    const dailyURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${textInput}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`;
    const weeklyURL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${textInput}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`;

    console.log(dailyURL)

    if (radio === 'intra' && target.checked) {
      try {
        const data = await axios.get(intraURL);
        if (data) {
          const refreshed = Object.values(
            data.data['Meta Data']['3. Last Refreshed']
          );
          const day = refreshed.slice(0, 10).join('');

          // Dates - X axis
          let xValues = [];

          for (let key in data.data['Time Series (60min)']) {
            xValues.push(key);
          }

          const filtered = xValues.filter((x) => x.includes(day)).reverse();
          const filteredHours = filtered.map((x) => {
            return x.slice(11, 16);
          });

          setXIntraValues(filteredHours);

          //Prices - Y axis
          const result = Object.keys(data.data['Time Series (60min)'])
            .filter((key) => key.includes(day))
            .reduce((cur, key) => {
              return Object.assign(cur, {
                [key]: data.data['Time Series (60min)'][key],
              });
            }, {});

          const resultArr = Object.keys(result).map((key) => result[key]);
          const resultClosing = resultArr.map((res) => {
            return res['4. close'];
          });

          const closingReversed = resultClosing.reverse();
          setIntraPrices(closingReversed);
          setDate(refreshed);

          setDailyPrices([]);
          setWeeklyPrices([]);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (radio === 'daily' && target.checked) {
      try {
        const data = await axios.get(dailyURL);

        if (data) {
          const monthlyTimeSeries = Object.values(
            data.data['Time Series (Daily)']
          );
          const refreshed = Object.values(
            data.data['Meta Data']['3. Last Refreshed']
          );
          const result = [monthlyTimeSeries[0]];
          const resultValues = Object.keys(result[0]).map((key) => {
            return parseFloat(result[0][key]).toFixed(2);
          });

          setDate(refreshed);
          setDailyPrices(resultValues);
        }
      } catch (err) {
        console.log(err);
      }

      setWeeklyPrices([]);
      setIntraPrices([]);
    }

    if (radio === 'weekly' && target.checked) {
      try {
        const data = await axios.get(weeklyURL);

        if (data) {
          const weeklyTimeSeries = Object.values(
            data.data['Weekly Time Series']
          );

          const refreshed = Object.values(
            data.data['Meta Data']['3. Last Refreshed']
          );

          //Dates - X axis
          let xValues = [];
          for (let key in data.data['Weekly Time Series']) {
            xValues.push(key);
          }
          const slicedX = xValues.slice(0, 12).reverse();

          setXWeeklyValues(slicedX);

          //Prices - Y axis
          const result = weeklyTimeSeries.slice(0, 12).reverse();
          const resultValues = Object.values(
            result.map((i) => {
              return i['4. close'];
            })
          );
          setWeeklyPrices(resultValues);
          setDate(refreshed);
        }
      } catch (err) {
        console.log(err);
      }

      setDailyPrices([]);
      setIntraPrices([]);
    }
  };

  return (
    <>
      <StyledTimes>
        <h2>Get more {symbol} data</h2>
        <form onSubmit={getData} className='form-timeframe'>
          <div className='input-wrapper'>
            <input
              type='radio'
              id='intra'
              name='radio-btn'
              value='intra'
              onClick={onClickHandler}
            />
            <label htmlFor='intra'>Intraday</label>
            <input
              type='radio'
              id='daily'
              name='radio-btn'
              value='daily'
              onClick={onClickHandler}
            />
            <label htmlFor='daily'>Daily</label>
            <input
              type='radio'
              id='weekly'
              name='radio-btn'
              value='weekly'
              onClick={onClickHandler}
            />
            <label htmlFor='weekly'>Weekly</label>
          </div>
          <button type='submit'>Show</button>
        </form>
      </StyledTimes>
      <Chart
        dailyPrices={dailyPrices}
        weeklyPrices={weeklyPrices}
        intraPrices={intraPrices}
        xIntraValues={xIntraValues}
        xWeeklyValues={xWeeklyValues}
        date={date}
      />
    </>
  );
};

const StyledTimes = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 50px 0px 0px;
  h2 {
    margin-bottom: 0px;
  }
`;

export default TimeFrames;
