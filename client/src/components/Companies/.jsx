import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Companies from './Companies';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import blue from '../../assets/blue.svg';
import axios from 'axios';
import { Grid, CircularProgress } from '@mui/material';
import Search from './Search';

const ShowCompanies = () => {
  const [currentId, setCurrentId] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const loadingRef = useRef(null);

  const [currentPage, setCurrentPage] = useState();
  const [numberOfPages, setNumberOfPages] = useState();

  let params = new URL(document.location).searchParams;
  let q = params.get('q');
  let location = params.get('location');
  const [page, setPage] = useState(parseInt(params.get('page')));
  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchCompanies();
  }, [q, location, page]);

  /*   useEffect(() => {
    fetchJobs();
  }, [query]);
 */
  const fetchCompanies = async () => {
    const response = await axios.get(
      `${url}/company/search?q=${q}&location=${location}&page=${page}`
    );
    /*     const response = await axios.get(`${url}/jobs/search${query}`); */
    const newCompanies = response.data.data;
    const current = response.data.currentPage;
    const number = response.data.numberOfPages;

    console.log(current);
    setData((data) => [...data, ...newCompanies]);
    setCurrentPage(current);
    setNumberOfPages(number);
    setLoading(false);
    setIsInitialCall(false);
  };

  useEffect(() => {
    if (!loadingRef.current) return;

    const loading = loadingRef.current;

    const loadingObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isInitialCall &&
          currentPage <= numberOfPages
        ) {
          setPage((page) => page + 1);
        }
      },
      { threshold: 1 }
    );

    loadingObserver.observe(loading);
    return () => {
      if (loading) loadingObserver.unobserve(loading);
    };
  }, [data, q, location, page]);

  console.log(data);
  console.log(currentPage);
  console.log(numberOfPages);

  return (
    <>
      <Search />

      {loading ? (
        <LoadingPage>
          {' '}
          <CircularProgress />
        </LoadingPage>
      ) : (
        <>
          <Companies setCurrentId={setCurrentId} data={data} />
          <div ref={loadingRef}></div>
        </>
      )}
    </>
  );
};

export default ShowCompanies;

const LoadingPage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
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
  @media (max-width: 768px) {
    font-size: 30px;
  }
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
  text-transform: uppercase;
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

const StyledImg = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;

const StyledShowCompany = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledTitle = styled.p`
  color: #00297a;
  font-size: 35px;
  text-align: left;
  padding: 0px 0px 50px 0px;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 25px;
  }
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
  @media (max-width: 768px) {
    display: none;
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
  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.p`
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
