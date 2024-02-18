import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

const HeroEmpreguei = () => {
  return (
    <HeroContainer>
      <HeroH1>O EMPREGUEI</HeroH1>
      <Content>
        <LogoDiv>
          <Logo src={logo} />
        </LogoDiv>
        <Text>
          • Plataforma de emprego gratuita, somente as empresas contratam nossos
          planos paramelhorarem seus processos seletivos. <br />
          • Vagas de emprego para todos os perfis. <br />• Estamos em todo o
          Brasil, com oportunidades para diversas áreas. <br />• Facilidade para
          o primeiro emprego.
        </Text>
      </Content>
    </HeroContainer>
  );
};

export default HeroEmpreguei;

const HeroContainer = styled.section`
  margin-top: 20px;
`;

const HeroH1 = styled.h1`
  text-align: center;
  color: black;
  font-size: 40px;
  margin-bottom: 50px;
  text-transform: uppercase;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const LogoDiv = styled.div`
  display: flex;
  width: 950px;
  margin-left: 100px;
`;

const Logo = styled.img`
  width: 270px;
  height: 447px;
`;

const Text = styled.div`
  width: 100vw;
  font-size: 30px;
  line-height: 50px;
`;
