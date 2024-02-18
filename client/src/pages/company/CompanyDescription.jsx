import { current } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import DescImg from '../../assets/24.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';
import ReactInputMask from 'react-input-mask';

const CompanyDescription = () => {
  const { currentUser, status, error, response } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const address = 'Company';

  const [description, setDescription] = useState(currentUser.description);
  const [department, setDepartment] = useState(currentUser.department);
  const [cnpj, setCnpj] = useState(currentUser.cnpj);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [editId, setEditID] = useState(-1);

  const handleEdit = (_id) => {
    setEditID(_id);
  };

  const fields = { description, department, cnpj };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(fields, currentUser._id, address));
  };

  useEffect(() => {
    if (status === 'success') {
      window.location.reload(true);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, error, response, currentUser]);

  return (
    <>
      {currentUser._id === editId ? (
        <ContainerCont>
          {' '}
          <Form onSubmit={handleUpdate}>
            <LeftCont>
              <NameField>{currentUser.name}</NameField>

              <Title>Resumo:</Title>
              <EditText
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={322}
                required
              />

              <Title>Setor:</Title>

              <EditInput
                type='text'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />

              <Title>CNPJ:</Title>

              <EditInput
                as={ReactInputMask}
                mask='99.999.999/0001-99'
                margin='normal'
                required
                placeholder='Cnpj'
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </LeftCont>

            <RightCont>
              <ButtonContact>
                <Save type='submit'>Salvar Descrição</Save> <br />
                <Edit onClick={() => setEditID()}>Cancelar edição</Edit>
              </ButtonContact>
            </RightCont>
          </Form>
        </ContainerCont>
      ) : (
        <ContainerCont>
          <LeftCont>
            <NameField>{currentUser.name}</NameField>
            <Title>Resumo: </Title>
            <Text>{currentUser.description}</Text>

            <Title>Setor:</Title>
            <TextInput>{currentUser.department}</TextInput>

            <Title>CNPJ:</Title>
            <TextInput>{currentUser.cnpj}</TextInput>
          </LeftCont>

          <RightCont>
            <ButtonContact>
              {' '}
              <Save
                style={{
                  background: '#c4c4c487',
                  color: 'gray',
                  border: '1px solid var(--navyBlue)',
                  cursor: 'default',
                }}
              >
                Salvar Descrição
              </Save>{' '}
              <br />
              <Edit onClick={() => handleEdit(currentUser._id)}>
                Editar Descrição
              </Edit>
            </ButtonContact>
          </RightCont>
        </ContainerCont>
      )}
    </>
  );
};

export default CompanyDescription;

const ContainerCont = styled.div`
  margin: 50px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const EditText = styled.textarea`
  font-size: 30px;
  color: gray;
  width: 1100px;
  height: 225px;
  background: #c4c4c487;
  border: 1px solid #c4c4c487;
  resize: none;
  border-radius: 20px;
  display: flex;
  word-break: break-word;
  text-align: justify;
  padding: 10px;
  transition: 0.5s ease-in-out;
  &:focus {
    outline: none;
    border: 1.5px solid #38363686;
    transition: 0.5s ease-in-out;
  }
  @media (max-width: 768px) {
    width: 500px;
  }
`;

const EditInput = styled.input`
  font-size: 30px;
  color: gray;
  width: 1100px;
  background: #c4c4c487;
  border: 1px solid #c4c4c487;
  resize: none;
  border-radius: 20px;
  display: flex;
  word-break: break-word;
  text-align: justify;
  padding: 10px;

  transition: 0.5s ease-in-out;
  &:focus {
    outline: none;
    border: 1.5px solid #38363686;
    transition: 0.5s ease-in-out;
  }
  @media (max-width: 768px) {
    width: 500px;
  }
`;

const Form = styled.form`
  height: 100%;
`;

const LeftCont = styled.div`
  margin-bottom: 50px;
  @media (max-width: 768px) {
  }
`;

const NameField = styled.p`
  font-size: 40px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Title = styled.p`
  font-size: 25px;
  margin: 10px;
  display: flex;
  align-items: center;
`;

const RightCont = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 30px;
  color: gray;
  width: 1100px;
  height: auto;
  background: #c4c4c487;
  border: 1px solid #c4c4c487;
  resize: none;
  border-radius: 20px;
  display: flex;
  word-break: break-word;
  text-align: justify;
  padding: 10px;
  transition: 0.5s ease-in-out;
  &:focus {
    outline: none;
    border: 1.5px solid #38363686;
    transition: 0.5s ease-in-out;
  }
  @media (max-width: 768px) {
    height: 430px;
  }
`;

const TextInput = styled.p`
  font-size: 30px;
  color: gray;
  max-width: 1100px;
  background: #c4c4c487;
  border: 1px solid #c4c4c487;
  resize: none;
  border-radius: 20px;
  display: flex;
  word-break: break-word;
  text-align: justify;
  padding: 10px;
  transition: 0.5s ease-in-out;
  &:focus {
    outline: none;
    border: 1.5px solid #38363686;
    transition: 0.5s ease-in-out;
  }
  @media (max-width: 768px) {
    width: 65%;
  }
`;

const ButtonContact = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  margin: 10vh;
`;

const Edit = styled.button`
  padding: 23px 20px;
  display: flex;
  border: none;
  outline: none;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 230px;
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

const Save = styled.button`
  padding: 23px 20px;
  display: flex;
  outline: none;
  border: none;
  width: 230px;
  text-align: center;
  outline: none;
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
