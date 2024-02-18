import { current } from "@reduxjs/toolkit";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import "./PopUp.css";

const PopUpThird =  () => {
  const [modal, setModal] = useState(false);
  

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
        <Select>
          <Button onClick={toggleModal}>Como preencher os campos de curso do currículo?</Button>
          {modal && (
            <Modal>
              <Overlay onClick={toggleModal}></Overlay>
              <Content>
                <H2>Como preencher os campos de curso do currículo?</H2>
                <P>Clique em Editar Dados e edite tudo</P>
                <Close onClick={toggleModal}>&#10005;</Close>
              </Content>
            </Modal>
          )}
        </Select>
    </>
  );
};

export default PopUpThird;

const Button = styled.option`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
`;

const Select = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 20px;
  width: 851px;
  height: 72px;
  border-radius: 20px;
  text-align: center;
  background: #d9d9d9;
  box-shadow: 0px 5px 5px #00297a;
  transition: 0.5s ease-in-out;
  padding: 10px;
  margin: 10px;
  &:hover {
    transition: 0.5s ease-in-out;
    background-color: #bdbbbb;
  }
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  @media (max-width: 768px) {
    width: auto;
    height: auto;
  }
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.8);
  @media (max-width: 768px) {
    width: auto;
    height: auto;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 300px;
  @media (max-width: 768px) {
    min-width: 500px;
  }
`;

const H2 = styled.h2``;

const P = styled.p``;

const Close = styled.button`
  cursor: pointer;
  position: absolute;
  background: #f1f1f1;
  transition: 0.3s ease-in-out;
  top: 10px;
  right: 10px;
  padding: 5px 7px;
  border: 1px solid;
  &:hover {
    background: black;
    color: white;
    border: 1px solid;
    transition: 0.3s ease-in-out;
  }
`;
