// import React, { useState } from 'react';
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
// import { useNavigate } from 'react-router-dom'
// import { authLogout } from '../../redux/userRelated/userSlice';
// import { Button, Collapse } from '@mui/material';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const CompanyProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <InfoContainer>
      <TopField>
        <UserPic src={currentUser.picture} />
        <NameField>{currentUser.name}</NameField>
      </TopField>
      <Description> {currentUser.description}</Description>
      <InfoField>
        <Title>Setor:</Title> <SubTitle>{currentUser.department}</SubTitle>
      </InfoField>
      <InfoField>
        <Title>Contato:</Title> <SubTitle>Email: {currentUser.email}</SubTitle>
        <SubTitle>Tel: {currentUser.phone}</SubTitle>
        <SubTitle>
          Localização: {currentUser.address?.city}, {currentUser.address?.state}
        </SubTitle>
      </InfoField>
    </InfoContainer>
  );
};

export default CompanyProfile;

const Description = styled.p`
  font-weight: 400;
  font-size: 25px;
  margin-top: 10px;
  word-break: break-all;
`;

const InfoContainer = styled.div`
  margin: 4rem;
`;

const TopField = styled.div`
  display: flex;
  align-items: center;
`;

const UserPic = styled.img`
  height: 112px;
  width: 108px;
  border-radius: 50%;
  border: 1px solid black;
`;

const NameField = styled.p`
  font-size: 50px;
  font-weight: 700;
  padding-left: 10px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const InfoField = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  line-height: 42px;
`;

const SubTitle = styled.p`
  font-weight: 400;
  font-size: 25px;
  line-height: 35px;
  word-break: break-all;
`;
