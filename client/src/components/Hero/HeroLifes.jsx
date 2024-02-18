import React from "react";
import styled from "styled-components";
import img from "../../assets/equipe.png";
import blue from "../../assets/blue.svg";

const HeroLifes = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Oportunidades que transformam vidas</HeroTitle>
        <HeroImg src={img} />
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroLifes;

const HeroContainer = styled.div`
  display: flex;
  background: url(${blue});
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const HeroContent = styled.section`
  display: flex;
  text-align: center;
  flex-direction: column;
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 48px;
  font-weight: 700;
  line-height: 72px;
  text-align: center;
  padding-top: 50px;
`;

const HeroImg = styled.img`
  height: 650px;
  @media (max-width: 768px) {
    height: 550px;
    width: 635px;
  }
`;
