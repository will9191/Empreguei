import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Company = ({ company }) => {
  const navigate = useNavigate();

  return (
    <StyledCompany
      onClick={() => navigate("/companies/company/" + company._id)}
    >
      <>
        <StyledImg src={company.picture} alt="" />
      </>
    </StyledCompany>
  );
};

export default Company;

const StyledCompany = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px 100px;
  box-shadow: 5px 5px 5px #00297a;
  border-radius: 25px;
  border: none;
  &:hover {
    transform: scale(1.1);
    transition: 0.5s ease-in-out;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25), 5px 5px 5px 0px #00297a;
  }
  transition: 0.5s ease-in-out;
  cursor: pointer;
`;

const StyledImg = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;
