import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Grid, CircularProgress } from '@mui/material';
import { FaRegTrashAlt } from 'react-icons/fa';

const AdminJobs = () => {
  const [currentId, setCurrentId] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const loadingRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(parseInt);
  const [numberOfPages, setNumberOfPages] = useState(parseInt);

  const [page, setPage] = useState(1);

  /*   const query = useLocation().search;

  console.log(query); */

  console.log(page);

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchJobs();
  }, [page]);

  /*   useEffect(() => {
    fetchJobs();
  }, [query]);
 */
  const fetchJobs = async () => {
    const response = await axios.get(`${url}/jobs/search?page=${page}`);
    /*     const response = await axios.get(`${url}/jobs/search${query}`); */
    const newJobs = response.data.data;
    const current = response.data.currentPage;
    const number = response.data.numberOfPages;

    console.log(current);
    setData((data) => [...data, ...newJobs]);
    setCurrentPage(current);
    setNumberOfPages(number);
    setLoading(false);
    setIsInitialCall(false);
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
  }, [data, page]);

  console.log(data);
  console.log(currentPage);
  console.log(numberOfPages);

  return (
    <Container>
      <TopField>
        <TopText>VAGAS PUBLICADAS</TopText>
      </TopField>
      {loading ? (
        <LoadingPage>
          {' '}
          <CircularProgress />
        </LoadingPage>
      ) : (
        <>
          {Array.isArray(data) && Object.keys(data) ? (
            data?.map((job) => (
              <>
                <Field key={job._id}>
                  <Area>
                    <AreaPic>
                      <Pic src={job.company?.picture} />
                    </AreaPic>
                    <NameField>
                      {job.typeOfWork} - {job.company?.name}{' '}
                      <div ref={loadingRef}></div>
                    </NameField>
                  </Area>
                  <Content>
                    <Input>
                      <FaRegTrashAlt />
                    </Input>
                  </Content>
                </Field>
              </>
            ))
          ) : (
            <> Nenhuma vaga encontrada! </>
          )}
        </>
      )}{' '}
    </Container>
  );
};

export default AdminJobs;

const Container = styled.div``;
const LoadingPage = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

const Input = styled.div`
  color: black;
  font-size: 50px;
  text-transform: uppercase;
  box-sizing: border-box;
  width: 200px;
  height: 50px;
  margin-right: 6rem;
  border-radius: 80px;
  cursor: pointer;
`;
