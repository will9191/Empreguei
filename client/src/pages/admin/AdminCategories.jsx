import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const AdminCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:5001';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(`${url}/category`);
    const newCategories = response.data.categories;
    setData((data) => [...data, ...newCategories]);
    setLoading(false);
  };

  console.log(data);

  return (
    <Container>
      <TopField>
        <TopText>CATEGORIAS</TopText>
      </TopField>

      {loading ? (
        <>loading...</>
      ) : (
        <>
          {' '}
          {Array.isArray(data) && Object.keys(data) ? (
            data?.map((category) => (
              <Field key={category._id}>
                <Area>
                  <AreaPic>
                    <Pic src={category.picture} />
                  </AreaPic>
                  <NameField>{category.name}</NameField>{' '}
                </Area>
                <Content>
                  <Input>
                    <FaRegTrashAlt />
                  </Input>
                </Content>
              </Field>
            ))
          ) : (
            <> Nenhuma categoria encontrada! </>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminCategories;

const Container = styled.div``;

const TopField = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: #00297a;
  width: 90vw;
  height: 115px;
`;

const TopText = styled.p`
  color: white;
  font-size: 45px;
  font-weight: 700;
  line-height: 50px;
  text-align: center;
`;

const Field = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid black;
  padding: 10px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const Area = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
  margin: 10px;
`;

const AreaPic = styled.div`
  margin: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  background: #bebebe;
`;

const Pic = styled.img`
  border-radius: 50%;
  width: 90px;
  height: 90px;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const NameField = styled.div`
  @media (max-width: 768px) {
    font-size: 20px;
    word-break: break-all;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  @media (max-width: 768px) {
    margin: 0;
    justify-content: center;
  }
`;

const Input = styled.div`
  color: black;
  font-size: 50px;
  text-transform: uppercase;
  box-sizing: border-box;
  width: 200px;
  height: 50px;
  margin-right: 6rem;
  border-radius: 80px;
  cursor: pointer;
`;
