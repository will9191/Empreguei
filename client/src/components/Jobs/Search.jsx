import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Jobs from './Jobs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import blue from '../../assets/blue.svg';
import axios from 'axios';
import { Grid, CircularProgress } from '@mui/material';
import JobsResults from './JobsResults';
import { Link } from 'react-router-dom';

const Search = () => {
  const [currentId, setCurrentId] = useState(0);

  const navigate = useNavigate();

  const [q, setQ] = useState('') || '';
  const [location, setLocation] = useState('') || '';
  const [page, setPage] = useState(1);

  const searchJobs = async (e) => {
    e.preventDefault();
    navigate(`/jobs/search?q=${q}&location=${location}&page=${page}`, {
      replace: true,
    });
    window.location.reload(true);
  };

  return (
    <>
      <Container currentId={currentId}>
        <HeroTitle>VEJA ALGUMAS VAGAS DO NOSSO SITE</HeroTitle>
        <SearchField onSubmit={searchJobs}>
          <SearchInput
            placeholder='CARGO OU PALAVRA-CHAVE'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            name='search'
            autoComplete='off'
          />
          <Bar></Bar>
          <SearchInput
            placeholder='LOCALIDADE'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            name='search'
            autoComplete='off'
          />

          <SearchButton type='submit'>Buscar</SearchButton>
        </SearchField>
      </Container>
    </>
  );
};
export default Search;

const Container = styled.div`
  display: flex;
  background: url(${blue});
  background-repeat: no-repeat;
  background-size: 100%;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Bar = styled.div`
  border: 2px solid #00297a;
`;

const HeroTitle = styled.h1`
  color: white;
  text-transform: uppercase;
  font-size: 48px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.015em;
  text-align: center;
  padding-top: 50px;
`;

const SearchField = styled.form`
  display: flex;
  border-radius: 80px;
  background: #e8e8e8;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  margin-left: 100px;
  margin-right: 100px;
  max-width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  border-radius: 80px;
  background: inherit;
  color: #00297a;
  width: 100%;
  text-align: center;
  &::placeholder {
    color: #00297a;
  }
  @media (max-width: 768px) {
    font-size: 19px;
  }
`;

const SearchButton = styled.button`
  color: white;
  border-radius: 80px;
  text-transform: uppercase;
  background: #00297a;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  border: none;
  padding: 15px 45px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
