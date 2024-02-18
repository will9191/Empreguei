import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppBar, Drawer } from "../../components/styles";
import Logout from "../Logout";
import SideBar from "./AdminSideBar";
import AdminProfile from "./AdminProfile";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import AccountMenu from "../../components/AccountMenu";

import AdminHomePage from "./AdminHomePage";
import AdminCompanies from "./AdminCompanies";
import AdminClients from "./AdminClients";
import AdminConfig from "./AdminConfig";
import AdminCategories from "./AdminCategories";
import AdminControl from "./AdminControl";
import AdminJobs from "./AdminJobs";



const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Nav>
        <Group to="/">
          <Logo src={logo} />
          <LogoText>mpreguei</LogoText>
        </Group>

        <MenuContainer>
          Olá, {currentUser.firstName}
          <AccountMenu />
        </MenuContainer>
      </Nav>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
        <Route path="/Admin/profile" element={<AdminProfile />} />
        <Route element={<SideBar />}></Route>
        <Route path="/logout" element={<Logout />} />

        <Route element={<SideBar />}>
          <Route path='/' index element={<AdminHomePage />} />
          <Route
            path='/Admin/Companies'
            index
            element={<AdminCompanies />}
          />
          <Route
            path='/Admin/Clients'
            index
            element={<AdminClients />}
          />
             <Route
            path='/Admin/Jobs'
            index
            element={<AdminJobs />}
          />
            <Route
            path='/Admin/Categories'
            index
            element={<AdminCategories />}
          />
            <Route
            path='/Admin/Admins'
            index
            element={<AdminControl />}
          />
          <Route
            path='/Admin/Config'
            index
            element={<AdminConfig />}
          />
        </Route>
      </Routes>
    </Container>
  );
};

export default AdminDashboard;

const Container = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 175.5%;
  }
`;

const Nav = styled.nav`
  display: flex;
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.8);
  background-color: var(--white);
  align-items: center;
  padding: 20px 0px 0px 20px;
  justify-content: space-between;
  height: 10vh;
  @media (max-width: 768px) {
    transition: 0.5s ease-in-out;
  }
`;

const Logo = styled.img`
  height: 80px;
  padding: 0;
  @media (max-width: 768px) {
    width: 50px;
  }
`;

const LogoText = styled.p`
  font-size: 50px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Group = styled(Link)`
  display: flex;
  align-items: end;
  text-decoration: none;
  color: black;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MenuContainer = styled.div`
  margin-right: 2rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
`;

const Pic = styled.img`
  width: 64px;
  height: 63px;
  border-radius: 50%;
`;
