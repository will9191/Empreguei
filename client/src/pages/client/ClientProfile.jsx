import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import * as Bs from 'react-icons/bs';
import * as Bi from 'react-icons/bi';
import * as Lia from 'react-icons/lia';

const ClientProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const address = 'client';

  const id = currentUser._id;

  useEffect(() => {
    dispatch(getUserDetails(id, address));
    setLoading(false);
  }, [dispatch, id, address]);

  return (
    <InfoContent>
      <TopField>
        <UserPic src={currentUser.picture} />
        <NameField>
          {currentUser.firstName} {currentUser.lastName}
        </NameField>
      </TopField>
      <InfoField>
        <Title>Área de atuação:</Title>
        <SubTitle>{currentUser.occupation} </SubTitle>
      </InfoField>
      <InfoField>
        <Title>Contato:</Title>
        <SubTitle>Email: {currentUser.email}</SubTitle>
        <SubTitle>Tel: {currentUser.phone}</SubTitle>
        <SubTitle>
          Localização: {currentUser.address.city}, {currentUser.address.state}{' '}
        </SubTitle>
        <SubTitle>
          CPF: {currentUser.cpf}
        </SubTitle>
      </InfoField>
      {currentUser?.media && Object.keys(currentUser?.media) ? (
        <Menu>
          {currentUser?.media?.facebook && (
            <MediaLink to={currentUser?.media?.facebook} target='_blank'>
              <Bi.BiLogoFacebook />
            </MediaLink>
          )}
          {currentUser?.media?.whatsapp && (
            <MediaLink to={currentUser?.media?.whatsapp} target='_blank'>
              <Bs.BsWhatsapp />
            </MediaLink>
          )}
          {currentUser?.media?.instagram && (
            <MediaLink to={currentUser?.media?.instagram} target='_blank'>
              <Bs.BsInstagram />
            </MediaLink>
          )}
          {currentUser?.media?.linkedin && (
            <MediaLink to={currentUser?.media?.linkedin} target='_blank'>
              <Bi.BiLogoLinkedin />
            </MediaLink>
          )}

          {currentUser?.media?.telegram && (
            <MediaLink to={currentUser?.media?.telegram} target='_blank'>
              <Lia.LiaTelegramPlane />
            </MediaLink>
          )}
        </Menu>
      ) : (
        <Button to='/client/contact'>Adicionar Mídia Social</Button>
      )}
    </InfoContent>
  );
};

export default ClientProfile;

const InfoContent = styled.div`
  margin: 4rem;
`;

const Menu = styled.div`
  display: flex;
`;

const Button = styled(Link)`
  padding: 10px;
  text-decoration: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 300px;
  background-color: var(--navyBlue);
  color: var(--white);
  border-radius: 50px;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;

const MediaLink = styled(Link)`
  background-color: black;
  color: white;
  font-size: 30px;
  padding: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0px 20px;
  text-decoration: none;
  text-decoration-line: none;
  list-style: none;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    transition: 0.5s ease-in-out;
  }
`;

const TopField = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const UserPic = styled.img`
  height: 112px;
  width: 108px;
  border-radius: 50%;
  border: 1px solid black;
  @media (max-width: 768px) {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
`;

const NameField = styled.p`
  font-size: 50px;
  font-weight: 700;
  width: 530px;
  height: 47px;
  padding-left: 10px;
  @media (max-width: 768px) {
    font-size: 30px;
    display: flex;
    justify-content: center;
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
`;
