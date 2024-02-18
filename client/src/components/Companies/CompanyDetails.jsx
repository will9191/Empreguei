import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from '../../redux/companyRelated/companyHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { doneSuccess } from '../../redux/companyRelated/companySlice';
import * as Bs from 'react-icons/bs';
import * as Bi from 'react-icons/bi';

const CompanyDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, companyDetails, error } = useSelector(
    (state) => state.company
  );

  const companyID = params.id;

  useEffect(() => {
    dispatch(getCompanyDetails(companyID));
  }, [dispatch, companyID]);

  if (error) {
    console.log(error);
  }

  console.log(companyDetails.media);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <InfoContainer>
          <TopField>
            <UserPic src={companyDetails.picture} />
            <NameField>{companyDetails.name}</NameField>
            <Button
              onClick={() =>
                navigate('/Companies/Company/' + companyID + '/jobs')
              }
            >
              Ver Vagas
            </Button>
          </TopField>
          <InfoField>
            <SubTitle> {companyDetails.description}</SubTitle>
          </InfoField>
          <InfoField>
            <Title>Setor:</Title>{' '}
            <SubTitle> {companyDetails.department}</SubTitle>
          </InfoField>
          <InfoField>
            <Title>Contato:</Title>{' '}
            <SubTitle>Email: {companyDetails.email}</SubTitle>
            <SubTitle>Tel: {companyDetails.phone}</SubTitle>
            <SubTitle>
              Localização:{' '}
              {companyDetails.address ? companyDetails.address.city : 'city'},{' '}
              {companyDetails.address ? companyDetails.address.state : 'state'}{' '}
            </SubTitle>
            <Menu>
              {/* <MediaLink
                to={companyDetails.media ? companyDetails.media.facebook : ''}
                target='_blank'
              >
                {' '}
                {companyDetails.media ? <Bi.BiLogoFacebook /> : <></>}
              </MediaLink> */}
              {/*   <MediaLink
                to='https://www.instagram.com/empreguei.br/'
                target='_blank'
              >
                <Bs.BsInstagram />
              </MediaLink>
              <MediaLink
                to='https://www.instagram.com/empreguei.br/'
                target='_blank'
              >
                <Bi.BiLogoLinkedin />
              </MediaLink> */}
            </Menu>
          </InfoField>
        </InfoContainer>
      )}
    </>
  );
};

export default CompanyDetails;

const MediaLink = styled(Link)`
  background-color: black;
  color: white;
  font-size: 30px;
  padding: 20px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0px 20px;
  text-decoration: none;
  text-decoration-line: none;
  list-style: none;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    transition: 0.5s ease-in-out;
  }
`;

const Menu = styled.div`
  display: flex;
`;
const InfoContainer = styled.div`
  margin: 2rem 4rem;
`;

const TopField = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    display: flex;
  }
`;

const UserPic = styled.img`
  height: 112px;
  width: 108px;
  border-radius: 50%;
  border: 1px solid black;
`;

const NameField = styled.p`
  font-size: 50px;
  font-weight: 700;
  height: 47px;
  padding-left: 10px;
  @media (max-width: 768px) {
    margin-bottom: 5rem;
    text-align: center;
  }
`;

const InfoField = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  line-height: 42px;
`;

const SubTitle = styled.p`
  font-weight: 400;
  font-size: 25px;
  line-height: 35px;
  word-break: break-all;
`;

const Button = styled.button`
  background: black;
  color: white;
  border-radius: 50px;
  padding: 20px 40px;
  position: absolute;
  cursor: pointer;
  right: 10rem;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    right: 0rem;
    position: static;
  }
`;
