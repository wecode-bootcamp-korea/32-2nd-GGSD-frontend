import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button/Buttons';
import { API } from '../../config';
import useLockBodyScroll from '../CustomHook/useLockBodyScroll';

const JoinModal = ({
  title,
  feVacancy,
  beVacancy,
  essentialStacks,
  projectId,
  toggleHandler,
}) => {
  const [metaData, setMetaData] = useState({});
  const [stackList, setStackList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    git: '',
    stackes: stackList,
    position: null,
    portfolio: false,
  });
  const { git, stackes, position, portfolio } = userInfo;
  useLockBodyScroll();

  useEffect(() => {
    fetch(`${API.COMMONS}/meta`)
      .then(res => res.json())
      .then(data => setMetaData(data.results[0]))
      .catch(error => console.error('메타데이터 에러야아아아앙ㅠㅠ', error));
  }, []);

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
    setUserInfo({ ...userInfo, portfolio: e.target.checked });
  };

  const completedFetch = () => {
    fetch(`${API.JOINPOST}/${projectId}`, {
      method: 'POST',
      headers: { Authorization: localStorage.getItem('token') },
      body: JSON.stringify({
        project_id: projectId,
        position_id: position,
        technology_stacks: stackes,
        github_repo_url: git,
        is_private: portfolio,
      }),
    }).catch(error => console.error('이것이 에러다!!!', error));
  };

  const handleBtn = e => {
    e.preventDefault();
    const isRequiredFieldFill =
      stackes.length > 0 && git.length > 0 && position !== null;
    if (isRequiredFieldFill) {
      completedFetch();
      alert('신청 완료 되었습니다 :)');
      navigate('/mypage');
      setUserInfo({
        git: '',
        stackes: setStackList([]),
        position: null,
        portfolio: false,
      });
    } else {
      alert('*필수값 입력해 주세요 :)');
    }
  };

  const handleTextChange = e => {
    const { name, value } = e.target;
    const isCheckedPosition = name === 'position';
    setUserInfo(userInfo => {
      return {
        ...userInfo,
        [name]: isCheckedPosition ? Number(value) : value,
      };
    });
  };

  const goToDetail = () => {
    document.body.style.overflow = '';
    toggleHandler(false);
    setUserInfo({
      git: '',
      stackes: setStackList([]),
      position: null,
      portfolio: null,
    });
  };

  if (!metaData.positions) return;

  return (
    <>
      <ModalForm>
        <ExitBtn type="button" onClick={goToDetail}>
          ☓
        </ExitBtn>
        <ProjectName>
          <ProjectNameText>프로젝트명 : {title}</ProjectNameText>
          <ProjectNameText>
            남은 인원 : FE({feVacancy <= 0 ? 0 : feVacancy}), BE(
            {beVacancy <= 0 ? 0 : beVacancy})
          </ProjectNameText>
          <ProjectNameText>
            <InnerText>필수 스택 : </InnerText>
            <StackWrap>
              {essentialStacks.map(stack => (
                <Stack key={stack.stack_id} color={stack.color}>
                  {stack.title}
                </Stack>
              ))}
            </StackWrap>
          </ProjectNameText>
        </ProjectName>
        <CheckBoxWrap>
          <Title noMargin="noMargin">* Position</Title>
          {metaData.positions
            .slice(0, 2)
            .reverse()
            .map(({ id, roll }) => (
              <CheckBox key={id}>
                <Label htmlFor={id}>
                  <PositionBtn
                    type="radio"
                    id={id}
                    name="position"
                    onChange={handleTextChange}
                    value={id}
                  />
                  {roll}
                </Label>
              </CheckBox>
            ))}
        </CheckBoxWrap>
        <ButtonBox>
          <Title>* 기술 스택</Title>
          {metaData.stacks.map(({ id, title }) => (
            <Button
              key={id}
              text={title}
              isClicked={stackList.includes(id)}
              handleClick={() => handleStack(id)}
            />
          ))}
        </ButtonBox>
        <GitHub>
          <Title>* Git 주소</Title>
          <GitInput
            name="git"
            placeholder="깃헙 링크 넣어주삼"
            onChange={handleTextChange}
          />
        </GitHub>
        <OpenCheckPortfolio>
          <CheckBox>
            <Label htmlFor="choicebox">
              <ChoiceBtn
                type="checkbox"
                id="choicebox"
                name="choiceBox"
                onChange={choicePortfolio}
              />
              내 포트폴리오 비공개
            </Label>
          </CheckBox>
        </OpenCheckPortfolio>
        <JoinBtn onClick={handleBtn}>apply</JoinBtn>
      </ModalForm>
    </>
  );
};

const ExitBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  position: absolute;
  right: 7%;
  top: 5%;
  cursor: pointer;
`;

const JoinBtn = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ff9900;
  border-radius: 10px;
  color: #ff7425;
  background-color: #fffefc;
  cursor: pointer;

  &:hover {
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

const Stack = styled.span`
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 25px;
  margin-bottom: 5px;
  margin-right: 8px;
  padding: 5px 7px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  border-radius: 7px;
  background-color: ${props => props.color};
`;

const StackWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 83%;
  margin-left: 5px;
`;

const InnerText = styled.div`
  display: inline-block;
`;

const ProjectNameText = styled.div`
  display: flex;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  font-size: 16px;
  color: #666666;
`;

const ModalForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  text-align: center;
  padding: 50px;
  width: 600px;
  border: 1px solid #ff9900;
  border-radius: 10px;
  background-color: white;
  z-index: 100;
`;

export default JoinModal;
