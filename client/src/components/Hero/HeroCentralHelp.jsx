import Central from "../../assets/CentralAjuda.png";
import { current } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PopUp1 from "../PopUp/PopUpFirst";
import PopUp2 from "../PopUp/PopUpSecond";
import PopUp3 from "../PopUp/PopUpThird";
import PopUp4 from "../PopUp/PopUpFourth";
import PopUp5 from "../PopUp/PopUpFifth";

const HeroCentralHelp = () => {
  return (
    <HeroContainer>
      <HeroTitle>CENTRAL DE AJUDA</HeroTitle>
      <HeroContent>
        <Left>
          <HeroImg src={Central} />
        </Left>
        <Right>
          <PopUp1 />
          <PopUp2 />
          <PopUp3 />
          <PopUp4 />
          <PopUp5 />
        </Right>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroCentralHelp;

const Left = styled.div``;

const Button = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  display: block;
  margin: 100px auto 0;
  font-size: 18px;
`;

const Right = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HeroContainer = styled.div`
  background-size: 100%;
  background-color: #e8e8e8;
  justify-content: center;
  padding: 40px 0px 100px 0px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const HeroContent = styled.section`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  color: black;
  text-transform: uppercase;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 40px;
  letter-spacing: -0.015em;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const HeroImg = styled.img`
  width: 500px;
  height: 500px;
`;
