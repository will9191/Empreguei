import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import blue from '../../assets/blue.svg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Jobs from '../Jobs/Jobs';

const CategoryJobs = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(true);
  const [category, setCategory] = useState([]);
  const [jobs, setJobs] = useState([]);

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchJobs();
  }, [id]);

  const fetchJobs = async () => {
    const response = await axios.get(`${url}/category/${id}`);
    const newCategory = response.data.category;
    const newJobs = response.data.jobs;
    setCategory((category) => [...category, newCategory]);
    setJobs((jobs) => [...jobs, ...newJobs]);

    /*  setCurrentPage(current);
    setNumberOfPages(number); */
  };

  return (
    <Container>
      {category.map((item, index) => (
        <TopField key={index}>
          <Field>
            <Pic src={item.picture} />
            <Name>{item.name}</Name>
          </Field>
          <Button to='/jobs'>Voltar para vagas</Button>
        </TopField>
      ))}
      {Array.isArray(jobs) && jobs.length ? (
        <>
          <Jobs setCurrentId={setCurrentId} data={jobs} />
        </>
      ) : (
        <Error>
          <Text>Nenhuma vaga encontrada!</Text>{' '}
          <Redirect to='/jobs'>Explorar mais</Redirect>
        </Error>
      )}
    </Container>
  );
};

export default CategoryJobs;

const TopField = styled.div`
  padding: 3rem;
  display: flex;
  align-items: center;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
`;

const Pic = styled.img`
  height: 90px;
  width: 90px;
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
  padding: 150px 0px;
`;

const Text = styled.p`
  color: red;
  font-weight: 900;
  margin-bottom: 20px;
  font-size: 30px;
`;

const Name = styled.p`
  color: white;
  text-transform: uppercase;
  font-size: 30px;
`;

const Button = styled(Link)`
  background: white;
  color: #00297a;
  border-radius: 50px;
  padding: 20px 40px;
  position: absolute;
  cursor: pointer;
  right: 10rem;
  outline: none;

  font-size: 20px;
  font-weight: 900;
  border: none;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    right: 0rem;
    position: static;
  }
`;

const Container = styled.div`
  background: url(${blue});
  background-repeat: no-repeat;
  background-size: 100%;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  min-height: 40vh;
  @media (max-width: 768px) {
    width: auto;
  }
`;
