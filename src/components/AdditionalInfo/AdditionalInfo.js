import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    fetch(`http://10.58.3.182:8000/commons/meta`)
      .then(res => res.json())
      .then(data => {
        setMetaData(data.results[0]);
      });
  }, []);

  const handleBtn = e => {
    e.preventDefault();
    fetch(`http://10.58.6.119:8000/users/login`, {
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
          alert('통신 실패');
          return;
        }

        return res.json();
      })
      .then(data => {
        alert(`🌻 ${data.RESULT.batch}기 ${data.RESULT.name}님 환영합니다 🌻`);
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
        <Text>기수</Text>
        <Input
          placeholder="00기_숫자로만 작성해주세요"
          type="text"
          name="grade"
          onChange={handleInput}
          value={additionalInfo.grade || ''}
        />
      </InitialSetting>

      <InitialSetting>
        <Text>이름</Text>
        <Input
          placeholder="본인 이름"
          name="username"
          type="text"
          onChange={handleInput}
          value={additionalInfo.username || ''}
        />
      </InitialSetting>

      <InitialSetting noBottom="noBottom">
        <Text>포지션</Text>
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
      <Warning>* 해당 내용은 변경 불가합니다.</Warning>
      <JoinBtn disabled={!changeBtn} type="button" onClick={handleBtn}>
        제출
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
