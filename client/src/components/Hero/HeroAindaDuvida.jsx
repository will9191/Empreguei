import React from 'react';
import AindaDuvida from '../../assets/AindaDuvida.png';
import styled from 'styled-components';

const HeroAindaDuvida = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Form action='https://formspree.io/f/mjvqznor' method='post'>
          {' '}
          <HeroTitle>Ainda tem dúvidas?</HeroTitle>
          <HeroSub>Nos envie uma mensagem para te ajudarmos!</HeroSub>
          <Field>
            {' '}
            <Dp>
              <Label for='email'>Nome:</Label>
              <Input
                name='Name'
                id='Name'
                type='Name'
                placeholder='Nome'
              ></Input>
            </Dp>
            <Dp>
              {' '}
              <Label for='email'>Email:</Label>
              <Input
                name='Email'
                id='email'
                type='email'
                placeholder='Email'
              ></Input>
            </Dp>{' '}
          </Field>{' '}
          <Label for='email'>Sua Dúvida:</Label>
          <TextArea
            name='text'
            id='text'
            type='text'
            placeholder='Sua dúvida'
          ></TextArea>
          <Button type='submit'>ENVIAR</Button>
        </Form>
      </HeroContent>{' '}
      <HeroImg src={AindaDuvida} />
    </HeroContainer>
  );
};

export default HeroAindaDuvida;

const HeroContainer = styled.div`
  display: flex;

  background-size: auto;
  justify-content: center;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const HeroContent = styled.section`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
`;

const Dp = styled.div``;

const HeroTitle = styled.h1`
  color: black;
  text-transform: uppercase;
  font-size: 48px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.015em;
  text-align: center;
  padding-top: 50px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const HeroSub = styled.h2`
  color: black;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.015em;
  text-align: center;
  padding-top: 50px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const HeroImg = styled.img`
  width: 662px;
  height: 662px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  align-items: baseline;
  display: flex;
`;

const Input = styled.input`
  height: 65px;
  width: 300px;
  border: none;
  background: rgba(196, 196, 196, 0.53);
  box-shadow: 0px 4px 4px #00297a;
  border-radius: 20px;
  margin: 10px;
  padding: 10px 50px 10px 10px;
  transition: 0.5s ease-in-out;
  &:focus {
    outline: 0;
    background: rgba(161, 160, 160, 0.53);
    transition: 0.3s ease-in-out;
  }
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const TextArea = styled.textarea`
  border: none;
  height: 300px;
  background: rgba(196, 196, 196, 0.53);
  box-shadow: 0px 4px 4px #00297a;
  border-radius: 20px;
  width: 95%;
  margin: 10px;
  padding: 10px;
  transition: 0.5s ease-in-out;
  &:focus {
    outline: 0;
    background: rgba(161, 160, 160, 0.53);
    transition: 0.3s ease-in-out;
  }
`;

const Button = styled.button`
  width: 291px;
  height: 84px;
  background: #00297a;
  border-radius: 50px;
  font-family: 'Comfortaa';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 140.62%;
  color: #ffffff;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #ff5e3c;
    transition: 0.5s ease-in-out;
  }
`;
