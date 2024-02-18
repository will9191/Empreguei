import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import * as Hi from 'react-icons/hi2';
import * as Io from 'react-icons/io5';
import * as Lia from 'react-icons/lia';
import axios from 'axios';
import { BsRocketTakeoffFill } from 'react-icons/bs';

const AdminHomePage = () => {
  const [countCompanies, setCountCompanies] = useState(parseInt(0));
  const [countClients, setCountClients] = useState(parseInt(0));
  const [countJobs, setCountJobs] = useState(parseInt(0));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
    fetchClients();
    fetchJobs();
  }, []);

  const url = 'http://localhost:5001';

  const fetchCompanies = async () => {
    const response = await axios.get(`${url}/company/search`);
    const total = response.data.total;
    setCountCompanies(parseInt(total));
    setLoading(false);
  };

  const fetchClients = async () => {
    const response = await axios.get(`${url}/client/search`);
    const total = response.data.total;
    setCountClients(parseInt(total));
    setLoading(false);
  };

  const fetchJobs = async () => {
    const response = await axios.get(`${url}/jobs/search`);
    const total = response.data.total;
    setCountJobs(parseInt(total));
    setLoading(false);
  };

  console.log({ countCompanies, countClients, countJobs });

  return (
    <Container>
      <TopField>
        <TopText> PAINEL DE CONTROLE</TopText>
      </TopField>

      <Dashboard>
        <CompaniesCard>
          <CompaniesIcon>
            <Io.IoPeople />
          </CompaniesIcon>
          <CompaniesText>Candidatos</CompaniesText>
          <CompaniesNumbers>{countClients}</CompaniesNumbers>
        </CompaniesCard>

        <CompaniesCard>
          <CompaniesIcon>
            <Hi.HiBuildingOffice2 />
          </CompaniesIcon>
          <CompaniesText>Empresas</CompaniesText>
          <CompaniesNumbers>{countCompanies}</CompaniesNumbers>
        </CompaniesCard>

        <CompaniesCard>
          <CompaniesIcon>
            <Lia.LiaSuitcaseSolid />
          </CompaniesIcon>
          <CompaniesText>Vagas</CompaniesText>
          <CompaniesNumbers>{countJobs}</CompaniesNumbers>
        </CompaniesCard>
      </Dashboard>

      <DashboardMain>
        <MetaCard>
          <MetaTitle>
            <BsRocketTakeoffFill /> Meta Mensal
          </MetaTitle>
          <MetaChart>0%</MetaChart>
          <MetaAtual>R$2.500</MetaAtual>
        </MetaCard>
      </DashboardMain>
    </Container>
  );
};

export default AdminHomePage;

const Container = styled.div``;

const TopField = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #00297a;
  width: 90vw;
  height: 115px;
  @media (max-width: 768px) {
    width: 120vw;
  }
`;

const TopText = styled.p`
  color: white;
  font-size: 45px;
  font-weight: 700;
  line-height: 50px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Dashboard = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem;
  align-items: center;
`;

const CompaniesCard = styled.div`
  background-color: white;
  box-shadow: 0px 15px 25px 0px #4d6696;
  border-bottom: 1px solid #4a5e84;
  border-right: 1px solid #4d6696;
  border-radius: 25px;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const CompaniesIcon = styled.image`
  font-size: 35px;
`;

const CompaniesText = styled.div`
  font-size: 25px;
  font-weight: 400;
`;

const CompaniesNumbers = styled.div`
  font-size: 50px;
  font-weight: 700;
`;

const DashboardMain = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem;
  align-items: center;
`;

const MetaCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  background: #00297a;
  color: white;
  box-shadow: 0px 27px 68px 0px white;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  width: 300px;
  height: 300px;
  gap: 15px;
  box-shadow: 0px 15px 25px 0px #272728;
  border-bottom: 1px solid #272728;
  border-right: 1px solid #272728;
`;

const MetaTitle = styled.div`
  font-size: 20px;
`;

const MetaChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 30px;
  width: 150px;
  height: 150px;
  text-align: center;
  background-color: black;
  border-radius: 50%;
  border: 10px solid #444343;
`;

const MetaAtual = styled.p`
  font-size: 35px;
`;
