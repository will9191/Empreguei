import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, CircularProgress, Backdrop } from "@mui/material";
import { AccountCircle, School, Group, Widgets } from "@mui/icons-material";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";
import { Link } from "react-router-dom";

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      navigate("/AdminRegister");
    } else if (user === "Company") {
      navigate("/CompanyRegister");
    } else if (user === "Client") {
      navigate("/ClientRegister");
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Company") {
        navigate("/Company/dashboard");
      } else if (currentRole === "Client") {
        navigate("/Client/dashboard");
      }
    } else if (status === "error") {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <ContentCompany>
          <div onClick={() => navigateHandler("Company")}>
            <Link
              to="/CompanyRegister"
              style={{ color: "#00247d", textDecoration: "none" }}
            >
              <PrincipalCompany>
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <StyledTypography>Empresa</StyledTypography>
                Entre como empresa para criar novas oportunidades de empregos
              </PrincipalCompany>
            </Link>
          </div>
        </ContentCompany>

        <ContentClient>
          <div onClick={() => navigateHandler("Client")}>
            <Link
              to="/ClientRegister"
              style={{ color: "#00247d", textDecoration: "none" }}
            >
              <PrincipalClient>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>Cliente</StyledTypography>
                Entre como cliente para buscar novas oportunidades para sua
                carreira
              </PrincipalClient>
            </Link>
          </div>
        </ContentClient>
      </Container>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Por favor, Espere!
      </Backdrop>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  height: 100vh;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #00247d;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  &:hover {
    background-color: #00247d;
    color: white;
  }
`;

const StyledTypography = styled.h2``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 2fr;
  }
`;

const ContentCompany = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  height: 100vh;
  background-color: black;
  color: white;
  width: 50%;
  @media (max-width: 768px) {
    height: 50vh;
    width: auto;
  }
`;

const PrincipalCompany = styled.div`
  display: flex;
  gap: 10px;
  height: 100vh;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 50vw;
  transition: 0.8s ease-in-out;
  &:hover {
    transition: 0.8s ease-in-out;
    width: 50vw;
    background-color: white;
    color: black;
    border-right: 2px solid black;
  }
`;

const ContentClient = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50%;
  width: 50vw;
  transition: 0.8s ease-in-out;
  &:hover {
    transition: 0.8s ease-in-out;
    width: 50vw;
    background-color: black;
    color: white;
  }
  @media (max-width: 768px) {
    height: 50vh;
    width: auto;
  }
`;

const PrincipalClient = styled.div`
  height: 100vh;
  gap: 15px;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: black;
  width: 50vw;
  transition: 0.8s ease-in-out;
  &:hover {
    transition: 0.8s ease-in-out;
    width: 50vw;
    background-color: black;
    color: white;
    border-left: 1px solid white;
  }
`;
