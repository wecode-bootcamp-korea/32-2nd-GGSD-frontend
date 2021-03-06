import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../config';

const AdditionalInfo = ({ toggleHandler }) => {
  const [additionalInfo, setAdditionalInfo] = useState({
    grade: '',
    username: '',
    position: '',
  });
  const [metaData, setMetaData] = useState({});

  const { grade, username, position } = additionalInfo;
  const changeBtn = grade && username && position;

  useEffect(() => {
    fetch(`${API.COMMONS}/meta`)
      .then(res => res.json())
      .then(data => setMetaData(data.results[0]));
  }, []);

  const handleBtn = e => {
    e.preventDefault();
    fetch(`${API.USERS}/login`, {
      method: 'PATCH',
      headers: { Authorization: localStorage.getItem('token') },
      body: JSON.stringify({
        batch: grade,
        name: username,
        position_id: Number(position),
      }),
    })
      .then(res => {
        if (res.status !== 200) {
          alert('ν΅μ  μ€ν¨');
          return;
        }

        return res.json();
      })
      .then(data => {
        localStorage.setItem('batch', true);
        alert(
          `π» ${data.results.batch}κΈ° ${data.results.name}λ νμν©λλ€ π»`
        );
        window.location.reload();
      });
    toggleHandler();
  };

  const handleInput = e => {
    const { name, value } = e.target;
    if (name === 'grade') {
      setAdditionalInfo({
        ...additionalInfo,
        [name]: parseInt(value) || 0,
      });
    } else if (name === 'username') {
      setAdditionalInfo({
        ...additionalInfo,
        [name]: value,
      });
    } else {
      setAdditionalInfo({
        ...additionalInfo,
        [name]: value,
      });
    }
  };

  return (
    <ModalForm>
      <GGSDlogo src="/images/logo.png" alt="GGSDlogo"></GGSDlogo>
      <InitialSetting>
        <Text>κΈ°μ</Text>
        <Input
          placeholder="00κΈ°_μ«μλ‘λ§ μμ±ν΄μ£ΌμΈμ"
          type="text"
          name="grade"
          onChange={handleInput}
          value={additionalInfo.grade || ''}
        />
      </InitialSetting>

      <InitialSetting>
        <Text>μ΄λ¦</Text>
        <Input
          placeholder="λ³ΈμΈ μ΄λ¦"
          name="username"
          type="text"
          onChange={handleInput}
          value={additionalInfo.username || ''}
        />
      </InitialSetting>

      <InitialSetting noBottom="noBottom">
        <Text>ν¬μ§μ</Text>
        <CheckBoxWrap>
          {metaData.positions &&
            metaData.positions.map(data => (
              <CheckBox key={data.id}>
                <PositionInput
                  type="radio"
                  name="position"
                  id={data.id}
                  value={data.roll}
                  onChange={handleInput}
                />
                <Label htmlFor={data.roll}>{data.roll}</Label>
              </CheckBox>
            ))}
        </CheckBoxWrap>
      </InitialSetting>
      <Warning>* ν΄λΉ λ΄μ©μ λ³κ²½ λΆκ°ν©λλ€.</Warning>
      <JoinBtn disabled={!changeBtn} type="button" onClick={handleBtn}>
        μ μΆ
      </JoinBtn>
    </ModalForm>
  );
};

const JoinBtn = styled.button`
  width: 100px;
  padding: 10px;
  margin-top: 50px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid #ff9900;
  color: #333;
  background-color: #ff9900;
  transition: all 0.3s;

  &:hover {
    background-color: white;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const Warning = styled.p`
  position: absolute;
  bottom: 4%;
  right: 6%;
  font-size: 15px;
  color: red;
`;

const InitialSetting = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => (props.noBottom ? 0 : '50px')};
  width: 100%;
`;

const Text = styled.span`
  margin-right: 50px;
  display: flex;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #666666;
  word-break: keep-all;
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid #666666;
  background: transparent;
  outline: none;

  &:focus::placeholder {
    color: transparent;
  }
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const Label = styled.label`
  color: #333;
  padding-left: 5px;
`;

const PositionInput = styled.input`
  display: flex;
  justify-content: space-between;
`;

const GGSDlogo = styled.img`
  position: relative;
  bottom: 8%;
  width: 180px;
`;

const ModalForm = styled.form`
  position: relative;
  margin: 0 auto;
  text-align: center;
  padding: 70px;
  width: 600px;
  height: 500px;
  border: 1px solid #ff9900;
  border-radius: 10px;
  background-color: white;
  z-index: 100;
`;

export default AdditionalInfo;
