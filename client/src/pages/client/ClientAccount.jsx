import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import AccImg from "../../assets/configuracoes.png";
import {
  getUserDetails,
  updateUserInfo,
} from "../../redux/userRelated/userHandle";
import { Link } from "react-router-dom";
import Logout from "../Logout";

const ClientAccount = () => {
  const { currentUser, status, error, response } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState(currentUser?.email);
  const [firstName, setFirstName] = useState(currentUser?.firstName);
  const [lastName, setLastName] = useState(currentUser?.lastName);

  const address = "client";

  const fields = {
    firstName,
    lastName,
    email,
  };

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const id = currentUser._id;

  const saveEdit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(fields, currentUser._id, address));
  };

  useEffect(() => {
    dispatch(getUserDetails(id, address));
    setLoading(false);
  }, [dispatch, id, address]);

  useEffect(() => {
    if (status === "success") {
      window.location.reload(true);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, error, response, currentUser]);

  return (
    <ContainerCont>
      {edit ? (
        <>
          <LeftCont>
            <Content>
              <NameField>
                {currentUser.firstName} {currentUser.lastName}
              </NameField>
            </Content>

            <Content>
              <Title>Nome de Usuário:</Title>
              <InputField>
                <InputEdit
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></InputEdit>
              </InputField>
              <InputField>
                <InputEdit
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></InputEdit>
              </InputField>
            </Content>

            <Content>
              <Title>Email:</Title>
              <InputField>
                <InputEdit
                  type="email"
                  placeholder={currentUser.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></InputEdit>
              </InputField>
            </Content>

            <Content>
              <Title>CPF:</Title>
              <InputField>
                <Input>{currentUser.cpf}</Input>
              </InputField>
            </Content>

            <Content>
              <Title>Senha:</Title>
              <InputField>
                <Input>************</Input>
              </InputField>
            </Content>
          </LeftCont>

          <RightCont>
            <ButtonContact>
              <EditCurriculum onClick={() => setEdit(false)}>
                Cancelar Edição
              </EditCurriculum>

              <SaveCurriculum onClick={saveEdit}>Salvar Dados</SaveCurriculum>
            </ButtonContact>
            <ContImg>
              <Img src={AccImg} />
            </ContImg>
          </RightCont>

          <TextFinal>
            <TextLogout to="/logout">Sair da Conta</TextLogout>|
            <TextDel>Excluir Conta</TextDel>
          </TextFinal>
        </>
      ) : (
        <>
          <LeftCont>
            <Content>
              <NameField>
                {currentUser.firstName} {currentUser.lastName}
              </NameField>
            </Content>

            <Content>
              <Title>Nome de Usuário:</Title>
              <InputField>
                <Input>
                  {currentUser.firstName} {currentUser.lastName}
                </Input>
              </InputField>
            </Content>

            <Content>
              <Title>Email:</Title>
              <InputField>
                <Input>{currentUser.email}</Input>
              </InputField>
            </Content>

            <Content>
              <Title>CPF:</Title>
              <InputField>
                <Input>{currentUser.cpf}</Input>
              </InputField>
            </Content>

            <Content>
              <Title>Senha:</Title>
              <InputField>
                <Input>************</Input>
              </InputField>
            </Content>
          </LeftCont>

          <RightCont>
            <ButtonContact>
              <EditCurriculum onClick={() => setEdit(true)}>
                Editar Dados
              </EditCurriculum>

              <SaveCurriculum>Salvar Dados</SaveCurriculum>
            </ButtonContact>
            <ContImg>
              <Img src={AccImg} />
            </ContImg>
          </RightCont>

          <TextFinal>
            <TextLogout to="/logout">Sair da Conta</TextLogout>|
            <TextDel>Excluir Conta</TextDel>
          </TextFinal>
        </>
      )}
    </ContainerCont>
  );
};

export default ClientAccount;

const ContainerCont = styled.div`
  margin: 50px;
  @media (max-width: 768px) {
    width: auto;
    margin: 70px;
  }
`;

const Content = styled.div`
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const LeftCont = styled.div``;

const NameField = styled.p`
  font-size: 40px;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-size: 25px;
  margin: 10px;
  display: flex;
  align-items: center;
`;

const InputField = styled.div`
  background-color: #ececec;
  color: gray;
  width: 1000px;
  height: 40px;
  border-radius: 50px;
  margin-left: 10px;
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 250%;
  }
`;

const Input = styled.div`
  margin-left: 10px;
`;

const RightCont = styled.div`
  display: flex;
  justify-content: center;
`;

const ContImg = styled.div``;

const Img = styled.img`
  width: 351px;
  background-color: #729bf5;
  height: 326px;
  border-radius: 151.5px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonContact = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  margin: 10vh;
  @media (max-width: 768px) {
    margin-right: 2rem;
  }
`;

const EditCurriculum = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  height: 30px;
  width: 200px;
  background-color: var(--navyBlue);
  color: var(--white);
  border-radius: 50px;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;

const SaveCurriculum = styled.div`
  padding: 10px;
  display: flex;
  width: 200px;
  text-align: center;
  align-items: center;
  justify-content: center;
  float: center;
  height: 30px;
  background-color: var(--navyBlue);
  color: var(--white);
  border-radius: 50px;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;

const TextFinal = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  @media (max-width: 768px) {
    margin-left: 2rem;
  }
`;

const TextLogout = styled(Link)`
  text-decoration: none;
  color: black;
  margin-right: 10px;
  cursor: pointer;
`;

const TextDel = styled.div`
  color: red;
  cursor: pointer;
  margin-left: 10px;
`;

const InputEdit = styled.input`
  background-color: #ececec;
  color: black;
  outline: none;
  width: 1000px;
  height: 40px;
  border-radius: 50px;
  margin-left: 10px;
  font-size: 25px;
  margin-top: 10px;
  border: none;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 120%;
  }
`;
