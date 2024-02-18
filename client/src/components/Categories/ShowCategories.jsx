import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import blue from '../../assets/blue.svg';
import axios from 'axios';
import { Grid, CircularProgress } from '@mui/material';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
import * as Md from 'react-icons/md';
import Search from '../Jobs/Search';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ShowCategories = () => {
  const [currentId, setCurrentId] = useState(0);
  const swiper = useSwiper();

  const next = () => {
    swiper.slideNext();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const loadingRef = useRef(null);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(`${url}/category`);
    if (search) {
      navigate(`/jobs/search?search=${search}&page=${page}`);
    }
    const newCategories = response.data.categories;
    setData((data) => [...data, ...newCategories]);
    setLoading(false);
    setIsInitialCall(false);
  };

  console.log(data);

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
          {' '}
          <H1>Áreas Populares no Empreguei</H1>
          <StyledCategories>
            <Arrow id='swiper-back'>
              <Md.MdOutlineArrowBackIos />
            </Arrow>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={4}
              navigation={{ nextEl: '#swiper-forward', prevEl: '#swiper-back' }}
              pagination={{ clickable: true }}
              loop
              autoplay={{
                stopOnLastSlide: false,
              }}
            >
              {Array.isArray(data) ? (
                data?.map((item) => (
                  <SwiperSlide key={item._id}>
                    <StyledCategory
                      onClick={() =>
                        navigate('/categories/' + item._id + '/jobs')
                      }
                    >
                      <Content>
                        <StyledImg src={item.picture} alt={item.name} />
                        <Field>
                          <p>{item.name}</p>
                          
                        </Field>
                      </Content>
                    </StyledCategory>
                  </SwiperSlide>
                ))
              ) : (
                <> Nenhuma empresa encontrada! </>
              )}{' '}
            </Swiper>{' '}
            <Arrow id='swiper-forward'>
              <Md.MdOutlineArrowForwardIos />
            </Arrow>
          </StyledCategories>
        </>
      )}
    </Container>
  );
};

export default ShowCategories;
/* 
const Search = styled.div`
  margin-bottom: 250px;
  @media (max-width: 768px) {
    width: auto;
  }
`; */

const StyledCategories = styled.div`
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

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Field = styled.div`
  @media (max-width: 768px) {
    font-size: 10px;
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

const StyledCategory = styled.div`
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
  @media (max-width: 768px) {
  }
`;

const StyledImg = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 15px;
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;
