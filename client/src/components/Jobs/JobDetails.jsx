import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobDetails } from '../../redux/jobRelated/jobHandle';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import * as Ci from 'react-icons/ci';
import * as Io from 'react-icons/io';
import * as Tb from 'react-icons/tb';
import {
  applyFor,
  deleteJob,
  editJob,
  unapplyFor,
} from '../../redux/userRelated/userHandle';
import axios from 'axios';
import ReactInputMask from 'react-input-mask';
import { NumericFormat } from 'react-number-format';

const JobDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, jobDetails, jobInfo, error, status, response } = useSelector(
    (state) => state.job
  );
  const { currentUser, currentRole } = useSelector((state) => state.user);
  const jobId = params.id;

  const client = currentUser._id;

  const [categoryData, setCategoryData] = useState([]);

  const [loader, setLoader] = useState(true);

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(`${url}/category`);
    const newCategories = response.data.categories;
    setCategoryData((categoryData) => [...categoryData, ...newCategories]);
  };

  useEffect(() => {
    dispatch(getJobDetails(jobId));
  }, [dispatch, jobId]);

  const apply = () => {
    dispatch(applyFor({ jobId, client }));
    window.location.reload(true);
  };

  const unapply = () => {
    dispatch(unapplyFor({ jobId, client }));
    window.location.reload(true);
  };

  const [editId, setEditID] = useState(-1);

  const handleEdit = (_id) => {
    setEditID(_id);
  };

  const handleDelete = () => {
    dispatch(deleteJob(jobId));
    navigate('/company/my-jobs');
  };

  const companyID = jobDetails.company?._id;

  const company = currentUser._id;
  const [typeOfWork, setTypeOfWork] = useState(jobDetails?.typeOfWork);
  const [salary, setSalary] = useState(jobDetails?.salary);
  const [category, setCategory] = useState(jobDetails?.category?._id);
  const [city, setCity] = useState(jobDetails.address?.city);
  const [state, setState] = useState(jobDetails.address?.state);
  const [startTime, setStartTime] = useState(jobDetails.time?.startTime);
  const [endTime, setEndTime] = useState(jobDetails.time?.endTime);
  const [description, setDescription] = useState(jobDetails.description);
  const [requirements, setRequirements] = useState(jobDetails.requirements);
  const [workMode, setWorkMode] = useState(jobDetails.workMode);

  const fields = {
    company,
    typeOfWork,
    salary,
    address: { city, state },
    time: {
      startTime,
      endTime,
    },
    description,
    requirements,
    workMode,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editJob(fields, params.id));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/company/my-jobs');
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

  if (error) {
    console.log(error);
  }

  console.log(jobDetails);

  return (
    <InfoContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {currentUser._id === editId ? (
            <Content>
              <TopField>
                <Div>
                  <ImgField
                    src={
                      jobDetails.company
                        ? jobDetails.company.picture
                        : 'picture'
                    }
                  />
                  <NameField>
                    {jobDetails.company ? jobDetails.company.name : 'name'}
                  </NameField>
                </Div>
                <Div>
                  <Button
                    onClick={() =>
                      navigate(
                        '/Companies/Company/' + jobDetails.company._id + '/jobs'
                      )
                    }
                  >
                    Ver Vagas
                  </Button>
                  <Button
                    onClick={() =>
                      navigate('/Companies/Company/' + jobDetails.company._id)
                    }
                  >
                    Ver Empresa
                  </Button>
                </Div>
              </TopField>

              <Form onSubmit={handleSubmit}>
                <Edit onClick={() => setEditID()}>Cancelar edição</Edit>
                <Save type='submit'>Salvar edição</Save>
                <EditType
                  type='text'
                  value={typeOfWork}
                  onChange={(e) => setTypeOfWork(e.target.value)}
                  required
                />
                <SubTitle>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {Array.isArray(categoryData) ? (
                      categoryData?.map((item, index) => (
                        <Option key={index} value={item._id} required>
                          {item.name}
                        </Option>
                      ))
                    ) : (
                      <> Nenhuma categoria encontrada! </>
                    )}
                  </Select>
                </SubTitle>
                <EditType
                  as={NumericFormat}
                  placeholder='Salário'
                  thousandSeparator=','
                  decimalSeparator='.'
                  prefix='R$ '
                  decimalScale={2}
                  type='text'
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
                <SubTitle>
                  <Icon>
                    <Ci.CiLocationOn />
                  </Icon>
                  <EditType
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <EditType
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </SubTitle>
                <SubTitle>
                  <Icon>
                    {' '}
                    <Io.IoMdTime />
                  </Icon>
                  <EditType
                    type='text'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                  <EditType
                    type='text'
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </SubTitle>
                <SubTitle>
                  <Icon>
                    <Tb.TbBuildingCommunity />
                  </Icon>
                  <EditType
                    type='text'
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value)}
                    required
                  />
                </SubTitle>
                <Title>Descrição:</Title>{' '}
                <SubTitle>
                  {' '}
                  <EditType
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </SubTitle>
                <Title>Requisitos:</Title>{' '}
                <SubTitle>
                  {' '}
                  <EditType
                    type='text'
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    required
                  />
                </SubTitle>
              </Form>
            </Content>
          ) : (
            <Content>
              <TopField>
                <Div>
                  <ImgField
                    src={
                      jobDetails.company
                        ? jobDetails.company.picture
                        : 'picture'
                    }
                  />
                  <NameField>
                    {jobDetails.company ? jobDetails.company.name : 'name'}
                  </NameField>
                </Div>
                <Div>
                  <Button
                    onClick={() =>
                      navigate(
                        '/Companies/Company/' + jobDetails.company._id + '/jobs'
                      )
                    }
                  >
                    Ver Vagas
                  </Button>
                  <Button
                    onClick={() =>
                      navigate('/Companies/Company/' + jobDetails.company._id)
                    }
                  >
                    Ver Empresa
                  </Button>
                </Div>
              </TopField>

              <InfoContent>
                {currentRole === 'Client' && (
                  <>
                    {/*  {jobInfo?.map(({ applicants }) =>
                      applicants?.some(
                        ({ client }) => client?._id === currentUser._id
                      ) ? (
                        <Button onClick={unapply}>Cancelar candidatura</Button>
                      ) : (
                        <Button onClick={apply}>Candidatar-se</Button>
                      )
                    )} */}
                    {Array.isArray(jobInfo) &&
                    Object.keys(jobInfo).length > 0 ? (
                      <>
                        {jobInfo?.map(({ applicants }) =>
                          applicants?.some(
                            ({ client }) => client?._id === currentUser._id
                          ) ? (
                            <Button onClick={unapply}>
                              Cancelar candidatura
                            </Button>
                          ) : (
                            <Button onClick={apply}>Candidatar-se</Button>
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {' '}
                        <Button onClick={apply}>Candidatar-se</Button>
                      </>
                    )}
                  </>
                )}
                {currentUser._id === companyID && (
                  <>
                    <Edit
                      style={{
                        background: 'gray',
                      }} /* onClick={() => handleEdit(currentUser._id)} */
                    >
                      Editar vaga
                    </Edit>

                    <Edit onClick={handleDelete}>Excluir vaga</Edit>
                  </>
                )}
                <Type> {jobDetails.typeOfWork} </Type>
                <SubTitle>
                  <Icon>
                    <Img
                      src={
                        jobDetails.category
                          ? jobDetails.category.picture
                          : 'picture'
                      }
                    />
                  </Icon>
                  {jobDetails.category ? jobDetails.category.name : 'category'}
                </SubTitle>
                <SubTitle>
                  <Icon>
                    <Ci.CiDollar />
                  </Icon>
                  {jobDetails.salary}
                </SubTitle>
                <SubTitle>
                  <Icon>
                    <Ci.CiLocationOn />
                  </Icon>
                  {jobDetails.address ? jobDetails.address.city : 'city'},{' '}
                  {jobDetails.address ? jobDetails.address.state : 'state'}
                </SubTitle>
                <SubTitle>
                  <Icon>
                    {' '}
                    <Io.IoMdTime />
                  </Icon>
                  {jobDetails.time
                    ? jobDetails.time.startTime
                    : 'startTime'} -{' '}
                  {jobDetails.time ? jobDetails.time.endTime : 'endTime'}
                </SubTitle>
                <SubTitle>
                  <Icon>
                    <Tb.TbBuildingCommunity />
                  </Icon>
                  {jobDetails.workMode}
                </SubTitle>
                <Title>Descrição:</Title>{' '}
                <SubTitle>{jobDetails.description}</SubTitle>
                <Title>Requisitos:</Title>{' '}
                <SubTitle>{jobDetails.requirements}</SubTitle>
              </InfoContent>
            </Content>
          )}
        </>
      )}
    </InfoContainer>
  );
};

