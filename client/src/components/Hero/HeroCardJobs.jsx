import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useState } from 'react';

const HeroCardJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLeft = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.offsetWidth;
  };

  const HandleRight = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.offsetWidth;
  };

  const carousel = useRef(null);

  return (
    <StyledShowCompany>
      <ButtonLeft alt='Scroll Left' onClick={HandleLeft}>
        <IconButton>
          <AiOutlineLeft />
        </IconButton>
      </ButtonLeft>
      <Cards ref={carousel}></Cards>
      <ButtonRight alt='Scroll Right' onClick={HandleRight}>
        <IconButton>
          <AiOutlineRight />
        </IconButton>
      </ButtonRight>
    </StyledShowCompany>
  );
};
export default HeroCardJobs;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
`;

const StyledShowCompany = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledName = styled.p`
  padding: 7px 0px 7px 0px;
`;

const ButtonLeft = styled.button`
  background: #ff731d;
  border: none;
  color: white;
  border-radius: 50px;
  width: 70px;
  height: 70px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.1);
    background: #00297a;
    color: white;
  }
`;

const ButtonRight = styled.button`
  background: #ff731d;
  border: none;
  color: white;
  border-radius: 50px;
  width: 70px;
  height: 70px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.1);
    background: #00297a;
    color: white;
  }
`;

const IconButton = styled.p`
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cards = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Card = styled.div``;
