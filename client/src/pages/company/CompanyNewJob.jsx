import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import blue from '../../assets/blue.svg';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { addJob } from '../../redux/userRelated/userHandle';
import ReactInputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanyNewJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, status, error, response } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [categoryData, setCategoryData] = useState([]);

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(`${url}/category`);
    const newCategories = response.data.categories;
    setCategoryData((categoryData) => [...categoryData, ...newCategories]);
  };

  const company = currentUser._id;
  const [category, setCategory] = useState('');
  const [typeOfWork, setTypeOfWork] = useState('');
  const [salary, setSalary] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [workMode, setWorkMode] = useState('Presencial');

  const fields = {
    company,
    category,
    typeOfWork,
    salary,
    address: { city, state },
    time: {
      startTime,
      endTime,
    },
    description,
    requirements,
    workMode,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true), dispatch(addJob(fields));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/company/my-jobs');
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
  }, [status, navigate, error, response, currentUser]);

  console.log(category);

  return (
    <Container>
      <Top>
        <HeroH1>
          Olá, {currentUser.name}, <br /> divulgue sua oportunidade aqui!
        </HeroH1>
      </Top>
      <Form onSubmit={handleSubmit}>
        <HeroH2>Detalhe sua Vaga</HeroH2>
        <Content>
          <Left>
            <Field>
              <Title>Título da vaga</Title>
              <Input
                placeholder='Procura-se'
                type='text'
                value={typeOfWork}
                onChange={(e) => setTypeOfWork(e.target.value)}
                required
              />
            </Field>
            <Field>
              {' '}
              <Title>Área profissional</Title>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {Array.isArray(categoryData) ? (
                  categoryData?.map((item) => (
                    <>
                      <Option value='' selected disabled hidden>
                        Escolher categoria
                      </Option>
                      <Option key={item._id} value={item._id} required>
                        {item.name}
                      </Option>
                    </>
                  ))
                ) : (
                  <> Nenhuma categoria encontrada! </>
                )}
              </Select>
            </Field>
            <Field>
              <Title>Salário</Title>
              <Input
                as={NumericFormat}
                placeholder='Salário'
                thousandSeparator=','
                decimalSeparator='.'
                prefix='R$ '
                decimalScale={2}
                type='text'
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Title>Endereço</Title>{' '}
              <Input
                placeholder='Estado'
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <Input
                style={{ marginTop: '10px' }}
                placeholder='Cidade'
                id='city'
                name='city'
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Title>Hora de trabalho</Title>

              <Input
                as={ReactInputMask}
                mask='99:99 h'
                placeholder='A partir de'
                type='text'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <Input
                style={{ marginTop: '10px' }}
                as={ReactInputMask}
                mask='99:99 h'
                placeholder='Até'
                type='text'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </Field>
          </Left>
          <Right>
            <Field>
              <Title>Modo de trabalho</Title>

              <Select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                required
              >
                <Option>Presencial</Option>
                <Option>Remoto</Option>
                <Option>Híbrido</Option>
              </Select>
            </Field>
            <Field>
              <Title>Descrição</Title>
              <TextArea
                placeholder='Descrição'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={322}
                required
              />
            </Field>
            <Field>
              <Title>Requisitos</Title>
              <TextArea
                placeholder='Requisitos'
                type='text'
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                required
                maxLength={322}
              />
            </Field>
          </Right>
        </Content>
        <PostBtn type='submit'>Publicar</PostBtn>
      </Form>
    </Container>
  );
};

export default CompanyNewJob;

const Container = styled.div`
  background: url(${blue});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  @media (max-width: 768px) {
    grid-gap: 30px;
  }
`;

const Left = styled.div`
  width: 100%;
`;

const Right = styled.div`
  width: 100%;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  display: flex;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  color: #00297a;
  text-transform: uppercase;
  margin: 15px 0px 3px 0px;
  @media (max-width: 768px) {
    font-size: 15px;
    text-align: center;
  }
`;

const Input = styled.input`
  box-shadow: 0px 4px 4px 0px #00297a;
  background: #d9d9d9;
  padding: 12px 0px 12px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
  text-align: left;
  width: 90%;
`;

const Option = styled.option`
  outline: none;
  border: none;
  width: max-content;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

const Select = styled.select`
  box-shadow: 0px 4px 4px 0px #00297a;
  background: #d9d9d9;
  padding: 12px 0px 12px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
  text-align: left;
  width: 93%;
`;

const Form = styled.form`
  margin: 0px 100px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const HeroH2 = styled.h2`
  text-transform: uppercase;
  text-align: left;
  margin: 120px 20px 0px 0px;
  color: #00297a;
  @media (max-width: 768px) {
    font-size: 30px;
    text-align: center;
  }
`;

const HeroH1 = styled.h1`
  font-size: 30px;
  color: var(--white);
  text-transform: uppercase;
  text-align: center;
  margin: 110px 0px 0px 0px;
  line-height: 40px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
`;

const TextArea = styled.textarea`
  box-shadow: 0px 4px 4px 0px #00297a;
  background: #d9d9d9;
  padding: 12px 0px 12px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
  text-align: left;
  width: 97%;
  height: 80px;
`;

const PostBtn = styled.button`
  display: flex;
  padding: 15px 50px;
  border-radius: 100px;
  background-color: var(--lightNavyBlue);
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  font-size: 25px;
  transition: 0.5s ease-in-out;
  box-shadow: none;
  justify-content: center;
  border: none;
  text-align: center;
  font-weight: 300;
  margin: 30px 0px;
  box-shadow: 5px 5px 5px 0px #ffffff40;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: var(--orange);
    color: white;
    transition: 0.5s ease-in-out;
  }
`;
