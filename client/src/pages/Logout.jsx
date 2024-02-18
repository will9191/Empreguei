import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
  
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LogoutContainer>
      <h1>{currentUser.name}</h1>
      <h1>{currentUser.firstName}</h1>
      <LogoutMessage>Tem certeza que deseja sair?</LogoutMessage>
      <LogoutButtonLogout onClick={handleLogout}>Sair</LogoutButtonLogout>
      <LogoutButtonCancel onClick={handleCancel}>Não quero sair</LogoutButtonCancel>
    </LogoutContainer>
  );
};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  height: 500px;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #d3d3d3;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  margin: 20px; 
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #646464;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ff5e3c;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #0335b5;
`;
