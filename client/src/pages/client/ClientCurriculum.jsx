import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';

const ClientCurriculum = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const address = 'client';

  const id = currentUser._id;

  useEffect(() => {
    dispatch(getUserDetails(id, address));
    setLoading(false);
  }, [dispatch, id, address]);

  console.log(currentUser);

  return (
    <ContainerCur>
      {loading ? (
        <>loading</>
      ) : (
        <>
          <PicContent>
            <PicField src={currentUser.picture} alt='UserAvatar' />

            <TopField>
              <Left>
                <Text>
                  {currentUser.firstName} {currentUser.lastName}
                </Text>
                <Text> {currentUser.email} </Text>
                <Text>
                  {currentUser.address ? currentUser.address.city : 'city'}
                </Text>
              </Left>
              <Right>
                {' '}
                <Text> {currentUser.birth} </Text>{' '}
                <Text>{currentUser.phone}</Text>
                <Text>
                  {currentUser.address ? currentUser.address.state : 'state'}
                </Text>
              </Right>
            </TopField>
          </PicContent>

          <ButtonCurriculumRes>
            <EditCurriculumRes>Editar Dados</EditCurriculumRes>

            <SaveCurriculumRes>Salvar Dados</SaveCurriculumRes>
          </ButtonCurriculumRes>

          <Curriculum>
            <Field>
              <Title>Formação Acadêmica</Title>
              {currentUser?.curriculum?.academics ? (
                <InputField>
                  <Input>
                    {currentUser?.curriculum?.academics.map((item, index) => (
                      <div key={index}>{item.academic}</div>
                    ))}
                  </Input>
                </InputField>
              ) : (
                <InputField>Nenhuma formação escolhida!</InputField>
              )}
            </Field>
            <Field>
              <Title>Histórico Profissinal</Title>
              {currentUser?.curriculum?.histories ? (
                <InputField>
                  <Input>
                    {currentUser?.curriculum?.histories.map((item, index) => (
                      <div key={index}>{item.history}</div>
                    ))}
                  </Input>
                </InputField>
              ) : (
                <InputField>Nenhum histórico escolhido!</InputField>
              )}
            </Field>
            <Field>
              <Title>Idiomas</Title>
              {currentUser?.curriculum?.languages ? (
                <InputField>
                  <Input>
                    {currentUser?.curriculum?.languages.map((item, index) => (
                      <div key={index}>{item.language}</div>
                    ))}
                  </Input>
                </InputField>
              ) : (
                <InputField>Nenhum idioma escolhido!</InputField>
              )}
            </Field>
            <Field>
              <Title>Habilidades</Title>
              {currentUser?.curriculum?.skills ? (
                <InputField>
                  <Input>
                    {currentUser?.curriculum?.skills.map((item, index) => (
                      <div key={index}>{item.skill}</div>
                    ))}
                  </Input>
                </InputField>
              ) : (
                <InputField>Nenhuma habilidade escolhida!</InputField>
              )}
            </Field>
            <Field>
              <Title>Objetivo</Title>
              {currentUser?.curriculum?.goal ? (
                <InputField>
                  <Input>
                    {currentUser?.curriculum?.goal ? (
                      <div>{currentUser?.curriculum?.goal}</div>
                    ) : (
                      <>Adicionar</>
                    )}
                  </Input>
                </InputField>
              ) : (
                <InputField>Nenhum objetivo escolhido!</InputField>
              )}
            </Field>
            <Field>
              <Title>Resumo Profissional</Title>
              {currentUser?.curriculum?.resume ? (
                <InputField>
                  <Input>
                    {currentUser?.curriculum?.resume ? (
                      <div>{currentUser?.curriculum?.resume}</div>
                    ) : (
                      <>Adicionar</>
                    )}
                  </Input>
                </InputField>
              ) : (
                <InputField>Nenhum resumo escolhido!</InputField>
              )}
            </Field>
          </Curriculum>

          <ButtonCurriculum>
            <EditCurriculum>Editar Dados</EditCurriculum>

            <SaveCurriculum>Salvar Dados</SaveCurriculum>
          </ButtonCurriculum>
        </>
      )}{' '}
    </ContainerCur>
  );
};

export default ClientCurriculum;

const ContainerCur = styled.div`
  width: 100%;
  margin: 50px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const TopField = styled.div`
  font-size: 22px;
  width: 100%;
  color: #615b5b;
  justify-content: center;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PicContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 50%;
    display: flex;
  }
`;

const PicField = styled.img`
  display: flex;
  margin-right: 10px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
`;

const Left = styled.div`
  width: 100%;
`;

const Right = styled.div`
  width: 100%;
`;

const Text = styled.p`
  display: flex;
  background: rgba(196, 196, 196, 0.53);
  border-radius: 50px;
  padding: 20px 250px 20px 10px;
  margin: 30px 50px;
  text-align: left;
  justify-content: left;
  @media (max-width: 768px) {
    width: 50%;
    height: auto;
  }
`;

/* Curriculo Styled */

const Curriculum = styled.div`
  color: black;
  width: 100%;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 800;
  display: flex;
  align-items: center;
  height: 52px;
  margin-left: 10px;
  color: white;
`;

const InputField = styled.div`
  background-color: #ececec;
  padding-top: 10px;
`;

const Input = styled.div`
  margin-left: 10px;
  font-size: 25px;
`;

const Field = styled.div`
  background: #00297a;
  border-radius: 20px;
  width: 100%;
  margin: 30px 0px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const InputRes = styled.div`
  background-color: #ececec;
  color: gray;
  margin-left: 10px;
  font-size: 25px;
`;

const ButtonCurriculum = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const EditCurriculum = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-bottom: 20px;
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

//Responsivo

const ButtonCurriculumRes = styled.div`
  display: none;
  margin: 30px;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const EditCurriculumRes = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-bottom: 20px;
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

const SaveCurriculumRes = styled.div`
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
  margin-left: 20px;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;
