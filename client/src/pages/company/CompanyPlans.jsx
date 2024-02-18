import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Go from "react-icons/go";
import * as Vsc from "react-icons/vsc";
import { current } from "@reduxjs/toolkit";

const CompanyPlans = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <HeroBanner>
      <NameField>{currentUser.name}</NameField>
      <Plans>
        <Plan>
          <PlanTitle>Simples</PlanTitle>
          <PlanSubTitle>
            <Go.GoCheckCircle /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Go.GoCheckCircle /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <Price>R$ 00,00</Price>
          <PlanButton>Plano atual</PlanButton>
        </Plan>
        <Plan>
          <PlanTitle>Intermediário</PlanTitle>
          <PlanSubTitle>
            <Go.GoCheckCircle /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Go.GoCheckCircle /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <Price>R$ 10,00</Price>
          <PlanButton>Assinar plano</PlanButton>
        </Plan>
        <Plan>
          <PlanTitle>Avançado</PlanTitle>
          <PlanSubTitle>
            <Go.GoCheckCircle /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Go.GoCheckCircle /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <PlanSubTitle>
            <Vsc.VscError /> <PlanText> Plano Atual</PlanText>
          </PlanSubTitle>
          <Price>R$ 20,00</Price>
          <PlanButton>Assinar plano</PlanButton>
        </Plan>
      </Plans>
    </HeroBanner>
  );
};

export default CompanyPlans;

const HeroBanner = styled.section`
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0;

`;

const NameField = styled.p`
  font-size: 45px;
  display: flex;
  flex-direction: left;
  margin-left: 20px;
  margin-top: 20px;
`;

const Plans = styled.div`
  margin-top: 10vh;
  cursor: pointer;
  display: flex;
  float: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: grid;
  }
`;

const Plan = styled.div`
  background-color: var(--gray);
  padding: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  margin: 0px 20px 50px 20px;
  transition: 0.5s ease-in-out;
  &:hover{
    transition: 0.5s ease-in-out;
    transform: scale(1.1);
    background-color: #D3D3D3;
  }
`;

const PlanTitle = styled.h1`
  color: #6b84b7;
  font-weight: 700;
  font-size: 30px;
  text-transform: uppercase;
  padding-bottom: 20px;
`;

const PlanSubTitle = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  text-align: center;
  justify-content: center;
  line-height: 25px;
  font-size: 30px;
`;

const PlanText = styled.p`
  text-transform: uppercase;
  padding-left: 5px;
  font-size: 18px;
`;

const Price = styled.p`
  color: #7895cd;
  font-size: 20px;
  padding-top: 10px;
`;

const PlanButton = styled.button`
  color: white;
  background-color: #00297a;
  border-radius: 50px;
  text-transform: uppercase;
  box-shadow: 0px 0px 5px 5px #00000040;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  transition: 0.5s ease-in-out;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;
