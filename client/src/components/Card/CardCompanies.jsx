import React from 'react';
import styled from 'styled-components';

const CardCompanies = ({ logoCom }) => {
  return (
    <CardContainer>
      <CardImg src={logoCom} />
    </CardContainer>
  )
}

export default CardCompanies

const CardContainer = styled.div`
    background-color: white;
    display: flex;
    cursor: pointer;
    margin: 20px;
    border: 2px solid black;
    border-radius: 40px;
    width: 325px;
    justify-content: center;
    transition: 0.5s ease-in-out;
    &:hover{
    transition: 0.5s ease-in-out;
    transform: scale(1.1);
  }
  @media (max-width: 768px) {  
        width: 250px;
    }
    
  
`

const CardImg = styled.img`
  height: 150px;
  padding: 20px;
`