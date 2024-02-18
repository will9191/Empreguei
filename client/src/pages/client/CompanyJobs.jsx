import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyJobs } from "../../redux/jobRelated/jobHandle";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Ci from "react-icons/ci";
import * as Io from "react-icons/io";

const CompanyJobs = () => {
  const dispatch = useDispatch();
  const { loading, companyJobs, error } = useSelector((state) => state.job);
  const params = useParams();
  const navigate = useNavigate();

  const { companyDetails } = useSelector((state) => state.company);

  const companyID = params.id;

  useEffect(() => {
    dispatch(getCompanyJobs(companyID));
  }, [dispatch, companyID]);

  if (error) {
    console.log(error);
  }

  console.log(companyJobs);

  return (
    <Container>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <TopField>
            <UserPic src={companyDetails.picture} />
            <NameField>{companyDetails.name}</NameField>
            <SeeCompany
              onClick={() => navigate("/Companies/Company/" + companyID)}
            >
              Ver Empresa
            </SeeCompany>
          </TopField>
          <StyledH1>Vagas</StyledH1>
          <StyledJobs>
            {Array.isArray(companyJobs) ? (
              companyJobs.map((job, index) => (
                <StyledJob key={index}>
                  <Top>
                    <ImgIcon
                      src={job.company ? job.company.picture : "picture"}
                      alt="picture"
                    />
                    {job.company ? job.company.name : "name"}
                  </Top>

                  <Middle>
                    <MiddleHigh>{job.typeOfWork}</MiddleHigh>
                    <MiddleLow>
                      <Field style={{ marginRight: "50px" }}>
                        {" "}
                        <Icon>
                          <Ci.CiLocationOn />
                        </Icon>{" "}
                        {job.address ? job.address.city : "city"},{" "}
                        {job.address ? job.address.state : "state"}
                      </Field>

                      <Field>
                        {" "}
                        <Icon>
                          <Io.IoMdTime />
                        </Icon>{" "}
                        {job.time ? job.time.startTime : "start"} -{" "}
                        {job.time ? job.time.endTime : "end"}
                      </Field>
                    </MiddleLow>
                  </Middle>

                  <Bottom onClick={() => navigate("/jobs/job/" + job._id)}>
                    Ver detalhes
                  </Bottom>
                </StyledJob>
              ))
            ) : (
              <>A empresa não possui vagas no momento</>
            )}
          </StyledJobs>
        </>
      )}
    </Container>
  );
};

export default CompanyJobs;

const StyledJobs = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledH1 = styled.h1`
  text-transform: uppercase;
  margin: 20px 0px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const MiddleLow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiddleHigh = styled.div`
  padding-bottom: 20px;
  font-size: 30px;
  font-weight: 400;
`;

const Container = styled.div`
  padding: 2rem 4rem;
  background: var(--gray);
`;

const Icon = styled.div`
  display: flex;
  margin-right: 0px;
  font-weight: 700;
  font-size: 40px;
  align-items: center;
`;

const StyledJob = styled.div`
  border-radius: 25px;
  background: #fff;
  box-shadow: 5px 5px 5px 0px #00297a;
  margin: 20px;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25), 5px 5px 5px 0px #00297a;
`;

const TopField = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    text-align: center;
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
  width: 530px;
  height: 47px;
  padding-left: 10px;
`;

const SeeCompany = styled.button`
  background: black;
  color: white;
  border-radius: 50px;
  padding: 20px 40px;
  position: absolute;
  right: 10rem;
  text-decoration: none;
  text-transform: uppercase;
  @media (max-width: 768px) {
    right: 0rem;
    margin-top: 5rem;
    position: static;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px 5px 10px;
  border-bottom: 1px solid black;
  font-size: 35px;
`;

const Middle = styled.div`
  padding: 10px 10px;
`;

const Bottom = styled.div`
  text-align: center;
  padding: 12px 22px;
  border-top: 1px solid black;
  color: #000;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 60% */
  letter-spacing: -0.6px;
  cursor: pointer;
`;

const ImgIcon = styled.img`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  border: 2px solid black;
  margin-right: 10px;
`;
