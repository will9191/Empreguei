import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Job from './Job';
import { Grid, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Jobs = ({ setCurrentId, data }) => {
  const { currentRole } = useSelector((state) => state.user);

  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        <StyledJobs>
          {data.map((job, index) => (
            <Grid key={index}>
              <Job job={job} setCurrentId={setCurrentId} />
            </Grid>
          ))}{' '}
        </StyledJobs>
      ) : (
        <Error>
          <Text>Nenhuma vaga encontrada!</Text>
          {currentRole === 'Client' && (
            <Redirect to='/jobs'>Explorar mais</Redirect>
          )}
        </Error>
      )}
    </>
  );
};

export default Jobs;

const StyledJobs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

const Error = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 150px 0px;
`;

const Text = styled.p`
  color: red;
  font-weight: 900;
  margin-bottom: 20px;
  font-size: 30px;
`;
