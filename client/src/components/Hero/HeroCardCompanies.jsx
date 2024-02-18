import React from "react";
import { useEffect, useState } from "react";
import CardCompanies from "../Card/CardCompanies";
import styled from "styled-components";

const HeroCardCompanies = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const buscarRepositorios = async () => {
      const response = await fetch("../src/app/companies.json");
      const data = await response.json();
      setRepositories(data);
    };
    buscarRepositorios();
  }, []);

  return (
    <div className="cards">
      {repositories.length ? (
        <Cards>
          {repositories.map((repo, index) => (
            <CardCompanies
              key={index}
              logoCom={repo.logoCom}
              name={repo.name}
              desc={repo.desc}
              loc={repo.loc}
              area={repo.area}
            />
          ))}
        </Cards>
      ) : (
        <p>Nenhum repositório encontrado...</p>
      )}
    </div>
  );
};

export default HeroCardCompanies;

const Cards = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
