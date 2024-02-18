import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';

const ClientSchedule = () => {
  const { currentUser, applications } = useSelector((state) => state.user);

  const [currentId, setCurrentId] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const id = currentUser._id;

  const [data, setData] = useState([]);
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
    const response = await axios.get(
      `${url}/client/details/${id}/?page=${page}`
    );
    const newApplications = response.data.applications;
    const current = response.data.currentPage;
    const number = response.data.numberOfPages;

    console.log(current);
    setData((data) => [...data, ...newApplications]);
    console.log(newApplications);
    setCurrentPage(current);
    setNumberOfPages(number);
    setIsInitialCall(false);
    setLoading(false);
  };

  useEffect(() => {
    if (!loadingRef.current) return;

    const loading = loadingRef.current;

    const loadingObserver = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isInitialCall &&
          currentPage <= numberOfPages
        ) {
          setPage((page) => page + 1);
        }
      },
      { threshold: 1 }
    );

    loadingObserver.observe(loading);

    return () => {
      if (loading) loadingObserver.unobserve(loading);
    };
  }, [data, id, page]);

  console.log(data);

  return (
    <>
      {Array.isArray(data) && data.length ? (
        data?.map((item, index) => (
          <Container key={index}>
            {item.applications.map((item, key) => (
              <Field key={key}>
                <Area>
                  <AreaPic>
                    <Pic src={item.job.company.picture} />
                  </AreaPic>
                  <NameField>
                    {item.job.company.name}- {item.job.typeOfWork}{' '}
                  </NameField>
                </Area>
                <Content>
                  <Input>
                    <InputRec>Recebido</InputRec>
                    <InputAn>Em Análise</InputAn>
                    <InputSel>Pré Selecionado</InputSel>
                    <InputAp>Aprovado</InputAp>
                  </Input>
                </Content>
              </Field>
            ))}
          </Container>
        ))
      ) : (
        <Error>
          <Text>Você ainda não aplicou para nenhum trabalho!</Text>{' '}
          <Redirect to='/jobs'>Aplicar agora</Redirect>
        </Error>
      )}
    </>
  );
};

export default ClientSchedule;

const Container = styled.div``;

const Field = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
  @media (max-width: 768px) {
    display: block;
    width: auto;
  }
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

const Error = styled.p`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 250px 0px;
`;

const Text = styled.p`
  color: red;
  font-weight: 900;
  margin-bottom: 20px;
  font-size: 30px;
`;

const Area = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
  margin: 10px;
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

const NameField = styled.div``;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  @media (max-width: 768px) {
    margin: 0;
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
