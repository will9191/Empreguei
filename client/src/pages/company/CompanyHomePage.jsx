import { Container, Grid, Paper } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import HeroWelcome from '../../components/Hero/HeroWelcome';
import HeroOpportunities from '../../components/Hero/HeroOpportunities';
import HeroCompanies from '../../components/Hero/HeroCompanies';

import HeroPlans from '../../components/Hero/HeroPlans';
import HeroPostJob from '../../components/Hero/HeroPostJob';

const CompanyHomePage = () => {
  return (
    <>
      <HeroWelcome />
      <HeroOpportunities />
      <HeroCompanies />
      <HeroPlans />
    </>
  );
};

export default CompanyHomePage;
