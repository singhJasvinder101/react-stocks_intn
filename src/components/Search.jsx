import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Table from './Table';
import TimeFrames from './TimeFrames';

const Search = () => {
  const [textInput, setTextInput] = useState('');
  const [security, setSecurity] = useState([]);
  const [prices, setPrices] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [allSymbol, setAllSymbol] = useState([]);
  const [weeklyPrices, setWeeklyPrices] = useState([]);
  const [dailyPrices, setDailyPrices] = useState([]);
  const [intraPrices, setIntraPrices] = useState([]);
  const [closingPrice, setClosingPrice] = useState([]);
  const [xAxisValues, setXAxisValues] = useState([]);

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  //Code for autoComplete Search --> but sends too many requests
  /*useEffect(() => {
    const getSymbols = async () => {
      const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${textInput}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`;
      const res = await axios.get(searchURL);
      if (res) {
        setSecurity(res.data.bestMatches);
        if (security !== undefined && security.length > 0) {
          let symbols = security.map((sec) => sec['1. symbol']);
          setAllSymbol(symbols);
        }
      }
    };
    getSymbols();
  }, [textInput]); */

  const showData = async (e) => {
    e.preventDefault();
    const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${textInput}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`;
    const monthlyURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${textInput}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`;

    console.log(searchURL)
    try {
      const res = await axios.get(searchURL);
      const data = await axios.get(monthlyURL);

      if (res) {
        setSymbol(res.data.bestMatches[0]['1. symbol']);
        setSecurity(res.data.bestMatches);

        if (data) {
          const monthlyTimeSeries = Object.values(
            data.data['Time Series (Daily)']
          );

          //get X axis values
          let xValues = [];
          for (let key in data.data['Time Series (Daily)']) {
            xValues.push(key);
          }
          const slicedX = xValues.slice(0, 30).reverse();
          setXAxisValues(slicedX);

          //for table
          const result = [monthlyTimeSeries[1]];
          const resultValues = Object.keys(result[0]).map((key) => {
            return Math.floor(result[0][key]);
          });
          setPrices(resultValues);
          //for chart
          const sliced = monthlyTimeSeries.slice(0, 30);
          const closingValues = Object.values(
            sliced.map((i) => {
              return i['4. close'];
            })
          );
          const reversed = closingValues.reverse();
          setClosingPrice(reversed);
        }
      }
    } catch (err) {
      console.log(err);
    }

    setDailyPrices([]);
    setWeeklyPrices([]);
    setIntraPrices([]);
  };

  const onSuggestHandler = (text) => {
    setTextInput(text);
    setAllSymbol([]);
  };

  return (
    <StyledSearch>
      <div className='wrapper'>
        <h1>Stock Tracker </h1>
        <form onSubmit={showData} className='search-form'>
          <div className='input-wrapper'>
            <input
              type='text'
              value={textInput}
              onChange={inputHandler}
              placeholder='Enter Stock Symbol (GOOG, MSFT, TSLA)'
            />
            <ul>
              {allSymbol.length > 0 &&
                allSymbol.map((sym, i) => (
                  <li
                    key={i}
                    className='suggestions'
                    onClick={() => onSuggestHandler(sym)}
                  >
                    {sym}
                  </li>
                ))}
            </ul>
          </div>
          <button type='submit'>Search</button>
        </form>
      </div>

      {prices.length > 0 && (
        <>
          <Table
            prices={prices}
            symbol={symbol}
            closingPrice={closingPrice}
            xAxisValues={xAxisValues}
          />
          <TimeFrames
            symbol={symbol}
            textInput={textInput}
            weeklyPrices={weeklyPrices}
            setWeeklyPrices={setWeeklyPrices}
            dailyPrices={dailyPrices}
            setDailyPrices={setDailyPrices}
            intraPrices={intraPrices}
            setIntraPrices={setIntraPrices}
          />
        </>
      )}
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 20px auto;
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
    h1 {
      align-self: flex-start;
    }
    @media (max-width: 1023px) {
      flex-direction: column;
      margin-bottom: 10px;
    }
  }
  .search-form {
    max-width: 500px;
    width: 100%;
    display: flex;
    justify-content: center;
    .input-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    input {
      border: 1px solid lightgray;
      background: transparent;
      padding: 5px 0px 5px 5px;
      width: 100%;
      height: 100%;
      outline: none;
      color: white;
      font-family: 'Lato', sans-serif;
    }

    button {
      height: 100%;
    }
    ul {
      z-index: 100;
    }
    .suggestions {
      background: #5bc09e;
      color: white;
      padding: 5px;
      list-style-type: none;
      z-index: 100;
      cursor: pointer;
      &:hover {
        background: #7fffd4ba;
      }
    }

    @media (max-width: 1023px) {
      margin: 50px auto;
    }
  }
  @media (hover: hover) {
    button:hover {
      background: lightgray;
      color: black;
    }
  }
`;

export default Search;
