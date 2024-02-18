import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  updateUserInfo,
} from '../../redux/userRelated/userHandle';
import * as Bs from 'react-icons/bs';
import * as Bi from 'react-icons/bi';
import * as Lia from 'react-icons/lia';
import contImg from '../../assets/contato.png';
import ReactInputMask from 'react-input-mask';

const CompanyContact = () => {
  const { currentUser, status, error, response } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState(currentUser?.email);
  const [phone, setPhone] = useState(currentUser?.phone);
  const [city, setCity] = useState(currentUser?.address?.city);
  const [state, setState] = useState(currentUser?.address?.state);
  const [facebook, setFacebook] = useState(currentUser?.media?.facebook);
  const [whatsapp, setWhatsapp] = useState(currentUser?.media?.whatsapp);
  const [instagram, setInstagram] = useState(currentUser?.media?.instagram);
  const [linkedin, setLinkedin] = useState(currentUser?.media?.linkedin);
  const [telegram, setTelegram] = useState(currentUser?.media?.telegram);

  const [edit, setEdit] = useState(false);

  const address = 'company';

  const fields = {
    email,
    phone,
    address: {
      city,
      state,
    },
    media: {
      facebook,
      whatsapp,
      instagram,
      linkedin,
      telegram,
    },
  };

  const id = currentUser._id;

  const saveEdit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(fields, currentUser._id, address));
  };

  useEffect(() => {
    dispatch(getUserDetails(id, address));
    setLoading(false);
  }, [dispatch, id, address]);

  useEffect(() => {
    if (status === 'success') {
      window.location.reload(true);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage('Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, error, response, currentUser]);

  console.log(currentUser);

  return (
    <ContainerCont>
      {edit ? (
        <>
          {' '}
          <LeftCont>
            <Content>
              <NameField>{currentUser.name}</NameField>
            </Content>

            <Content>
              <Title>Email:</Title>
              <InputField>
                <Input
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputField>
            </Content>

            <Content>
              <Title>Telefone:</Title>
              <InputField>
                <Input
                  as={ReactInputMask}
                  mask='+55 (99)99999-9999'
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputField>
            </Content>

            <Content>
              <Title>Endereço:</Title>
              <InputField>
                <Input
                  type='text'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />{' '}
                ,
                <Input
                  type='text'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </InputField>
            </Content>
          </LeftCont>
          <>
            <MediaLink>
              <ContentMediaLink>
                <Bi.BiLogoFacebook />
              </ContentMediaLink>
              <InputMedialink>
                <EditMedialink
                  type='text'
                  value={facebook}
                  placeholder='Adicionar Facebook'
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </InputMedialink>
            </MediaLink>

            <MediaLink>
              <ContentMediaLink>
                <Bs.BsWhatsapp />
              </ContentMediaLink>
              <InputMedialink>
                <EditMedialink
                  type='text'
                  value={whatsapp}
                  placeholder='Adicionar Whatsapp'
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </InputMedialink>
            </MediaLink>

            <MediaLink>
              <ContentMediaLink>
                <Bs.BsInstagram />
              </ContentMediaLink>
              <InputMedialink>
                <EditMedialink
                  type='text'
                  value={instagram}
                  placeholder='Adicionar Instagram'
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </InputMedialink>
            </MediaLink>

            <MediaLink>
              <ContentMediaLink>
                <Bi.BiLogoLinkedin />
              </ContentMediaLink>
              <InputMedialink>
                <EditMedialink
                  type='text'
                  value={linkedin}
                  placeholder='Adicionar Linkedin'
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </InputMedialink>
            </MediaLink>

            <MediaLink>
              <ContentMediaLink>
                <Lia.LiaTelegramPlane />
              </ContentMediaLink>
              <InputMedialink>
                <EditMedialink
                  type='text'
                  value={telegram}
                  placeholder='Adicionar Telegram'
                  onChange={(e) => setTelegram(e.target.value)}
                />
              </InputMedialink>
            </MediaLink>
          </>
          <RightCont>
            <ContImg>
              <Img src={contImg} />
            </ContImg>

            <ButtonContact>
              <EditCurriculum onClick={() => setEdit(false)}>
                Cancelar Edição
              </EditCurriculum>

              <SaveCurriculum onClick={saveEdit}>Salvar Dados</SaveCurriculum>
            </ButtonContact>
          </RightCont>
        </>
      ) : (
        <>
          {' '}
          <LeftCont>
            <Content>
              <NameField>{currentUser.name}</NameField>
            </Content>

            <Content>
              <Title>Email:</Title>
              <InputField>{currentUser.email}</InputField>
            </Content>

            <Content>
              <Title>Telefone:</Title>
              <InputField>{currentUser.phone}</InputField>
            </Content>

            <Content>
              <Title>Endereço:</Title>
              <InputField>
                {currentUser.address.city}, {currentUser.address.state}
              </InputField>
            </Content>
          </LeftCont>
          <>
            {currentUser?.media?.facebook ? (
              <MediaLink to={currentUser?.media?.facebook} target='_blank'>
                <ContentMediaLink>
                  <Bi.BiLogoFacebook />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>{currentUser?.media?.facebook}</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            ) : (
              <MediaLink>
                <ContentMediaLink>
                  <Bi.BiLogoFacebook />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>Não atribuída</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            )}

            {currentUser?.media?.whatsapp ? (
              <MediaLink to={currentUser?.media?.whatsapp} target='_blank'>
                <ContentMediaLink>
                  <Bs.BsWhatsapp />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>{currentUser?.media?.whatsapp}</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            ) : (
              <MediaLink>
                <ContentMediaLink>
                  <Bs.BsWhatsapp />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>Não atribuída</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            )}

            {currentUser?.media?.instagram ? (
              <MediaLink to={currentUser?.media?.instagram} target='_blank'>
                <ContentMediaLink>
                  <Bs.BsInstagram />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>{currentUser?.media?.instagram}</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            ) : (
              <MediaLink>
                <ContentMediaLink>
                  <Bs.BsInstagram />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>Não atribuída</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            )}

            {currentUser?.media?.linkedin ? (
              <MediaLink to={currentUser?.media?.linkedin} target='_blank'>
                <ContentMediaLink>
                  <Bi.BiLogoLinkedin />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>{currentUser?.media?.linkedin}</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            ) : (
              <MediaLink>
                <ContentMediaLink>
                  <Bi.BiLogoLinkedin />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>Não atribuída</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            )}

            {currentUser?.media?.telegram ? (
              <MediaLink to={currentUser?.media?.telegram} target='_blank'>
                <ContentMediaLink>
                  <Lia.LiaTelegramPlane />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>{currentUser?.media?.telegram}</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            ) : (
              <MediaLink>
                <ContentMediaLink>
                  <Lia.LiaTelegramPlane />
                </ContentMediaLink>
                <InputMedialink>
                  <TextMediaLink>Não atribuída</TextMediaLink>
                </InputMedialink>
              </MediaLink>
            )}
          </>
          <RightCont>
            <ContImg>
              <Img src={contImg} />
            </ContImg>

            <ButtonContact>
              <EditCurriculum onClick={() => setEdit(true)}>
                Editar Dados
              </EditCurriculum>

              <SaveCurriculum onClick={saveEdit}>Salvar Dados</SaveCurriculum>
            </ButtonContact>
          </RightCont>
        </>
      )}
    </ContainerCont>
  );
};

export default CompanyContact;

const ContainerCont = styled.div`
  margin: 50px;
  @media (max-width: 768px) {
    width: auto;
    margin: 70px;
  }
`;

const Content = styled.div``;

const LeftCont = styled.div``;

const NameField = styled.p`
  font-size: 40px;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-size: 25px;
  margin: 10px;
  display: flex;
  align-items: center;
`;

const InputField = styled.div`
  background-color: #ececec;
  color: gray;
  width: 1000px;
  height: 40px;
  border-radius: 50px;
  margin-left: 10px;
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 120%;
  }
`;

const Input = styled.input`
  background-color: #ececec;
  color: gray;
  outline: none;
  width: 1000px;
  height: 40px;
  border-radius: 50px;
  margin-left: 10px;
  font-size: 25px;
  margin-top: 10px;
  border: none;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 120%;
  }
`;

const MediaLink = styled(Link)`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  font-size: 30px;
  padding: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 30px 20px;
  text-decoration: none;
  text-decoration-line: none;
  list-style: none;
`;

const RightCont = styled.div`
  display: flex;
`;

const ContImg = styled.div``;

const Img = styled.img`
  width: 351px;
  background-color: #729bf5;
  height: 326px;
  border-radius: 151.5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const InputMedialink = styled.div`
  display: flex;
`;

const EditMedialink = styled.input`
  background-color: #ececec;
  color: gray;
  outline: none;
  width: 910px;
  border: none;
  height: 40px;
  border-radius: 50px;
  margin-left: 10px;
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 170%;
    font-size: 17px;
  }
`;

const TextMediaLink = styled.p`
  background-color: #ececec;
  color: gray;
  width: 910px;
  height: 40px;
  border-radius: 50px;
  margin-left: 10px;
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    width: 170%;
    font-size: 17px;
  }
`;

const ContentMediaLink = styled.div`
  margin-right: 20px;
`;

const ButtonContact = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  margin: 10vh;
  @media (max-width: 768px) {
    margin-left: 10rem;
  }
`;

const EditCurriculum = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 200px;
  background-color: var(--navyBlue);
  color: var(--white);
  border-radius: 50px;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;

const SaveCurriculum = styled.div`
  padding: 10px;
  display: flex;
  width: 200px;
  text-align: center;
  align-items: center;
  justify-content: center;
  float: center;
  height: 30px;
  background-color: var(--navyBlue);
  color: var(--white);
  border-radius: 50px;
  &:hover {
    transition: 0.5s ease;
    background-color: var(--darkOrange);
    color: var(--white);
    cursor: pointer;
  }
`;
