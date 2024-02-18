import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Go from 'react-icons/go';
import * as Vsc from 'react-icons/vsc';
import Plano1 from '../Plans/Plano1';
import { useNavigate } from 'react-router-dom';
import * as Ci from 'react-icons/ci';
import PopUpPlans from '../PopUpPlans';

const HeroPlans = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    const getPlans = async () => {
      const response = await fetch('../src/app/plans.json');
      const data = await response.json();
      setPlans(data);
    };
    getPlans();
  }, []);

  return (
    <HeroBanner>
      <HeroH1>Planos do Empreguei</HeroH1>
      <HeroH2>Esses planos darão maior visibilidade à sua Empresa</HeroH2>
      <Plans>
        {plans.length ? (
          plans.map((plan, index) => (
            <>
              <Plan key={index}>
                <PlanTitle>{plan.title}</PlanTitle>
                <>
                  {plan.benefits?.map((item) => (
                    <PlanSubTitle>
                      {' '}
                      {item.icon === false ? (
                        <Vsc.VscError />
                      ) : (
                        <Go.GoCheckCircle />
                      )}
                      <PlanText>{item.benefit}</PlanText>
                    </PlanSubTitle>
                  ))}
                </>
                <Price>{plan.price}</Price>

                {plan.atual === true ? (
                  <PlanAtual>{plan.texto}</PlanAtual>
                ) : (
                  <PlanButton>{plan.show}</PlanButton>
                )}
              </Plan>
            </>
          ))
        ) : (
          <div>Nenhum plano encontrado</div>
        )}
      </Plans>
    </HeroBanner>
  );
};

export default HeroPlans;

const HeroBanner = styled.section`
  background-color: var(--lightNavyBlue);
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const HeroH1 = styled.h1`
  text-transform: uppercase;
  color: white;
  font-size: 40px;
  padding: 30px 0px 0px 0px;
  font-weight: 400;
`;

const HeroH2 = styled.h2`
  color: white;
  text-transform: uppercase;
  font-size: 20px;
  padding: 30px 0px;
  font-weight: 400;
`;

const Plans = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const Plan = styled.div`
  background-color: var(--gray);
  padding: 20px;
  box-shadow: 0px 0px 5px 0px #00000040;
  margin: 0px 20px 50px 20px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.1);
    background-color: #d3d3d3;
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
  font-size: 15px;
`;

const Price = styled.p`
  color: #7895cd;
  font-size: 20px;
  padding-top: 10px;
`;

const PlanAtual = styled.div`
  margin-top: 20px;
  text-transform: uppercase;
  font-size: 20px;
  color: #00297a;
  transition: 0.5s ease;
  &:hover {
    transition: 0.5s ease;
    scale: 1.05;
  }
`;

const PlanButton = styled.button`
  color: white;
  background-color: #00297a;
  border-radius: 50px;
  text-transform: uppercase;
  box-shadow: 0px 0px 5px 5px #00000040;
  outline: none;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  transition: 0.5s ease;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
    scale: 1.05;
  }
`;
