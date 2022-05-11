import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button/Buttons';
import { STACK_LIST } from '../Card/cardData';

const JoinModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stackList, setStackList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    git: '',
    stackes: stackList,
    position: null,
    portfolio: null,
  });

  const { git, stackes, position, portfolio } = userInfo;
  const navigate = useNavigate();

  const handleStack = id => {
    if (stackList.includes(id)) {
      setUserInfo({
        ...userInfo,
        stackes: stackList.filter(stack => stack !== id),
      });
      setStackList(stackList.filter(stack => stack !== id));
    } else {
      setUserInfo({ ...userInfo, stackes: stackList.concat(id) });
      setStackList(stackList.concat(id));
    }
  };

  const choicePortfolio = e => {
    setUserInfo(e.target.checked);
  };

  const handleBtn = e => {
    e.preventDefault();
    const isRequiredFieldFill =
      stackes.length > 0 && git.length > 0 && position;
    if (isRequiredFieldFill) {
      setIsModalOpen(false);
      alert('신청 완료 되었습니다 :)');
      navigate('/mypage');
      setUserInfo({
        git: '',
        stackes: setStackList([]),
        position: null,
        portfolio: null,
      });
    } else {
      alert('*필수값 입력해 주세요 :)');
    }
  };

  const handleTextChange = e => {
    const { name, value, checked } = e.target;
    const isCheckClicked = name.indexOf('check') === -1;
    setUserInfo(userInfo => {
      return {
        ...userInfo,
        [name]: isCheckClicked ? value : checked,
      };
    });
  };

  const goToDetail = () => {
    setIsModalOpen(false);
    navigate('/detail');
    setUserInfo({
      git: '',
      stackes: setStackList([]),
      position: null,
      portfolio: null,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <GoToJoin onClick={openModal}>소인 그대와 조인할것이옵니다.</GoToJoin>
      {isModalOpen && (
        <Modal>
          <ModalForm>
            <ExitBtn type="button" onClick={goToDetail}>
              ☓
            </ExitBtn>
            <ProjectName>
              <ProjectNameText>프로젝트명 : </ProjectNameText>
              <ProjectNameText>남은 인원 : </ProjectNameText>
              <ProjectNameText>필수 스택 : </ProjectNameText>
            </ProjectName>
            <CheckBoxWrap>
              <Title noMargin="noMargin">* Position</Title>
              <CheckBox>
                <PositionBtn
                  type="radio"
                  id="checkBox"
                  name="position"
                  onChange={handleTextChange}
                  value="frontend"
                />
                <Label htmlFor="checkBox">front end</Label>
              </CheckBox>
              <CheckBox>
                <ChoiceBtn
                  type="radio"
                  id="choiceBox"
                  name="position"
                  onChange={handleTextChange}
                  value="backend"
                />
                <Label htmlFor="choiceBox">back end</Label>
              </CheckBox>
            </CheckBoxWrap>
            <ButtonBox>
              <Title>* 기술 스택</Title>
              {STACK_LIST.map(stack => (
                <Button
                  key={stack.id}
                  text={stack.name}
                  isClicked={stackList.includes(stack.name)}
                  handleClick={() => handleStack(stack.name)}
                />
              ))}
            </ButtonBox>
            <GitHub>
              <Title>* Git 주소</Title>
              <GitInput
                name="git"
                placeholder="깃헙 링크 넣어주삼"
                onChange={handleTextChange}
              ></GitInput>
            </GitHub>
            <OpenCheckPortfolio>
              <CheckBox>
                <ChoiceBtn
                  type="checkbox"
                  id="choicebox"
                  name="choiceBox"
                  onChange={choicePortfolio}
                ></ChoiceBtn>
                <Label htmlFor="choicebox">내 포트폴리오 공개여부</Label>
              </CheckBox>
            </OpenCheckPortfolio>
            <JoinBtn onClick={handleBtn}>apply</JoinBtn>
          </ModalForm>
        </Modal>
      )}
    </>
  );
};
const GoToJoin = styled.button`
  background-color: red;
`;

const ExitBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  position: absolute;
  right: 7%;
  top: 5%;
`;

const JoinBtn = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ff9900;
  border-radius: 10px;
  color: #ff7425;
  background-color: #fffefc;

  :hover {
    background-color: #ff9900;
    border: 1px solid #ff9900;
    color: #333;
  }
`;

const OpenCheckPortfolio = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.p`
  display: flex;
  text-align: center;
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  color: #666666;
  margin-bottom: ${props => (props.noMargin ? 0 : '15px')};
`;

const ButtonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const GitHub = styled.div`
  font-size: 15px;
`;

const GitInput = styled.input`
  width: 100%;
  height: 30px;
  margin-bottom: 40px;
  border: none;
  border-bottom: 1px solid #333;
  background: transparent;
  outline: none;
  font-size: 16px;

  &:focus::placeholder {
    color: transparent;
  }
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-bottom: 40px;
  width: 100%;
  color: #333;
`;

const ChoiceBtn = styled.input`
  margin-right: 10px;
`;

const CheckBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  color: #333;
`;

const PositionBtn = styled.input`
  margin-right: 10px;
`;

const ProjectName = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid #666666;
  margin-bottom: 40px;
`;

const ProjectNameText = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: #666666;
`;

const ModalForm = styled.form`
  position: relative;
  margin: 0 auto;
  text-align: center;
  padding: 50px;
  width: 600px;
  border: 1px solid #ff9900;
  border-radius: 10px;
  background-color: white;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000070;
`;

export default JoinModal;
