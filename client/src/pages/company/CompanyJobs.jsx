import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import * as Ci from 'react-icons/ci';
import * as Io from 'react-icons/io';
import { getCompanyJobs } from '../../redux/companyRelated/companyHandle';
import Jobs from '../../components/Jobs/Jobs';
import { useRef } from 'react';
import axios from 'axios';

const CompanyJobs = () => {
  const [currentId, setCurrentId] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(null);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [numberOfPages, setNumberOfPages] = useState();
  const [company, setCompany] = useState([]);

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchJobs();
  }, [id, page]);

  const fetchJobs = async () => {
    const response = await axios.get(`${url}/company/jobs/${id}/?page=${page}`);
    const newJobs = response.data.data;
    const company = response.data.company;
    const current = response.data.currentPage;
    const number = response.data.numberOfPages;

    console.log(current);
    setData((data) => [...data, ...newJobs]);
    setCompany(company);
    setCurrentPage(current);
    setNumberOfPages(number);
    setIsInitialCall(false);
    setLoading(false);
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
  }, [data, id, page]);

  console.log(data);

  return (
    <Container currentId={currentId}>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <TopField>
            <UserPic src={company ? company.picture : 'picture'} />
            <NameField>{company ? company.name : 'name'}</NameField>
            <SeeCompany onClick={() => navigate('/Companies/Company/' + id)}>
              Ver Empresa
            </SeeCompany>
          </TopField>

          {loading ? (
            <LoadingPage>
              {' '}
              <CircularProgress />
            </LoadingPage>
          ) : (
            <>
              <Jobs setCurrentId={setCurrentId} data={data} />
              <div ref={loadingRef}></div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default CompanyJobs;

const StyledH1 = styled.h1`
  text-transform: uppercase;
  margin: 20px 0px;
`;

const LoadingPage = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: var(--gray);
`;

const TopField = styled.div`
  display: flex;
  padding: 2rem 4rem;
  align-items: center;
  @media (max-width: 768px) {
    text-align: center;
    flex-direction: column;
    display: flex;
  }
`;

const UserPic = styled.img`
  height: 112px;
  width: 108px;
  border-radius: 50%;
  border: 1px solid black;
`;

const NameField = styled.p`
  font-size: 50px;
  font-weight: 700;
  height: 47px;
  padding-left: 10px;
`;

const SeeCompany = styled.button`
  cursor: pointer;
  transition: 0.5s ease-in-out;
  background: black;
  color: white;
  border-radius: 50px;
  padding: 20px 40px;
  position: absolute;
  right: 10rem;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    right: 0rem;
    margin-top: 5rem;
    position: static;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px 5px 10px;
  border-bottom: 1px solid black;
  font-size: 35px;
`;

const Middle = styled.div`
  padding: 10px 10px;
`;

const Bottom = styled.div`
  text-align: center;
  padding: 12px 22px;
  border-top: 1px solid black;
  color: #000;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 60% */
  letter-spacing: -0.6px;
  cursor: pointer;
`;

const ImgIcon = styled.img`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  border: 2px solid black;
  margin-right: 10px;
`;
