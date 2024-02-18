import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from '../../assets/designlogin.jpg';
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import logo from '../../assets/logo.png';
import { IconContext } from 'react-icons/lib';
import * as Tb from 'react-icons/tb';
import * as Fc from 'react-icons/fc';
import * as Ai from 'react-icons/ai';
import * as Fa from 'react-icons/fa';
import * as Bs from 'react-icons/bs';
import ReactInputMask from 'react-input-mask';

const defaultTheme = createTheme();

const CompanyRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cnpjError, setCnpjError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const role = 'Company';

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const phone = event.target.phone.value;
    const cnpj = event.target.cnpj.value;
    const city = event.target.city.value;
    const state = event.target.state.value;
    const department = event.target.department.value;
    const description = event.target.description.value;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !cnpj ||
      !city ||
      !state ||
      !department ||
      !description
    ) {
      if (!name) setNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      if (!confirmPassword) setConfirmPasswordError(true);
      if (!phone) setPhoneError(true);
      if (!cnpj) setCnpjError(true);
      if (!city) setCityError(true);
      if (!state) setStateError(true);
      if (!department) setDepartmentError(true);
      if (!description) setDescriptionError(true);

      return;
    }

    const fields = {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role,
      cnpj,
      address: {
        city,
        state,
      },
      department,
      description,
    };
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'name') setNameError(false);
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'confirmPassword') setConfirmPasswordError(false);
    if (name === 'phone') setPhoneError(false);
    if (name === 'cnpj') setCnpjError(false);
    if (name === 'city') setCityError(false);
    if (name === 'state') setStateError(false);
    if (name === 'department') setDepartmentError(false);
    if (name === 'description') setDescriptionError(false);
  };

  useEffect(() => {
    if (
      status === 'success' ||
      (currentUser !== null && currentRole === 'Company')
    ) {
      navigate('/Company/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
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
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4' sx={{ mb: 2, color: '#2c2143' }}>
              Cadastro de Empresa
            </Typography>
            <Typography variant='h7'>
              Poste vagas para atrair candidatos!
              <br />
              Você poderá visualizar vagas de emprego.
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <FormContent>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='Nome da empresa'
                  name='name'
                  autoComplete='off'
                  autoFocus
                  error={nameError}
                  helperText={nameError && 'Nome da empresa é necessário'}
                  onChange={handleInputChange}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  error={emailError}
                  helperText={emailError && 'Email é necessário'}
                  onChange={handleInputChange}
                />

                <ReactInputMask
                  mask='99.999.999/0001-99'
                  onChange={handleInputChange}
                >
                  {() => (
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='cnpj'
                      label='Cnpj'
                      name='cnpj'
                      autoComplete='off'
                      autoFocus
                      error={cnpjError}
                      helperText={cnpjError && 'Necessário CNPJ'}
                    />
                  )}
                </ReactInputMask>
              </FormContent>

              <FormContent>
                <ReactInputMask
                  mask='+55 (99)99999-9999'
                  onChange={handleInputChange}
                >
                  {() => (
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      id='phone'
                      label='Telefone'
                      name='phone'
                      autoComplete='off'
                      autoFocus
                      error={phoneError}
                      helperText={phoneError && 'Telefone é necessário'}
                    />
                  )}
                </ReactInputMask>

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='city'
                  label='Cidade'
                  name='city'
                  autoComplete='off'
                  autoFocus
                  error={cityError}
                  helperText={cityError && 'Cidade é necessária'}
                  onChange={handleInputChange}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='state'
                  label='Estado'
                  name='state'
                  autoComplete='off'
                  autoFocus
                  error={stateError}
                  helperText={stateError && 'Estado é necessário'}
                  onChange={handleInputChange}
                />
              </FormContent>

              <FormContent>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='department'
                  label='Setor da empresa'
                  name='department'
                  autoComplete='off'
                  autoFocus
                  error={departmentError}
                  helperText={departmentError && 'Setor da empresa necessário'}
                  onChange={handleInputChange}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Senha'
                  type={passwordShown ? 'text' : 'password'}
                  id='password'
                  autoComplete='off'
                  error={passwordError}
                  helperText={passwordError && 'Senha é necessária'}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={togglePassword}>
                          {passwordShown ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='Confirmar senha'
                  type={confirmPasswordShown ? 'text' : 'password'}
                  id='confirmPassword'
                  autoComplete='off'
                  error={confirmPasswordError}
                  helperText={
                    confirmPasswordError && 'Confirmação de senha é necessária'
                  }
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
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
              <TextField
                margin='normal'
                required
                fullWidth
                id='description'
                label='Descrição sobre a empresa'
                name='description'
                autoComplete='off'
                autoFocus
                inputProps={{ maxLength: '322' }}
                error={descriptionError}
                helperText={descriptionError && 'Descrição é necessária'}
                onChange={handleInputChange}
              />

              <Grid
                container
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              ></Grid>
              <LightPurpleButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Registrar'
                )}
              </LightPurpleButton>
              <Grid container>
                <Grid>Já tem uma conta?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  <StyledLink to='/login'>Entrar</StyledLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          width='30px'
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundPosition: 'center',
            width: '30px',
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

export default CompanyRegisterPage;

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
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const FormImg = styled.img`
  width: 80px;
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
  display: flex;
  text-decoration: none;
  margin-left: 10px;
  color: #000000;
  display: flex;
  text-align: center;
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
  margin-right: 10rem;
  display: grid;
  grid-template-columns: 1fr;
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
  height: 30px;
  outline: none;
  border-radius: 5px;
  padding: 4px 20px 0;
  width: calc(100% + 15rem);
`;

const AreaField = styled.textarea`
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
  height: 10.5rem;
  resize: none;
`;

const Left = styled.div``;

const Right = styled.div``;

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

const FormContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;
