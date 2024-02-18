import React from 'react';
import styled from 'styled-components';

import HeroCardCompanies from './HeroCardCompanies';

const HeroCompanies = () => {
  return (
    <HeroContainer>
      <HeroH1>As melhores empresas estão aqui</HeroH1>
      <HeroCardCompanies />
    </HeroContainer>
  );
};

export default HeroCompanies;

const HeroContainer = styled.section`
  background-color: #00247d;
  padding: 200px;
  @media (max-width: 768px) {  
        width: auto;
    }
`;

const HeroH1 = styled.h1`
  text-align: center;
  color: white;
  font-size: 40px;
  text-transform: uppercase;
`;
