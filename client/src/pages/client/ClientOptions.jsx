import { current } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import "./ClientOptions.css";

const ClientOptions = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ContainerField>
      <NameField>
        Suas Preferências {/* {currentUser.firstName} {currentUser.lastName} */}
      </NameField>
      <TextTheme>Tema</TextTheme>
      <ContentField>
      <div class="wrapper">
        <input type="checkbox" name="checkbox" class="switch" />
      </div>


      <label class="label-visPerfil" for="visPerfil">Visibilidade de Perfil:</label>
      
      <select id="visPerfil" name="visPerfil" size="1" >
        <option  value="todos">Todos</option>
        <option  value="nsei">Não sei</option>
        <option  value="alguns">Alguns</option>
        <option  value="ngm">Ninguém</option>
      </select>

      <br /><br /><br /><br /><br />

      <label class="label-visPerfil" for="visPerfil">Visibilidade do Currículo:</label>
      
      <select id="visPerfil" name="visPerfil" size="1">
        <option  value="apenas">Apenas para os usuários cadastrados</option>
        <option  value="todos">Todos</option>
        <option  value="empresa">Empresa</option>
        <option  value="ngm">Ninguém</option>
      </select>
      </ContentField>
    </ContainerField>
  );
};

export default ClientOptions;

const ContainerField = styled.div`
margin:50px;
`;

const ContentField = styled.div`
  margin-left: 20px;
`;

const NameField = styled.div`
  font-size:40px;
`;

const TextTheme = styled.div`
  font-size:25px;
  margin: 20px;
`;

const off = keyframes`
0% {
  transform: translateX(80px);
  width: 46px;
}

50% {
  width: 75px;
  border-radius: 25px;
}

100% {
  transform: translateX(0px);
  width: 46px;
}
`;

const on = keyframes`
0% {
  transform: translateX(0px);
  width: 46px;
}

50% {
  width: 75px;
  border-radius: 25px;
}

100% {
  transform: translateX(80px);
  width: 46px;
}
`;

const sun = keyframes`
0% {
  transform: rotate(170deg);
  background-color: transparent;
  box-shadow: 5px -1px 0px #fff;
  filter: blur(0px);
}

50% {
  background-color: transparent;
  box-shadow: 5px -1px 0px #fff;
  filter: blur(0px);
}

90% {
  background-color: #f5daaa;
  box-shadow: 0px 0px 10px #f5deb4,
  0px 0px 20px #f5deb4,
  0px 0px 30px #f5deb4,
   inset 0px 0px 2px #efd3a3;
  filter: blur(1px);
}

100% {
  transform: rotate(0deg);
  background-color: #f5daaa;
  box-shadow: 0px 0px 10px #f5deb4,
  0px 0px 20px #f5deb4,
  0px 0px 30px #f5deb4,
  inset 0px 0px 2px #efd3a3;
  filter: blur(1px);
}
`;

const moon = keyframes`
0% {
  transform: rotate(0deg);
  filter: blur(1px);
}

50% {
  filter: blur(1px);
}

90% {
  background-color: transparent;
  box-shadow: 5px -1px 0px #fff;
  filter: blur(0px);
}

100% {
  transform: rotate(170deg);
  background-color: transparent;
  box-shadow: 5px -1px 0px #fff;
  filter: blur(0px);
}
`;

const Switch = styled.input.attrs({ type: "checkbox", name: "checkbox" })`
  position: relative;
  width: 130px;
  height: 50px;
  margin: 0px;
  margin-bottom: 25px;
  appearance: none;
  -webkit-appearance: none;
  background-color: rgb(4, 52, 73);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 25px;
  transition: 0.7s ease-in-out;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  &:checked {
    background-color: rgb(0, 195, 255);
    background-size: cover;
    transition: 1s ease-in-out;
    &:after {
      content: "";
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      left: 2px;
      top: 2px;
      transform: translateX(0px);
      animation: ${off} 0.7s forwards cubic-bezier(0.8, 0.5, 0.2, 1.4);
      box-shadow: inset 5px -5px 4px rgba(53, 53, 53, 0.3);
    }
    &:checked:after {
      animation: ${on} 0.7s forwards cubic-bezier(0.8, 0.5, 0.2, 1.4);
      box-shadow: inset -5px -5px 4px rgba(53, 53, 53, 0.3);
    }
    &:checked:before {
      content: "";
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      left: 15px;
      top: 5px;
      transform-origin: 53px 10px;
      background-color: transparent;
      box-shadow: 5px -1px 0px #fff;
      filter: blur(0px);
      animation: ${sun} 0.7s forwards ease;
    }
    &:before {
      content: "";
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      left: 15px;
      top: 5px;
      filter: blur(1px);
      background-color: #f5daaa;
      box-shadow: 0px 0px 10px #f5deb4, 0px 0px 20px #f5deb4,
        0px 0px 30px #f5deb4, inset 0px 0px 2px #efd3a3;
      transform-origin: 53px 10px;
      animation: ${moon} 0.7s forwards ease;
    }
  }
`;

const Label = styled.label``;
