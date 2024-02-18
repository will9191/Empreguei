import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled, { keyframes } from "styled-components";
import home from "../assets/homeimg2.png";
import { BlueButton } from "../components/buttonStyles";
import logo from "../assets/logo.png";

const Homepage = () => {
  return (
    <StyledContainer>
      <StyledLogo src={logo} />

      <StyledImg src={home} />

      <Right>
        <StyledTitle>Bem-vindo ao Empreguei</StyledTitle>
        <StyledText>
          Uma empresa criada para para procura e contratações de empregos,
          <br />
          fazendo com que pessoas possam encontrar as oportunidades de forma
          <br /> 
          fácil e direcionada e que empresas divulguem suas contratações com 
          <br />
          maior visibilidade, atraindo candidatos filtrados e se conectando
          <br />
          facilmente com os mesmos.
        </StyledText>
        <StyledBox>
          <StyledLink to="/login">
            <BlueButton variant="contained" fullWidth>
              Entrar
            </BlueButton>
          </StyledLink>

          <StyledText>
            Não tem uma conta?{" "}
            <Link to="/choose" style={{ color: "#00247d" }}>
              Cadastrar
            </Link>
          </StyledText>
        </StyledBox>
      </Right>
    </StyledContainer>
  );
};

export default Homepage;

const floater = keyframes`
0% {

  transform: translatey(0px);
}
50% {
 
  transform: translatey(-20px);
}
100% {
  transform: translatey(0px);
}
`;

const StyledContainer = styled.div`
  display: flex;
  background-color: #f0f0f0;
  align-items: center;
  height: 100vh;
  justify-content: space-around;
`;

const StyledLogo = styled.img`
  position: absolute;
  top: 15px;
  width: 48.27px;
  height: 80px;
`;

const StyledBox = styled(Box)`
  align-items: center;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
`;

const StyledText = styled.p`
  /* color: #550080; */
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 20px;
  letter-spacing: normal;
  line-height: normal;
  font-size: 20px;
  
`;

const StyledImg = styled.img`
  animation: ${floater} 8s linear infinite;
  width: 80vh;
  @media (max-width: 768px) {  
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  max-width: 100%;
  &:hover{
    transition: 0.5s ease-in-out;
    color: #ff5e3c;
  }
 
`;

const Right = styled.div`
    @media (max-width: 768px) {  
        margin-top: 5.5rem;
    }
`;
