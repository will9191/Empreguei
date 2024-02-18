import React from "react";
import photo from "../../assets/22.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";


const HeroPostJob = () => {
  return (
    <HeroBanner>
      <HeroBannerLeft>
        <Search>
          <HeroH1>
            Poste sua vaga no Empreguei e atraia candidatos qualificados para
            preenchê-la.
          </HeroH1>
          <PostBtn>Publique aqui</PostBtn>
        </Search>
      </HeroBannerLeft>
      <HeroBannerRight>
        <HeroImg src={photo} alt="banner" />
      </HeroBannerRight>
    </HeroBanner>
  );
};

export default HeroPostJob;

const HeroBanner = styled.section`
  background: var(--lightNavyBlue);
  display: flex;
  align-items: center;
  height: 88vh;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  width: 100%;

 
`;

const HeroBannerLeft = styled.div``;

const HeroBannerRight = styled.div``;

const HeroImg = styled.img`
  width: 700px;
  
`;

const HeroH1 = styled.h1`
  font-size: 40px;
  color: var(--white);
  text-align: center;
  max-width: 800px;
`;

const PostBtn = styled.button`
  max-width: fit-content;
  padding: 15px 50px;
  border-radius: 100px;
  background-color: var(--white);
  color: var(--lightNavyBlue);
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  font-size: 25px;
  transition: 0.5s ease-in-out;
  box-shadow: none;
  border: none;
  text-align: center;
  margin-top: 20px;
  font-weight: 300;
`;

const Search = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;