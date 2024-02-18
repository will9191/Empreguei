import { current } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import imgBgEdit from '../../assets/perfilmenina.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserPicture } from '../../redux/userRelated/userHandle';

const AdminEditPhoto = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, response, error, status } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const address = 'Company';

  const [picture, setPicture] = useState(currentUser.picture);
  const [preview, setPreview] = useState('');
  const [remove, setRemove] = useState(
    'https://cdn-icons-png.flaticon.com/512/5984/5984357.png'
  );

  const [edit, setEdit] = useState(false);

  const handlePicture = async (e) => {
    const file = e.target.files[0];
    setPicture(e.target.files[0]);
    const base64 = await convertToBase64(file);
    setPreview({ ...picture, base64 });
    setEdit(true);
  };

  const handleUndo = async () => {
    setEdit(false);
    window.location.reload(true);
  };

  const fields = { picture };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserPicture(fields, currentUser._id, address));
  };

  useEffect(() => {
    if (status === 'success') {
      window.location.reload(true);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, currentUser]);

  console.log(preview);

  return (
    <ContainerEdit>
      <ContentEdit>
        <form onSubmit={submitHandler}>
          <NameField>{currentUser.name}</NameField>

          <UserPic src={preview.base64 || picture} alt='' />

          {edit ? (
            <>
              <Button type='submit'>Salvar Logo</Button>
              <br />
              <Button onClick={handleUndo}>Cancelar Edição</Button>{' '}
            </>
          ) : (
            <>
              {' '}
              <CarregarEdit
                type='file'
                id='file-input'
                onChange={(e) => handlePicture(e)}
              />
              <Label id='file-input-label' htmlFor='file-input'>
                Carregar Logo
              </Label>
              <br />
              <Button>Remover Logo</Button>
            </>
          )}
        </form>
      </ContentEdit>
      <BgEdit>
        <ImgEdit src={imgBgEdit} />
      </BgEdit>
    </ContainerEdit>
  );
};

export default AdminEditPhoto;

const ContainerEdit = styled.div`
  display: flex;
  width: 0px;
  @media (max-width: 768px) {
    justify-content: center;
    width: auto;
  }
`;

const ContentEdit = styled.div`
  justify-content: space-between;
  text-align: center;
  margin: 90px;
`;

const NameField = styled.p`
  text-align: center;
  font-weight: 900;
  font-size: 35px;
`;

const UserPic = styled.img`
  cursor: pointer;
  border: 2px solid black;
  border-radius: 50%;
  width: 350px;
  height: 350px;
`;

const BgEdit = styled.div`
  display: flex;
  align-items: center;
`;

const ImgEdit = styled.img`
  height: 465px;
  margin-bottom: 150px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CarregarEdit = styled.input`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: var(--navyBlue);
  color: var(--white);
  border-radius: 50px;
  display: none;
  &:hover {
    transition: 1s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;

const Label = styled.label`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: var(--navyBlue);
  color: var(--white);
  border-radius: 50px;
  font-size: 16px;
  &:hover {
    transition: 1s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 10px;
  display: flex;
  outline: none;
  border: none;
  align-items: center;
  font-size: 16px;
  justify-content: center;
  height: 50px;
  background-color: var(--navyBlue);
  color: var(--white);
  width: 100%;
  border-radius: 50px;
  &:hover {
    transition: 1s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
