import { Container, Grid, Paper } from '@mui/material';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import HeroWelcome from '../../components/Hero/HeroWelcome';
import HeroCards from '../../components/Hero/HeroCardOpportunities';
import HeroOpportunities from '../../components/Hero/HeroOpportunities';
import HeroCompanies from '../../components/Hero/HeroCompanies';
import HeroCardOpportunities from '../../components/Hero/HeroCardOpportunities';
import HeroJobs from '../../components/Hero/HeroJobs';

const ClientHomePage = () => {
  return (
    <>
      <HeroWelcome />
      <HeroOpportunities />
      <HeroJobs />
      <HeroCompanies />
    </>
  );
};

export default ClientHomePage;
