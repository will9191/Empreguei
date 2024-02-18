import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';

const JobApplicants = () => {
  const { currentUser, applications } = useSelector((state) => state.user);

  const params = useParams();

  const id = params.id;

  const [job, setJob] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(null);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [numberOfPages, setNumberOfPages] = useState();

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchJobs();
  }, [id, page]);

  const fetchJobs = async () => {
    const response = await axios.get(`${url}/jobs/${id}`);
    const jobDetails = response.data.job;
    const newApplicants = response.data.applicants;
    setJob((data) => [...data, jobDetails]);
    setApplicants((data) => [...data, ...newApplicants]);
    setIsInitialCall(false);
    setLoading(false);
  };

  /* console.log(job); */
  console.log(applicants);

  return (
    <>
      <TopField>
        {job.map((item, key) => (
          <JobVaga key={key}>Vaga: {item.typeOfWork}</JobVaga>
        ))}
      </TopField>
      <Container>
        {applicants.map(({ applicants }) => {
          return applicants.map((item, index) => (
            <Field key={index}>
              <Division>
                <AreaPic>
                  <Pic src={item.client.picture} />
                </AreaPic>
                <Area>
                  <NameField>
                    {item.client.firstName} {item.client.lastName}
                  </NameField>
                  <Comp>50% DE COMPATIBILIDADE COM A VAGA</Comp>
                  <ShowCur>VER CURRÍCULO</ShowCur>
                </Area>
              </Division>
              <Content>
                <InputH1>SELECIONE O STATUS DO CURRÍCULO:</InputH1>
                <Input>
                  <InputRec>Recebido</InputRec>
                  <InputAn>Em Análise</InputAn>
                  <InputSel>Pré Selecionado</InputSel>
                  <InputAp>Aprovado</InputAp>
                </Input>
                <RemoveCan>REMOVA O CANDIDATO</RemoveCan>
              </Content>
            </Field>
          ));
        })}
        {!applicants.length && (
          <Error>
            <Text>Nenhum candidato encontrado!</Text>{' '}
            <Redirect to='/company/schedule'>Voltar</Redirect>
          </Error>
        )}
      </Container>
    </>
  );
};

export default JobApplicants;

const TopField = styled.div`
  background-color: #00297a;
  width: auto;
  height: 155px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Division = styled.div`
  display: flex;
`;

const JobVaga = styled.p`
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 50px;
  line-height: 72px;
  text-align: center;
  letter-spacing: -0.015em;
`;

const Container = styled.div``;

const Field = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
  }
`;

const Area = styled.div`
  display: flex;
  justify-content: center;
  justify-items: first baseline;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
  }
`;

const AreaPic = styled.div`
  margin: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  background: #bebebe;
`;

const Pic = styled.img`
  border-radius: 50%;
  width: 90px;
  height: 90px;
`;

const NameField = styled.p`
  font-size: 30px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr;
  justify-items: center;
  align-items: center;
  margin-right: 5rem;
  @media (max-width: 768px) {
    margin: 0;
    gap: 1rem;
  }
`;

const Input = styled.div`
  flex-direction: row-reverse;
  display: flex;
  align-items: center;
  color: white;
  text-transform: uppercase;
  box-sizing: border-box;
  width: 610px;
  height: 70px;
  background: #00297a;
  border: 1px solid #00297a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
`;

const InputRec = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: absolute;
  width: 610px;
  height: 70px;
  background: #00297a;
  border: 1px solid #00297a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  padding: 10px;
`;

const InputAn = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 459px;
  height: 70px;
  background: #4f6798;
  border: 1px solid #00297a;
  border-radius: 50px;
`;

const InputSel = styled.div`
  position: absolute;
  padding: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 335px;
  height: 70px;
  background: #6b84b7;
  border: 1px solid #00297a;
  border-radius: 50px;
`;

const InputAp = styled.div`
  position: absolute;
  padding: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 148px;
  height: 70px;
  background: #c4c4c4;
  border: 1px solid #00297a;
  border-radius: 50px;
`;

const Comp = styled.p`
  font-size: 20px;
  display: flex;
`;

const ShowCur = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 30px;
  color: white;
  background: #00297a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: var(--orange);
    color: white;
    transition: 0.5s ease-in-out;
  }
`;

const InputH1 = styled.div``;

const RemoveCan = styled.div`
  cursor: pointer;
  width: 298px;
  height: 30px;
  background: #00297a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  color: white;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: var(--orange);
    color: white;
    transition: 0.5s ease-in-out;
  }
`;

const Text = styled.p`
  color: red;
  font-weight: 900;
  margin-bottom: 20px;
  font-size: 30px;
`;

const Error = styled.p`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 150px 0px;
`;

const Redirect = styled(Link)`
  color: white;
  border-radius: 80px;
  text-transform: uppercase;
  text-decoration: none;
  background: #00297a;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  border: none;
  padding: 15px 45px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
