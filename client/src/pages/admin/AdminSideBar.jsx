import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { NavLink as BaseNavLink } from "react-router-dom";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styled from "styled-components";

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import * as Fa from "react-icons/fa6";
import * as Md from "react-icons/md";
import * as Hi from "react-icons/hi2";
import * as Io from "react-icons/io5";
import * as Lia from "react-icons/lia";
import * as Ci from "react-icons/ci";

const AdminSideBar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const [ExtendSidebar, setExtendSidebar] = useState(false);
  const toggle = () => setExtendSidebar(!ExtendSidebar);

  const navigation = [
    { link: "/", text: "Dashboard", icon: <Md.MdOutlineSpaceDashboard /> },
    {
      link: "/Admin/Companies",
      text: "Empresas",
      icon: <Hi.HiBuildingOffice2 />,
    },
    { link: "/Admin/Clients", text: "Candidatos", icon: <Io.IoPeople /> },
    { link: "/Admin/Jobs", text: "Vagas", icon: <Lia.LiaSuitcaseSolid /> },
    { link: "/Admin/Categories", text: "Categorias", icon: <Ci.CiBoxList /> },
    {
      link: "/Admin/Admins",
      text: "Admins",
      icon: <Md.MdOutlineAdminPanelSettings />,
    },
    { link: "/Admin/Config", text: "Configurações", icon: <Fa.FaGear /> },
  ];

  return (
    <SideContainer>
      <Sidebar>
        {ExtendSidebar && (
          <SidebarExtendedContainer>
            <SideResMenu>
              {navigation.map((nav, index) => (
                <SideItem onClick={toggle} key={index}>
                  <Icon>{nav.icon}</Icon>
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
          {navigation.map((nav, index) => (
            <SideItem onClick={toggle} key={index}>
              <Icon>{nav.icon}</Icon>
              <NavLink to={nav.link}>{nav.text}</NavLink>
            </SideItem>
          ))}
        </SideMenu>
        <Outlet />
      </Sidebar>
    </SideContainer>
  );
};

export default AdminSideBar;

const SideContainer = styled.div``;

const Sidebar = styled.div`
  display: flex;
  box-shadow: 8px 0px 5px 0px rgba(0, 0, 0, 0.1);
`;

const SideMenu = styled.ul`
  box-shadow: 8px 0px 5px 0px rgba(0, 0, 0, 0.332);
  background: var(--gray);
  height: auto;
  width: 273px;
  text-decoration: none;
  color: black;
  padding: 30px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Icon = styled.div`
  font-size: 35px;
  margin-right: 5px;
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
  height: auto;
  color: black;
  padding: 30px;
`;

const SideItem = styled.li`
  margin: 50px;
  margin-top: 10px;
  list-style: none;
  color: black;
  font-weight: 400;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    margin-left: 5rem;
  }
`;

const NavLink = styled(BaseNavLink)`
  color: black;
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  &.active {
    color: #00247d;
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 20px;
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
cursor: pointer;
  margin: 0.5rem;
  font-size: 40px;
  color: white;
`;

const ExtendButton = styled.div`
  margin-left: 16rem;
  cursor: pointer;
`;
