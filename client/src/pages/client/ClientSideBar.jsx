import * as React from 'react';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styled from 'styled-components';

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClientSideBar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const [ExtendSidebar, setExtendSidebar] = useState(false);
  const toggle = () => setExtendSidebar(!ExtendSidebar);

  const navigation = [
    { link: '/profile', text: 'Meu perfil' },
    { link: '/Client/edit-photo', text: 'Editar Foto' },
    { link: '/Client/Curriculum', text: 'Currículo' },

    { link: '/Client/Contact', text: 'Contato' },
    { link: '/Client/Account', text: 'Minha Conta' },
  ];

  return (
    <SideContainer>
      <Sidebar>
        {ExtendSidebar && (
          <SidebarExtendedContainer>
            <SideResMenu>
              <SideItem>
                <NavLink to='/profile' onClick={toggle}>
                  <Pfp src={currentUser.picture}></Pfp>
                </NavLink>
              </SideItem>

              {navigation.map((nav, index) => (
                <SideItem onClick={toggle} key={index}>
                  <NavLink to={nav.link}>{nav.text}</NavLink>
                </SideItem>
              ))}
            </SideResMenu>
          </SidebarExtendedContainer>
        )}
        <ButtonRes
          onClick={() => {
            setExtendSidebar((curr) => !curr);
          }}
        >
          {ExtendSidebar ? (
            <ExtendButton>&#10005;</ExtendButton>
          ) : (
            <SetButton> &#8801; </SetButton>
          )}
        </ButtonRes>
        <SideMenu>
          <SideItem>
            <NavLink to='/profile'>
              <Pfp src={currentUser.picture}></Pfp>
            </NavLink>
          </SideItem>

          {navigation.map((nav, index) => (
            <SideItem onClick={toggle} key={index}>
              <NavLink to={nav.link}>{nav.text}</NavLink>
            </SideItem>
          ))}
        </SideMenu>
        <Outlet />
      </Sidebar>
    </SideContainer>
  );
};

export default ClientSideBar;

const SideContainer = styled.div``;

const Sidebar = styled.div`
  display: flex;
  box-shadow: 8px 0px 5px 0px rgba(0, 0, 0, 0.1);
`;

const SideMenu = styled.ul`
  box-shadow: 8px 0px 5px 0px rgba(0, 0, 0, 0.332);
  background: var(--gray);
  height: auto;
  text-decoration: none;
  color: black;
  padding: 30px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarExtendedContainer = styled.div`
  transition: 0.5s ease-in-out;
  display: none;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const SideResMenu = styled.ul`
  background: var(--gray);
  transition: 1s ease-in-out;
  position: absolute;
  margin-left: 14rem;
  text-decoration: none;
  height: 100%;
  color: black;
  padding: 30px;
`;

const SideItem = styled.li`
  margin: 20px;
  list-style: none;
  color: black;
  font-weight: 400;
`;

const Pfp = styled.img.attrs(({ src }) => ({
  src: src,
  alt: 'User picture',
}))`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid black;
  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
  }
`;

const NavLink = styled(BaseNavLink)`
  color: black;
  text-decoration: none;
  font-weight: 700;
  font-size: 21px;
  line-height: 30px;
  &.active {
    color: #00247d;
    text-decoration: underline;
  }
`;

const ButtonRes = styled.div`
  font-size: 35px;
  margin-left: 10px;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
  }
`;

const SetButton = styled.div`
  margin: 0.5rem;
`;

const ExtendButton = styled.div`
  margin-left: 11rem;
`;
