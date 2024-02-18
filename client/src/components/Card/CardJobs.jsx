import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../../redux/companyRelated/companyHandle';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const CardJobs = ({ cargo, imagem }) => {
  return (
    <StyledCompany>
      <StyledImg src={imagem} alt='logo' />
      <StyledNameCompany>{cargo}</StyledNameCompany>
    </StyledCompany>
  );
};
export default CardJobs;

const StyledCompany = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 272px;
  height: 134px;
  box-shadow: 5px 5px 5px #00297a;
  border-radius: 25px;
  border: none;
  margin: 20px;
  &:hover {
    transform: scale(1.1);
    transition: 0.5s ease-in-out;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25), 5px 5px 5px 0px #00297a;
  }
  transition: 0.5s ease-in-out;
  cursor: pointer;
`;

const Cards = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

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

const StyledNameCompany = styled.p`
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
