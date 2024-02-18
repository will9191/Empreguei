import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Company from './Company';
import { Grid, CircularProgress } from '@mui/material';

const Companies = ({ setCurrentId, data }) => {
  return (
    <StyledCompanies>
      {Array.isArray(data) && Object.keys(data) ? (
        data?.map((company) => (
          <Grid key={company._id} item xs={12} sm={12} md={6} lg={3}>
            <Company company={company} setCurrentId={setCurrentId} />
          </Grid>
        ))
      ) : (
        <> Nenhuma empresa encontrada! </>
      )}
    </StyledCompanies>
  );
};

export default Companies;

const StyledCompanies = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
