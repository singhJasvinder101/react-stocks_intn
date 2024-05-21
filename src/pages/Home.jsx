import React from 'react'
import Search from '../components/Search'
import styled from 'styled-components';

const home = () => {
    return (
        <StyledHome>
            <Search />
        </StyledHome>
    )
}

const StyledHome = styled.div ` 
width:100%;
height:100%;
display: flex;
padding: 0px 20px;

`


export default home
