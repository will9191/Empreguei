import React from 'react'
import { useEffect, useState } from "react";    
import CardOpportunities from '../Card/CardOpportunities';
import styled from "styled-components";
import './hero.css'


const HeroCardOpportunities = () => {

    const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const buscarRepositorios = async () => {
      const response = await fetch("../src/app/opport.json");
      const data = await response.json();
      setRepositories(data);
    };
    buscarRepositorios();
  }, []);

  

    return (
        <Cards>
            {repositories.length > 1 ? (
                <CardSection>
                    {repositories.map((repo, index) => (
                        <CardOpportunities
                        key={index}
                            logoCard={repo.logo}
                            name={repo.name}
                            description={repo.desc}
                            loc={repo.loc}
                            hor={repo.hor}
                        />
                    ))}
                </CardSection>
            ) : (
                <HeroH1>Carregando repositórios...</HeroH1>
            )}
        </Cards>

    )
}

export default HeroCardOpportunities

const Cards = styled.div`
display: flex;
justify-content: center;

`;

const CardSection = styled.div`
    display: flex;
    @media (max-width: 768px) {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
   flex-direction: column;
  }
`;

const HeroH1 = styled.p``;