import styled from 'styled-components';
import * as Ci from 'react-icons/ci';
import * as Io from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <StyledJob>
      <Top>
        <ImgIcon
          src={job.company ? job.company.picture : 'picture'}
          alt='picture'
        />
        {job.company ? job.company.name : 'name'}
      </Top>

      <Middle>
        <MiddleHigh>
          <HighText>{job.typeOfWork}</HighText>
          <HighText>{job.workMode}</HighText>
        </MiddleHigh>

        <MiddleLow>
          <Field>
            {' '}
            <Icon>
              <Ci.CiLocationOn />
            </Icon>{' '}
            {job.address ? job.address.city : 'name'},{' '}
            {job.address ? job.address.state : 'state'}
          </Field>

          <Field>
            {' '}
            <Icon>
              <Io.IoMdTime />
            </Icon>{' '}
            {job.time ? job.time.startTime : 'start'} -{' '}
            {job.time ? job.time.endTime : 'end'}
          </Field>
        </MiddleLow>
      </Middle>

      <Bottom onClick={() => navigate('/jobs/job/' + job._id)}>
        Ver detalhes
      </Bottom>
    </StyledJob>
  );
};

export default Job;

const StyledJob = styled.div`
  border-radius: 25px;
  background: #fff;
  box-shadow: 5px 5px 5px 0px #00297a;
  height: fit-content;
  border-radius: 25px;
  max-width: 100%;
  background: #fff;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.25), 5px 5px 5px 0px #00297a;
  min-height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const HighText = styled.p`
  font-weight: 400;
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
  font-weight: 400;
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
  word-break: break-all;
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
