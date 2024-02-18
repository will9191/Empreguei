import React from 'react';
import './page-not-found.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import imgerror from '../../assets/404errorDog.png';

const PageNotFound = () => {
  return (
    <div className='container-not-found'>
      <div className='nav-container-not-found'>
        <div className='planet'></div>
        <div className='button-found-register'>
          <button className='btn btn-register' to='/register'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path fill='none' d='M0 0h24v24H0z'></path>
              <path
                fill='currentColor'
                d='M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'
              ></path>
            </svg>
            <span>Cadastrar</span>
          </button>
        </div>
      </div>

      <div className='content-found'>
        <div className='text-found'>
          <h2>
            <span>Perdido</span> no <br /> espaço ?
            <p>
              Viajou tanto que você venho parar perto de saturno! <br />
              Não se preocupe, o Empreguei veio te buscar de foguete. 🚀
            </p>
          </h2>
        
          <button className='btn btn-home' to='/'>
            <svg
              height='16'
              width='16'
              xmlns='http://www.w3.org/2000/svg'
              version='1.1'
              viewBox='0 0 1024 1024'
            >
              <path d='M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z'></path>
            </svg>
            <span>Início</span>
          </button>
        </div>

        <div className='right-found'>
          <img className='img-not-found' src={imgerror} />
        </div>
      </div>
      <footer className='footer-not-found'>
        © 2023 - Todos os direitos Reservados
      </footer>
    </div>
  );
};

export default PageNotFound;
