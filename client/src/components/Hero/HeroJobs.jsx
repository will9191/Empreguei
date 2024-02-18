import React from 'react';
import './hero.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import photo from '../../assets/21.svg';
import styled from 'styled-components';

const HeroJobs = () => {
  return (
    <HeroBanner>
      <HeroBannerLeft>
        <div className='search'>
          <HeroH1>
            Encontre oportunidades incríveis! <br />
            no Empreguei e avançe <br />
            profissionalmente
          </HeroH1>
          <div className='input-field-search'>
            <input type='text' placeholder='Cargo | Empresa | Local' />
            <button className='search-job'>Buscar</button>
          </div>
        </div>
      </HeroBannerLeft>
      <HeroBannerRight>
        <HeroImg src={photo} alt='banner' />
      </HeroBannerRight>
    </HeroBanner>
  );
};

export default HeroJobs;

const HeroBanner = styled.section`
  background-color: var(--lightNavyBlue);
  display: flex;
  align-items: center;
  height: 88vh;
  justify-content: space-evenly;
  width: 100%;
  margin: 0;
  padding: 0;
   @media (min-width: 768px) {
        width: auto;
      }
`;

const HeroBannerLeft = styled.div`
  @media (max-width: 768px) {
       width: 80%;
      }
`;

const HeroBannerRight = styled.div`
   @media (max-width: 768px) {
       display: none;
      }
`;

const HeroImg = styled.img`
  width: 700px;
 
`;

const HeroH1 = styled.h1`
  font-size: 40px;
  color: var(--white);
  text-align: center;
`;