export default JobDetails;

const Edit = styled.button`
  background: black;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  color: white;
  border-radius: 50px;
  padding: 20px 40px;
  margin: 0px 10px;
  float: right;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  box-shadow: 5px 5px 5px 0px #00000040;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`;

const Option = styled.option`
  outline: none;
  border: none;
  width: max-content;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

const Select = styled.select`
  box-shadow: 0px 4px 4px 0px #00297a;
  background: #d9d9d9;
  padding: 12px 0px 12px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
  text-align: left;
  width: 93%;
`;

const Save = styled.button`
  background: black;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  color: white;
  border-radius: 50px;
  padding: 20px 40px;
  margin: 0px 10px;
  float: right;
  text-decoration: none;
  text-transform: uppercase;
  display: flex;
  box-shadow: 5px 5px 5px 0px #00000040;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const InfoContainer = styled.div`
  margin: 0;
  background: #e8e8e8;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Content = styled.div``;

const Icon = styled.div`
  margin-right: 5px;
  font-weight: 700;
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const TopField = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  padding: 2rem 4rem;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
    text-align: center;
  }
`;

const Type = styled.h1`
  font-size: 35px;
  font-weight: 700;
  line-height: 42px;
  text-transform: uppercase;
`;

const EditType = styled.input`
  display: flex;
  font-weight: 700;
  font-size: 20px;
  margin: 12px 0px;
  align-items: center;
  word-break: break-all;
  max-width: 1250px;
  background: none;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const InfoContent = styled.div`
  padding: 2rem 4rem;
`;

const Form = styled.form`
  padding: 2rem 4rem;
`;

const NameField = styled.p`
  font-size: 50px;
  font-weight: 700;
  height: 47px;
  padding-left: 10px;
`;

const Title = styled.p`
  font-size: 25px;
  font-weight: 700;
  line-height: 42px;
  text-transform: uppercase;
`;

const SubTitle = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 20px;
  margin: 12px 0px;
  align-items: center;
  word-break: break-all;
  max-width: 1250px;
`;

const Button = styled.button`
  background: black;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  color: white;
  border-radius: 50px;
  padding: 20px 40px;
  margin: 0px 10px;
  float: right;
  text-decoration: none;
  text-transform: uppercase;

  display: flex;
  box-shadow: 5px 5px 5px 0px #00000040;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`;

const ImgField = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 2px solid black;
`;
