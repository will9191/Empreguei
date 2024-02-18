import React from 'react'
import styled from 'styled-components'

import HeroCardOpportunities from './HeroCardOpportunities'


const HeroOpportunities = () => {
  return (
    <HeroContainer>
        <HeroH1>Oportunidades em destaque</HeroH1>
        
        <HeroCardOpportunities/>
    </HeroContainer>
  )
}

export default HeroOpportunities

const HeroContainer = styled.div`
background-color: #dddcdc;
padding: 100px;
@media (max-width: 768px) {  
        width: auto;
    }
`

const HeroH1 = styled.h1`
text-transform: uppercase;
text-align: center;
font-size: 50px;

`