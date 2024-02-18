import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
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
  Backdrop,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { palette } from '@mui/system';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { IconContext } from 'react-icons/lib';
import * as Tb from 'react-icons/tb';
import * as Ai from 'react-icons/ai';

import logo from '../assets/logo.png';
import * as Fc from 'react-icons/fc';

const defaultTheme = createTheme();

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    const fields = { email, password };
    setLoader(true);
    dispatch(loginUser(fields));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      navigate('/');
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

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    //   <ThemeProvider theme={defaultTheme}>
    //     <Grid container component='main' sx={{ height: '100vh' }}>
    //       <CssBaseline />
    //       <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    //         <Typography
    //           variant='h2'
    //           sx={{ mb: 2, fontFamily: 'Comfortaa', color: '#ffa000' }}
    //         >
    //           Login
    //         </Typography>
    //         <Typography variant='h5' sx={{ fontFamily: 'Comfortaa' }}>
    //           Bem-vindo(a) de volta!
    //         </Typography>
    //         <Box
    //           component='form'
    //           noValidate
    //           onSubmit={handleSubmit}
    //           sx={{ mt: 2, fontFamily: 'Comfortaa' }}
    //         >
    //           <TextField
    //             margin='normal'
    //             required
    //             fullWidth
    //             id='email'
    //             label='Digite seu email'
    //             name='email'
    //             autoComplete='email'
    //             autoFocus
    //             error={emailError}
    //             helperText={emailError && 'Email é necessário'}
    //             onChange={handleInputChange}
    //           />

    //           <TextField
    //             margin='normal'
    //             required
    //             fullWidth
    //             name='password'
    //             label='Senha'
    //             type={toggle ? 'text' : 'password'}
    //             id='password'
    //             autoComplete='current-password'
    //             error={passwordError}
    //             helperText={passwordError && 'Senha é necessária'}
    //             onChange={handleInputChange}
    //             InputProps={{
    //               endAdornment: (
    //                 <InputAdornment position='end'>
    //                   <IconButton onClick={() => setToggle(!toggle)}>
    //                     {toggle ? <Visibility /> : <VisibilityOff />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               ),
    //             }}
    //           />
    //           <Grid
    //             container
    //             sx={{ display: 'flex', justifyContent: 'space-between' }}
    //           >
    //             <FormControlLabel
    //               control={<Checkbox value='remember' color='primary' />}
    //               label='Manter conectado'
    //             />
    //             <StyledLink href='#' sx={{ fontFamily: 'Comfortaa' }}>
    //               Esqueceu a senha?
    //             </StyledLink>
    //           </Grid>
    //           <LightPurpleButton
    //             type='submit'
    //             fullWidth
    //             variant='contained'
    //             sx={{ mt: 3, fontFamily: 'Comfortaa' }}
    //           >
    //             {loader ? (
    //               <CircularProgress size={24} color='inherit' />
    //             ) : (
    //               'Login'
    //             )}
    //           </LightPurpleButton>

    //           <Grid container>
    //             <Grid>Não tem uma conta?</Grid>
    //             <Grid item sx={{ ml: 2, fontFamily: 'Comfortaa' }}>
    //               <StyledLink to='/choose'>Cadastrar</StyledLink>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </Grid>
    //       <Grid width={100} /> <StyledImg src={logo} />
    //     </Grid>

    //     <Popup
    //       message={message}
    //       setShowPopup={setShowPopup}
    //       showPopup={showPopup}
    //     />
    //   </ThemeProvider>

    <GlobalForm>
      <FormContainer>
        <Form action='' className='form' onSubmit={handleSubmit}>
          <FormSpan>
            <FormImg src={logo} />
            <FormH1>Entrar</FormH1>
          </FormSpan>
          <FormField>
            <IconContext.Provider value={{ color: '#ffa000' }}>
              <Tb.TbMailFilled />
              <InputField
                required
                id='email'
                placeholder='Digite seu email'
                name='email'
                autoComplete='off'
                onChange={handleInputChange}
              />
            </IconContext.Provider>
          </FormField>

          <FormField>
            <Fc.FcKey />
            <InputField
              required
              name='password'
              placeholder='Senha'
              type={passwordShown ? 'text' : 'password'}
              id='password'
              autoComplete='off'
              onChange={handleInputChange}
            />
            <StyledSpan className='showPassword' onClick={togglePassword}>
              {passwordShown ? (
                <Ai.AiOutlineEye />
              ) : (
                <Ai.AiOutlineEyeInvisible />
              )}
            </StyledSpan>
          </FormField>

          <LightPurpleButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, fontFamily: 'Comfortaa' }}
          >
            {loader ? <CircularProgress size={24} color='inherit' /> : 'Entrar'}
          </LightPurpleButton>
        </Form>
        {/*  <FormControlLabel 
            control={<Checkbox value='remember' color='primary' />}
            label='Manter conectado'
          /> */}
    {/*     <Grid container>
          <StyledLink to='/forgot-password'>Esqueceu sua senha?</StyledLink>
        </Grid> */}

        <Grid container>
          <StyledLink to='/choose'>Cadastrar-se</StyledLink>
        </Grid>
      </FormContainer>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </GlobalForm>
  );
};

export default LoginPage;

const GlobalForm = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #e9e9e9;
  @media (max-width: 768px) {
    height: 100%;
    margin-top: 5rem;
  }
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
  width: 500px;
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
  margin-top: 10px;
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
  display: flex;
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
