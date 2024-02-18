import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import {
  getUserDetails,
  updateUserInfo,
} from "../../redux/userRelated/userHandle";
import { Link } from "react-router-dom";
import Logout from "../Logout";

const AdminConfig = () => {
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
    <Container>
      {edit ? (
        <>
          <Content>
            <NameField>{currentUser.firstName}</NameField>

            <Label>Nome de Usuário:</Label>
            <Input>
              <PlaceholderEdit
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              ></PlaceholderEdit>
            </Input>
            <Input>
              <PlaceholderEdit
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              ></PlaceholderEdit>
            </Input>

            <Label>Email:</Label>
            <Input>
              <PlaceholderEdit
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></PlaceholderEdit>
            </Input>

            <Label>Senha:</Label>
            <Input>
              <Placeholder>*********</Placeholder>
            </Input>
          </Content>

          <Main>
            <ButtonContact>
              <EditCurriculum onClick={() => setEdit(false)}>
                Cancelar Edição
              </EditCurriculum>

              <SaveCurriculum onClick={saveEdit}>Salvar Dados</SaveCurriculum>
            </ButtonContact>

            <TextFinal>
              <TextLogout to="/logout">Sair da Conta</TextLogout>|
              <TextDel>Excluir Conta</TextDel>
            </TextFinal>
          </Main>
        </>
      ) : (
        <>
          <Content>
            <NameField>{currentUser.firstName}</NameField>

            <Label>Nome de Usuário:</Label>
            <Input>
              <Placeholder>
                {currentUser.firstName} {currentUser.lastName}{" "}
              </Placeholder>
            </Input>

            <Label>Email:</Label>
            <Input>
              <Placeholder>{currentUser.email}</Placeholder>
            </Input>

            <Label>Senha:</Label>
            <Input>
              <Placeholder>*********</Placeholder>
            </Input>
          </Content>

          <Main>
            <ButtonContact>
              <EditCurriculum onClick={() => setEdit(true)}>
                Editar Dados
              </EditCurriculum>

              <SaveCurriculum>Salvar Dados</SaveCurriculum>
            </ButtonContact>

            <TextFinal>
              <TextLogout to="/logout">Sair da Conta</TextLogout>|
              <TextDel>Excluir Conta</TextDel>
            </TextFinal>
          </Main>
        </>
      )}
    </Container>
  );
};

export default AdminConfig;

const Container = styled.div``;

const TopField = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #00297a;
  width: 90vw;
  height: 115px;
`;

const TopText = styled.p`
  color: white;
  font-size: 45px;
  font-weight: 700;
  line-height: 50px;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  padding-bottom: 0rem;
`;

const NameField = styled.div`
  font-size: 40px;
  padding: 10px;
`;

const Label = styled.div`
  font-size: 18px;
`;

const Input = styled.div`
  width: 951px;
  height: 41px;
  display: flex;
  align-items: center;
  background: rgba(196, 196, 196, 0.53);
  box-shadow: 0px 4px 4px #00297a;
  border-radius: 20px;
  margin: 1rem;
`;

const Placeholder = styled.div`
  margin-left: 20px;
  color: rgba(48, 44, 44, 0.53);
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const PlaceholderEdit= styled.input`
   background-color: #ececec;
  color: gray;
  outline: none;
  width: 1000px;
  height: 40px;
  border-radius: 50px;
  margin-left: 10px;
  font-size: 18px;
  margin-top: 10px;
  border: none;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 120%;
  }
`;