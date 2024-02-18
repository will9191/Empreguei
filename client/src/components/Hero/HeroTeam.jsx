import React from 'react';
import styled from 'styled-components';
import Lucas from '../../assets/admin/Lucas.jpeg';
import Will from '../../assets/admin/Will.jpg';
import Rafao from '../../assets/admin/rafao.jpeg';
import Gabi from '../../assets/admin/gabi.svg';

const HeroTeam = () => {
  return (
    <HeroContainer>
      <HeroH1>Nossa Equipe</HeroH1>
      <HeroContent>
        <Field>
          <HeroImg src={Gabi} />
          <HeroText>Gabriela Nicoleti</HeroText>
        </Field>
        <Field>
          <HeroImg src={Lucas} />
          <HeroText>Lucas Corrêa</HeroText>
        </Field>
        <Field>
          <HeroImg src={Rafao} />
          <HeroText>Rafael Furtado</HeroText>
        </Field>
        <Field>
          <HeroImg src={Will} />
          <HeroText>Willian Pereira</HeroText>
        </Field>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroTeam;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const HeroContainer = styled.section`
  background: #e8e8e8;
  color: black;
  padding: 40px 0px 70px 0px;
  @media (min-width: 768px) {
    width: auto;
  }
`;

const HeroH1 = styled.h1`
  font-size: 40px;
  text-align: center;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 7rem;
  @media (max-width: 768px) {
    width: auto;
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const HeroImg = styled.img`
  border-radius: 50%;
  width: 250px;
  height: 250px;
  background: #c4c4c4;
`;

const HeroText = styled.figcaption`
  align-items: baseline;
  display: flex;
  font-size: 25px;
  margin-top: 10px;
  @media (max-width: 768px) {
    justify-content: space-around;
    align-items: flex-end;
  }
`;
