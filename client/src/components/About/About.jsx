import React from 'react';
import HeroLifes from '../Hero/HeroLifes';
import HeroMission from '../Hero/HeroMission';
import HeroHistory from '../Hero/HeroHistory';
import HeroTeam from '../Hero/HeroTeam';
import HeroContact from '../Hero/HeroContact';

const About = () => {
  return (
    <>
      <HeroLifes />
      <HeroMission />
      <HeroHistory/>
      <HeroTeam/>
      <HeroContact/>
    </>
  );
};

export default About;
