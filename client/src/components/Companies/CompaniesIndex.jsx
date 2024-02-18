import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Companies from './Companies';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import blue from '../../assets/blue.svg';
import axios from 'axios';
import { Grid, CircularProgress } from '@mui/material';
import Search from './Search';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import * as Md from 'react-icons/md';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const CompaniesIndex = () => {
  const [currentId, setCurrentId] = useState(0);

  const navigate = useNavigate();

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
    const response = await axios.get(`${url}/company/search`);
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
    <Container>
      <Search />

      {loading ? (
        <LoadingPage>
          {' '}
          <CircularProgress />
        </LoadingPage>
      ) : (
        <>
          <H1>Empresas Populares no Empreguei</H1>
          <StyledCompanies>
            <Arrow id='swiper-back'>
              <Md.MdOutlineArrowBackIos />
            </Arrow>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation={{ nextEl: '#swiper-forward', prevEl: '#swiper-back' }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: {
                  slidesPerView: 4,
                },
              }}
              loop
              autoplay={{
                stopOnLastSlide: false,
              }}
            >
              {' '}
              {Array.isArray(data) ? (
                data?.map((company) => (
                  <SwiperSlide key={company._id}>
                    <StyledCompany
                      onClick={() =>
                        navigate('/companies/company/' + company._id)
                      }
                    >
                      <>
                        <StyledImg src={company.picture} alt='' />
                      </>
                    </StyledCompany>
                  </SwiperSlide>
                ))
              ) : (
                <> Nenhuma empresa encontrada! </>
              )}
            </Swiper>{' '}
            <Arrow id='swiper-forward'>
              <Md.MdOutlineArrowForwardIos />
            </Arrow>
          </StyledCompanies>
        </>
      )}
    </Container>
  );
};

export default CompaniesIndex;

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

const H1 = styled.h1`
  color: #00297a;
  text-align: left;
  padding-left: 40px;
  font-family: Comfortaa;
  font-size: 35px;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 700;
  margin-top: 200px;
  line-height: 72px; /* 205.714% */
  letter-spacing: -0.525px;
`;

const LoadingPage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCompanies = styled.div`
  display: flex;
  align-items: center;
  margin: 15px;
`;

const Arrow = styled.button`
  background: #ff731d;
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 80px;
  display: flex;
  color: white;
  border-radius: 50%;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #00297a;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 40px;
  }
`;

const StyledCompany = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 10px 50px 20px;
  padding: 20px 100px;
  box-shadow: 5px 5px 5px #00297a;
  border-radius: 25px;
  border: none;
  &:hover {
    transform: scale(1.1);
    transition: 0.5s ease-in-out;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25), 5px 5px 5px 0px #00297a;
  }
  transition: 0.5s ease-in-out;
  cursor: pointer;
`;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
`;
