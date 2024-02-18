import { current } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import Photo from '../../assets/fotos.svg';
import PhotosIcon from '../../assets/photo.svg';
import { Link } from 'react-router-dom';

const CompanyPhotos = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ContainerPhoto>
      <NameField>{currentUser.name}</NameField>
      <ContentPhoto>
        <IconPhoto>
          <ImgIcon src={PhotosIcon} />
          <ImgIcon src={PhotosIcon} />
          <ImgIcon src={PhotosIcon} />
          <ImgIcon src={PhotosIcon} />
          <ImgIcon src={PhotosIcon} />
          <ImgIcon src={PhotosIcon} />
        </IconPhoto>
        <RightPhoto>
          <PhotoImg src={Photo} />
          <ButtonContact>
            <AddPhoto>Colocar Foto</AddPhoto>

            <RemovePhoto>Remover Foto</RemovePhoto>
          </ButtonContact>
        </RightPhoto>
      </ContentPhoto>
    </ContainerPhoto>
  );
};

export default CompanyPhotos;

const ContainerPhoto = styled.div`
  display: block;
  width: 100%;
`;

const NameField = styled.p`
  margin: 40px;
  display: block;
  font-size: 40px;
  font-weight: 700;
`;

const ContentPhoto = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  @media (max-width: 768px) {
    display: block;
  }
`;

const IconPhoto = styled.div`
  display: grid;
  grid: repeat(2, 200px) / auto-flow 250px;
  gap: 15px;
  cursor: pointer;
  @media (max-width: 768px) {
    grid: repeat(3, 150px) / auto-flow 150px;
  }
`;

const ImgIcon = styled.img`
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const RightPhoto = styled.div`
  align-items: center;
  justify-content: center;
`;

const PhotoImg = styled.img`
  width: 390px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;

const AddPhoto = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  height: 30px;
  width: 200px;
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

const RemovePhoto = styled.div`
  padding: 10px;
  display: flex;
  width: 200px;
  text-align: center;
  align-items: center;
  justify-content: center;
  float: center;
  height: 30px;
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
