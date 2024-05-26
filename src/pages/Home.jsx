import React, { useEffect } from 'react'
import Search from '../components/Search'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem("user");
        if (!isAuthenticated) {
            navigate("/login");
        } 
    }, [navigate]);

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
