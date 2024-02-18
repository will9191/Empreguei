import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Companies from "../../components/Companies/Companies";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination/PaginationCompanies";
import { searchCompanies } from "../../redux/companyRelated/companyHandle";
import { useDispatch } from "react-redux";
import blue from "../../assets/blue.svg";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ShowCompanies = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState(0);

  const [search, setSearch] = useState("");

  const searchCompany = () => {
    if (search.trim()) {
      dispatch(searchCompanies({ search }));
      navigate(`/companies/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Search currentId={currentId}>
        <HeroTitle>Encontre empresas abaixo</HeroTitle>
        <SearchField>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="Empresa | Localidade"
          />
          <SearchButton onClick={searchCompany}>Buscar</SearchButton>
        </SearchField>
      </Search>
      <Companies setCurrentId={setCurrentId} />
      {!searchQuery && <Pagination page={page} />}
    </>
  );
};

export default ShowCompanies;

const Search = styled.div`
  display: flex;
  background: url(${blue});
  background-repeat: no-repeat;
  background-size: 100%;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

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

const SearchField = styled.div`
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
