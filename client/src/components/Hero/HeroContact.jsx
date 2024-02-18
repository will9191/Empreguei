import React from 'react';
import styled from 'styled-components';
import contact from '../../assets/contact.png';
import { Link } from 'react-router-dom';
import * as Bs from 'react-icons/bs';
import * as Bi from 'react-icons/bi';
import { Route, Routes } from 'react-router-dom';
import Help from '../Help/Help';

const HeroContact = () => {
  return (
    <HeroContainer>
      <HeroH1>ENTRE EM CONTATO CONOSCO</HeroH1>
      <HeroContent>
        <Routes>
          <Route path='/help' element={<Help />} />
        </Routes>
        <HeroImg src={contact} />
        <HeroPrin>
          <HeroText>E-MAIL: contato.empreguei@gmail.com</HeroText>
          <Menu>
            <MediaLink
              to='https://www.instagram.com/empreguei.br/'
              target='_blank'
            >
              <Bi.BiLogoFacebook />
            </MediaLink>
            <MediaLink
              to='https://www.instagram.com/empreguei_oficial/?hl=en'
              target='_blank'
            >
              <Bs.BsInstagram />
            </MediaLink>
            <MediaLink
              to='https://www.linkedin.com/company/empreguei.com.br/'
              target='_blank'
            >
              <Bi.BiLogoLinkedin />
            </MediaLink>
          </Menu>

          <HeroText2>
            Ou esclareça suas dúvidas <Span to='/help'>aqui</Span>{' '}
          </HeroText2>
        </HeroPrin>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroContact;

const HeroContainer = styled.section`
  background: #00297a;
  color: white;

  align-items: center;
  @media (min-width: 768px) {
    width: auto;
  }
`;

const HeroH1 = styled.h1`
  font-size: 40px;
  line-height: 95px;
  text-align: center;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const HeroImg = styled.img`
  margin-right: 10rem;
  width: 583.97px;
  height: 611.2px;
  @media (max-width: 768px) {
    opacity: 0.5;
    width: 300px;
    height: 300px;
    margin-right: 30rem;
  }
`;

const HeroText = styled.p`
  text-align: center;
  font-weight: 300;
  font-size: 30px;
`;

const HeroPrin = styled.div`
  flex-direction: row;
  @media (max-width: 768px) {
    position: absolute;
  }
`;

const Menu = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
`;

const MediaLink = styled(Link)`
  background-color: black;
  color: white;
  font-size: 30px;
  padding: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0px 20px;
  text-decoration: none;
  text-decoration-line: none;
  list-style: none;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: white;
    color: black;
    transform: scale(1.1);
    transition: 0.5s ease-in-out;
  }
`;

const HeroText2 = styled.div`
  margin-top: 2rem;
  text-align: center;
  justify-content: center;
`;

const Span = styled(Link)`
  color: gray;
`;
