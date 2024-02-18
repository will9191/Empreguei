import React, { useEffect } from "react";
import styled from "styled-components";
import blue from "../../assets/blue.svg";
import { useDispatch, useSelector } from "react-redux";
import HeroCardJobs from "./HeroCardJobs";
import { getAllJobs, searchJobs } from "../../redux/jobRelated/jobHandle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Ci from "react-icons/ci";
import * as Io from "react-icons/io";

const HeroJobsCompanies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { jobSearch, loading, error } = useSelector((state) => state.job);

  const fields = { query };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchJobs(fields)), [dispatch, fields];
  };

  console.log(jobSearch);

  return (
    <HeroContainer>
      {loading ? (
        <>Loading...</>
      ) : (
        <HeroContent>
          <Search>
            <HeroTitle>VEJA ALGUMAS VAGAS DO NOSSO SITE</HeroTitle>

            <SearchField onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="CARGO | LOCALIDADE"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <SearchButton type="submit">Buscar</SearchButton>
            </SearchField>
          </Search>
          <>
            <StyledJobs>
              {Array.isArray(jobSearch) ? (
                jobSearch.map((job, index) => (
                  <StyledJob key={index}>
                    <Top>
                      <ImgIcon
                        src={job.company ? job.company.picture : "picture"}
                        alt="picture"
                      />
                      {job.company ? job.company.name : "name"}
                    </Top>

                    <Middle>
                      <MiddleHigh>
                        <>{job.typeOfWork} </>
                        <> {job.workMode} </>
                      </MiddleHigh>

                      <MiddleLow>
                        <Field>
                          {" "}
                          <Icon>
                            <Ci.CiLocationOn />
                          </Icon>{" "}
                          {job.address ? job.address.city : "name"},{" "}
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

          {/*  <HeroCardJobs /> */}
        </HeroContent>
      )}
    </HeroContainer>
  );
};

export default HeroJobsCompanies;

const HeroContainer = styled.div`
  display: flex;
  background: url(${blue});
  background-repeat: no-repeat;
  background-size: 100%;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Search = styled.div`
  margin-bottom: 440px;
`;

const TextField = styled.p`
  font-family: Comfortaa;
  font-size: 35px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.015em;
  text-align: center;
  display: flex;
  margin: -160px 0px 40px 50px;
  color: #00297a;
`;

const HeroContent = styled.section``;

const HeroTitle = styled.h1`
  color: white;
  text-transform: uppercase;
  font-size: 48px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.015em;
  text-align: center;
  padding-top: 50px;
`;

const SearchField = styled.form`
  display: flex;
  border-radius: 80px;
  background: #e8e8e8;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  margin-left: 100px;
  margin-right: 100px;
  max-width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  border-radius: 80px;
  background: inherit;
  color: #00297a;
  width: 100%;
  text-align: center;
  &::placeholder {
    color: #00297a;
  }
  @media (max-width: 768px) {
    font-size: 19px;
  }
`;

const SearchButton = styled.button`
  color: white;
  border-radius: 80px;
  text-transform: uppercase;
  background: #00297a;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  border: none;
  padding: 15px 45px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transition: 0.5s ease-in-out;
    background: #ff731d;
    color: white;
  }
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const StyledJobs = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const Field = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
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

const MiddleLow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MiddleHigh = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  font-size: 30px;
  font-weight: 400;
`;

const ImgIcon = styled.img`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  border: 2px solid black;
  margin-right: 10px;
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

const Icon = styled.div`
  display: flex;
  margin-right: 0px;
  font-weight: 700;
  font-size: 40px;
  align-items: center;
  text-align: left;
`;
