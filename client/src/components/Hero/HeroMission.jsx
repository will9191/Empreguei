import React from "react";
import styled from "styled-components";
import missao from "../../assets/NossaMissao.png";

const HeroMission = () => {
  return (
    <HeroContainer>
      <HeroH1>Nossa Missão</HeroH1>
      <HeroContent>
        <HeroImg src={missao} />
        <HeroText>
          O Empreguei tem como missão facilitar o encontro perfeito entre
          talentos e oportunidades profissionais. Somos guiados por uma visão de
          um futuro onde cada indivíduo encontra sua trajetória profissional
          ideal, nos dedicamos incansavelmente para criar um ecossistema digital
          que transcende as barreiras tradicionais do recrutamento.
        </HeroText>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroMission;

const HeroContainer = styled.section`
  background: #00297a;
  color: white;
padding-bottom: 70px;
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
  height: 200px;
  align-items: center;
  width: 546px;
  height: 478px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeroText = styled.div`
  text-align: justify;
  font-size: 30px;
  padding-right: 30px;
  padding-left: 25px;
  @media (max-width: 768px) {
    font-size: 35px;
  }
`;
