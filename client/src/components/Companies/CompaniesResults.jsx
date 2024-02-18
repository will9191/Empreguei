import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Companies from './Companies';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import blue from '../../assets/blue.svg';
import axios from 'axios';
import { Grid, CircularProgress } from '@mui/material';
import Search from './Search';

const CompaniesResult = () => {
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

  /*   const query = useLocation().search;

  console.log(query); */

  console.log(page);

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
    const newJobs = response.data.data;
    const current = response.data.currentPage;
    const number = response.data.numberOfPages;

    console.log(current);
    setData((data) => [...data, ...newJobs]);
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
          {q || location ? (
            <>
              <Companies data={data} />
              <div ref={loadingRef}></div>
            </>
          ) : (
            <>Nenhuma trabalho foi pesquisado!</>
          )}
        </>
      )}
    </>
  );
};
export default CompaniesResult;

/* const Search = styled.div`
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
 */
const LoadingPage = styled.section`
  height: 100vh;
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
