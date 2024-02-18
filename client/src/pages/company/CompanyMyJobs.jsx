import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyJobs } from '../../redux/jobRelated/jobHandle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import blue from '../../assets/blue.svg';
import HeroLifes from '../../components/Hero/HeroLifes';
import * as Ci from 'react-icons/ci';
import * as Io from 'react-icons/io';
import { CircularProgress } from '@mui/material';
import Jobs from '../../components/Jobs/Jobs';
import axios from 'axios';
import { useRef } from 'react';

const CompanyMyJobs = () => {
  const [currentId, setCurrentId] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const id = currentUser._id;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(null);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [numberOfPages, setNumberOfPages] = useState();

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchJobs();
  }, [id, page]);

  const fetchJobs = async () => {
    const response = await axios.get(`${url}/company/jobs/${id}/?page=${page}`);
    const newJobs = response.data.data;
    const current = response.data.currentPage;
    const number = response.data.numberOfPages;

    console.log(current);
    setData((data) => [...data, ...newJobs]);
    console.log(newJobs);
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
        <CircularProgress />
      ) : (
        <Content>
          <ContentHero>
            <Field>
              <HeroH1>
                Olá, {currentUser.name}, veja abaixo suas vagas ou divulgue uma
                nova oportunidade
              </HeroH1>
              <PostBtn onClick={() => navigate('/company/my-jobs/new')}>
                Publique aqui
              </PostBtn>
            </Field>
          </ContentHero>

          <HeroH2>Suas Vagas:</HeroH2>
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
        </Content>
      )}{' '}
    </Container>
  );
};

export default CompanyMyJobs;

const Content = styled.div``;

const HeroH2 = styled.h2`
  text-transform: uppercase;
  text-align: left;
  margin: 0px 20px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const LoadingPage = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentHero = styled.div`
  @media (max-width: 768px) {
    width: auto;
  }
`;

const PostBtn = styled.button`
  max-width: fit-content;
  padding: 15px 50px;
  border-radius: 100px;
  background-color: var(--white);
  color: var(--lightNavyBlue);
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  font-size: 25px;
  transition: 0.5s ease-in-out;
  box-shadow: none;
  border: none;
  text-align: center;
  font-weight: 300;
  margin: 30px 0px;
  box-shadow: 5px 5px 5px 0px #ffffff40;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: var(--orange);
    color: white;
    transition: 0.5s ease-in-out;
  }
`;

const HeroH1 = styled.h1`
  font-size: 30px;
  color: var(--white);
  text-transform: uppercase;
  text-align: center;
  max-width: 900px;
  margin: 40px 0px 0px 0px;
  line-height: 40px;
`;

const StyledJobs = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledH1 = styled.h1`
  text-transform: uppercase;
  margin: 20px 0px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-direction: column;
`;

const MiddleLow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiddleHigh = styled.div`
  padding-bottom: 20px;
  font-size: 30px;
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  background: url(${blue});
  background-repeat: no-repeat;
  background-size: 100%;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Icon = styled.div`
  display: flex;
  margin-right: 0px;
  font-weight: 700;
  font-size: 40px;
  align-items: center;
`;

const StyledJob = styled.div`
  border-radius: 25px;
  background: #fff;
  box-shadow: 5px 5px 5px 0px #00297a;
  margin: 20px;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25), 5px 5px 5px 0px #00297a;
`;

const TopField = styled.div`
  display: flex;
  align-items: center;
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
  width: 530px;
  height: 47px;
  padding-left: 10px;
`;

const SeeCompany = styled.button`
  background: black;
  color: white;
  border-radius: 50px;
  padding: 20px 40px;
  position: absolute;
  right: 10rem;
  text-decoration: none;
  text-transform: uppercase;
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
