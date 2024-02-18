import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../../assets/designlogin.jpg";
import { LightPurpleButton } from "../../components/buttonStyles";
import { registerUser } from "../../redux/userRelated/userHandle";
import styled from "styled-components";
import Popup from "../../components/Popup";
import logo from "../../assets/logo.png";
import { IconContext } from "react-icons/lib";
import * as Tb from "react-icons/tb";
import * as Fc from "react-icons/fc";
import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";
import ReactInputMask from "react-input-mask";
import dayjs from "dayjs";

const defaultTheme = createTheme();

const ClientRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cpfError, setCpfError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [birthError, setBirthError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const role = "Client";

  const handleSubmit = (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const cpf = event.target.cpf.value;
    const phone = event.target.phone.value;
    const occupation = event.target.occupation.value;
    const password = event.target.password.value;
    const birth = event.target.birth.value;
    const confirmPassword = event.target.confirmPassword.value;
    const city = event.target.city.value;
    const state = event.target.state.value;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !cpf ||
      !phone ||
      !confirmPassword ||
      !city ||
      !state ||
      !occupation ||
      !birth
    ) {
      if (!firstName) setFirstNameError(true);
      if (!lastName) setLastNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      if (!cpf) setCpfError(true);
      if (!confirmPassword) setConfirmPasswordError(true);
      if (!city) setCityError(true);
      if (!phone) setPhoneError(true);
      if (!state) setStateError(true);
      if (!occupation) setOccupationError(true);
      if (!birth) setBirthError(true);
      return;
    }

    const fields = {
      firstName,
      lastName,
      email,
      cpf,
      phone,
      password,
      occupation,
      birth,
      confirmPassword,
      address: {
        city,
        state,
      },
      role,
    };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "firstName") setFirstNameError(false);
    if (name === "lastName") setLastNameError(false);
    if (name === "email") setEmailError(false);
    if (name === "cpf") setCpfError(false);
    if (name === "password") setPasswordError(false);
    if (name === "confirmPassword") setConfirmPasswordError(false);
    if (name === "phone") setPhoneError(false);
    if (name === "city") setCityError(false);
    if (name === "state") setStateError(false);
    if (name === "occupation") setOccupationError(false);
    if (name === "birth") setBirthError(false);
  };

  useEffect(() => {
    if (
      status === "success" ||
      (currentUser !== null && currentRole === "Client")
    ) {
      navigate("/");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      console.log(error);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              Cadastro de Candidato
            </Typography>
            <Typography variant="h7">
              Poste seu currículo para concorrer a vagas.
              <br />
              Você poderá visualizar vagas de emprego.
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <FormContent>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  name="firstName"
                  autoComplete="off"
                  autoFocus
                  error={firstNameError}
                  helperText={firstNameError && "Nome é necessário"}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="off"
                  autoFocus
                  error={lastNameError}
                  helperText={lastNameError && "Sobrenome é necessário"}
                  onChange={handleInputChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={emailError && "Email é necessário"}
                  onChange={handleInputChange}
                />
              </FormContent>
              <FormContent>
                <ReactInputMask
                  mask="999.999.999-99"
                  onChange={handleInputChange}
                >
                  {() => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="cpf"
                      label="CPF"
                      name="cpf"
                      autoComplete="off"
                      autoFocus
                      error={cpfError}
                      helperText={cpfError && "CPF é necessário"}
                    />
                  )}
                </ReactInputMask>

                <ReactInputMask
                  mask="+55 (99)99999-9999"
                  onChange={handleInputChange}
                >
                  {() => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="Telefone"
                      name="phone"
                      autoComplete="off"
                      autoFocus
                      error={phoneError}
                      helperText={phoneError && "Telefone é necessário"}
                    />
                  )}
                </ReactInputMask>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="Cidade"
                  name="city"
                  autoComplete="off"
                  autoFocus
                  error={cityError}
                  helperText={cityError && "Cidade é necessária"}
                  onChange={handleInputChange}
                />
              </FormContent>

              <FormContent>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="state"
                  label="Estado"
                  name="state"
                  autoComplete="off"
                  autoFocus
                  error={stateError}
                  helperText={stateError && "Estado é necessário"}
                  onChange={handleInputChange}
                />

                <TextField
                  margin="normal"
                  type="date"
                  required
                  fullWidth
                  data-date=""
                  data-date-format="dd/mm/yyyy"
                  InputProps={{
                    inputProps: { min: "1900-01-01", max: "2007-12-05" },
                  }}
                  id="birth"
                  placeholder="Data de Nascimento"
                  name="birth"
                  autoComplete="off"
                  autoFocus
                  error={birthError}
                  helperText={birthError && "Data de nascimento é necessária"}
                  onChange={handleInputChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="occupation"
                  label="Ocupação"
                  name="occupation"
                  autoComplete="off"
                  autoFocus
                  error={occupationError}
                  helperText={occupationError && "Ocupação é necessária"}
                  onChange={handleInputChange}
                />
              </FormContent>

              <FormContent>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type={passwordShown ? "text" : "password"}
                  id="password"
                  autoComplete="off"
                  error={passwordError}
                  helperText={passwordError && "Senha é necessária"}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePassword}>
                          {passwordShown ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar senha"
                  type={confirmPasswordShown ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="off"
                  error={confirmPasswordError}
                  helperText={
                    confirmPasswordError && "Confirmação de senha é necessária"
                  }
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleConfirmPassword}>
                          {confirmPasswordShown ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormContent>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              ></Grid>
              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Registrar"
                )}
              </LightPurpleButton>
              <Grid container>
                <Grid>Já tem uma conta?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  <StyledLink to="/login">Entrar</StyledLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          width="30px"
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundPosition: "center",
            width: "30px",
          }}
        />
      </Grid>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </ThemeProvider>
  );
};

export default ClientRegisterPage;

const GlobalForm = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #e9e9e9;
`;

const FormSpan = styled.span`
  display: inline-block;
  text-align: center;
`;

const FormImg = styled.img`
  width: 80px;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  box-sizing: border-box;
  max-height: auto;
  padding: 20px;
  margin-top: 20px;
  margin-right: 5rem;
  width: 70rem;
  box-shadow: #eee;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  margin: 20px;
  border-bottom: var(--dullOrange) 2px solid;
  font-size: 25px;
  padding-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 10px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  font-size: 16px;
  &:hover {
    transition: 0.5s;
    color: #ff5e3c;
  }
`;

const StyledImg = styled.img`
  display: flex;
  margin: auto;
  width: 400px;
  height: 550px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 2fr 2fr;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  cursor: pointer;
  transition: 0.5s ease-in-out;
`;

const FormH1 = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 800;
`;

const InputField = styled.input`
  margin: 2px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  top: 0;
  left: 0;
  height: 30px;
  outline: none;
  border-radius: 5px;
  padding: 4px 20px 0;
  width: 100%;
`;

const FormContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;
