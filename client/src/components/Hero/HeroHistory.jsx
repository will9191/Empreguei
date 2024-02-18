import React from 'react';
import styled from 'styled-components';
import NossaHistoria from '../../assets/logo.png';

const HeroHistory = () => {
  return (
    <HeroContainer>
      <HeroH1>Nossa História</HeroH1>
      <HeroContent>
        <HeroImg src={NossaHistoria} />
        <HeroText>
          O Empreguei surgiu em 2023 (definitivamente), porém, desde 2021 viemos
          moldando nosso conhecimento para esse projeto. Inicialmente, o mesmo
          seria apenas para um trabalho de conclusão de curso, mas, depois de
          começarmos a construí-lo, decidimos seguir a diante com essa ideia, a
          de melhorar a comunicação no meio de contratos, para uma sociedade
          melhor, com mais acessibilidade a trabalhos.
        </HeroText>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroHistory;

const HeroContainer = styled.section`
  background: white;
  color: black;
  align-items: center;
  padding: 100px;
  @media (min-width: 768px) {
    width: auto;
  }
`;

const HeroH1 = styled.h1`
  font-size: 40px;
  line-height: 95px;
  text-align: center;
  margin-bottom: 20px;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const HeroImg = styled.img`
  align-items: center;
  margin-right: 10rem;
  width: 300px;
  height: 450px;

  @media (max-width: 768px) {
    width: 200px;
    height: 350px;
    display: none;
  }
`;

const HeroText = styled.p`
  text-align: center;
  word-break: keep-all;
  text-align: justify;
  width: 900px;
  font-size: 40px;
`;
