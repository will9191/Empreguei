import "../../layouts/card.css";
import * as Gr from "react-icons/gr";
import * as Md from "react-icons/md";
import styled from "styled-components";

const CardOpportunities = ({ logoCard, name, description, loc, hor }) => {
  return (
    <CardContainer>
      <CardContent>
        <CardTop>
          <CardTopContent>
            <CardImg src={logoCard} />
            <CardH1> {name}</CardH1>
          </CardTopContent>
        </CardTop>
        <CardMiddle>
          <CardMiddleContent>
            {description}
            <CardDescription>
              <CardLocation>
                <Gr.GrLocation />
                {loc}
              </CardLocation>
              <CardTime>
                <Md.MdOutlineWatchLater /> {hor}
              </CardTime>
            </CardDescription>
          </CardMiddleContent>
        </CardMiddle>
        <CardEnd>
          <Details>Ver Detalhes</Details>
        </CardEnd>
      </CardContent>
    </CardContainer>
  );
};

export default CardOpportunities;

const CardContainer = styled.div`
  display: flex;
  margin: 50px;
  @media (max-width: 768px) {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
   flex-direction: column;
  }
`;

const CardContent = styled.div`
  background-color: var(--gray);
  border: 2px solid var(--black);
  color: var(--black);
  box-shadow: 0px 0px 11px 10px #22222270;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  border-radius: 30px;
  &:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.1);
    background-color: #d3d3d3;
  }
  

`;

const CardImg = styled.img`
  width: 20px;
  padding: 20px;
`;

const CardTop = styled.div`
  border-bottom: 1px solid #000000;
  width: 100%;
  
`;
const CardMiddle = styled.div`
  border-bottom: 1px solid #000000;
  width: 100%;
`;

const CardEnd = styled.div``;

const CardDescription = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  text-align: left;
`;

const CardLocation = styled.div``;

const CardTime = styled.div``;

const CardTopContent = styled.div`
  display: flex;
  align-items: center;
`;

const CardMiddleContent = styled.div`
  padding: 20px;
`;

const CardH1 = styled.h1``;

const Details = styled.div`
  margin: 10px;
  font-size: 25px;
`;
