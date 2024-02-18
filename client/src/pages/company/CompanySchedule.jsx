import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import blue from '../../assets/blue.svg';
import { CircularProgress } from '@mui/material';

const CompanySchedule = () => {
  const [currentId, setCurrentId] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

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
    const response = await axios.get(`${url}/company/jobs/${id}/?page=${page}`);
    const newJobs = response.data.data;
    const current = response.data.currentPage;
    const number = response.data.numberOfPages;

    console.log(current);
    setData((data) => [...data, ...newJobs]);
    console.log(newJobs);
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
      {/*    {data?.map((item, index) => ( */}
      <Container /* key={index} */>
        {/*      {item.applications.map((item, key) => ( */}
        <TopHero>
          <HeroH1>
            OLÁ, {currentUser.name} , ESCOLHA A VAGA QUE DESEJA ANALISAR OS
            CANDIDATOS:
          </HeroH1>
        </TopHero>
        {loading ? (
          <LoadingPage>
            {' '}
            <CircularProgress />
          </LoadingPage>
        ) : (
          <>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((job, index) => (
                <Field key={index}>
                  <Area>
                    <AreaPic>
                      <Pic src={job.company.picture} />
                    </AreaPic>
                    <NameField>
                      {job.company.name} - {job.typeOfWork}{' '}
                    </NameField>
                  </Area>
                  <Content>
                    <Input
                      onClick={() =>
                        navigate('/jobs/job/' + job._id + '/applicants')
                      }
                    >
                      ANALISAR
                    </Input>
                  </Content>
                </Field>
              ))
            ) : (
              <Error>
                <Text>Nenhuma vaga encontrada!</Text>{' '}
                <Redirect to='/company/my-jobs'>Publicar vaga</Redirect>
              </Error>
            )}{' '}
            <div ref={loadingRef}></div>
          </>
        )}
      </Container>
      {/* ))} */}
    </>
  );
};

export default CompanySchedule;

const Container = styled.div`
  background: url(${blue});
  background-size: 100%;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const LoadingPage = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopHero = styled.div`
  margin-bottom: 5rem;
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
  padding: 100px 0px 270px 0px;
`;

const Text = styled.p`
  color: red;
  font-weight: 900;
  margin-bottom: 20px;
  font-size: 30px;
`;

const HeroH1 = styled.h1`
  padding: 30px;
  font-weight: 700;
  font-size: 50px;
  line-height: 72px;
  text-align: center;
  letter-spacing: -0.015em;
  color: #ffffff;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Field = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
  @media (max-width: 768px) {
    width: auto;
  }
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
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const NameField = styled.div`
  @media (max-width: 768px) {
    font-size: 20px;
    word-break: break-all;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  @media (max-width: 768px) {
    margin: 0;
    justify-content: center;
  }
`;

const Input = styled.button`
  flex-direction: row-reverse;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-transform: uppercase;
  box-sizing: border-box;
  width: 200px;
  height: 50px;
  margin-right: 20px;
  background: #00297a;
  border: 1px solid #00297a;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 80px;
  cursor: pointer;
`;
