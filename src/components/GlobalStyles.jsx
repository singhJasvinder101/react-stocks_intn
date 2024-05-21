import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 

:root {
    --neon: #b5f5ff;
}

* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}

body {
    height:100vh;
    width:100%;
    background: black;
    font-family: 'Lato', sans-serif;
    overflow-x:hidden;
    
}

body::-webkit-scrollbar {
  width: 0.5rem;
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px #242424;
}
 
body::-webkit-scrollbar-thumb {
  background-color: #77ebeb57;
}

h1,h2, h3, h4,h5, h6 {
    color:white;
}


h1 {
    font-size: 2rem;
    @media(max-width:768px) {
        font-size: 1.6rem;
    }
}

h2 {
    font-size: 1.8rem;
}

h3 {
    margin: 40px 0px 15px;
    font-size: 1.4rem;
    position: relative;
   
    &:before {
      content: '';
      position: absolute;
      bottom: -5%;
      left: 30%;
      background: #06817bb0;
      width: 40%;
      height: 30px;
      z-index: -1;
      transform: skew(-10deg, -1deg);
    }
  }

h4 {
    margin: 5px auto;
}

button {
        margin: 0px 5px;
        padding: 10px 0px;
        width: 100px;
        cursor: pointer;
        background: transparent;
        border: 1px solid lightgray;
        color: lightgray;
        font-family: 'Lato', sans-serif;
        font-weight: 600;
        text-transform: capitalize;
        -webkit-tap-highlight-color: transparent;
      
}

table {
    max-width: 700px;
    width:100%;
    margin: 20px auto;
    width:100%;
    color:#adadad;
    th {
        background: #1a1a1a;
        height: 30px;
    }
    tbody {
        text-align: center;
        
    }
    td {
        padding: 8px 0px;
    }
    tr:nth-child(even) {
    background-color: #36363640;
}
    tr:nth-child(odd) {
    background-color: #27232336;
}
}

.bar {
    padding-bottom: 30px;
}

.form-timeframe {
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 700px;
    width:100%;
    .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input[type="radio"] {
        width:fit-content;
        margin: 0px 10px 0px 0px;
        background: white;
    }
    label {
        color: white;
        margin-right: 45px;
    }
   
  
}

@media (max-width: 768px) {
        .form-timeframe {
            .input-wrapper {
                margin-left: 15px;
            }

            input {
            margin: 0px 10px 0px 0px;
            }

            label {
                margin-right: 20px;
            }
        }
    }



`;

export default GlobalStyles;
