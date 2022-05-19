import React, { useState, useEffect } from 'react';
import useToggle from '../../components/CustomHook/useToggle';
import StackModal from './StackModal';
import Button from '../../components/Button/Buttons';
import styled from 'styled-components';
import { API } from '../../config';

const StackWrapper = ({
  title,
  userInfo,
  setPostData,
  setUserInfo,
  isEdit,
}) => {
  const { isToggleOn, toggleHandler } = useToggle();
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    fetch(`${API.COMMONS}/meta`)
      .then(res => res.json())
      .then(res => setMetaData(res.results[0].stacks));
  }, []);

  return (
    <Stack>
      <StackInfo>
        <StackTitle>{title}</StackTitle>
        {isEdit && <EditButton onClick={toggleHandler}>편집하기</EditButton>}
        {isToggleOn && (
          <>
            <StackModal
              setUserInfo={setUserInfo}
              setPostData={setPostData}
              toggleHandler={toggleHandler}
            >
              {metaData}
            </StackModal>
            <ModalBack onClick={toggleHandler} />
          </>
        )}
      </StackInfo>
      <StackList>
        {userInfo.stacks &&
          userInfo.stacks.map((stack, idx) => (
            <Button key={idx} text={stack.title} isClicked={true} />
          ))}
      </StackList>
    </Stack>
  );
};

export default StackWrapper;

const Stack = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};
  margin-top: 10px;
`;

const StackInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StackTitle = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor};
`;

const EditButton = styled.button`
  width: 80px;
  height: 20px;
  background-color: ${({ theme }) => theme.cssColor};
  color: white;
  border: 1px solid ${({ theme }) => theme.cssColor};
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background-color: white;
    color: ${({ theme }) => theme.cssColor};
  }
`;

const StackList = styled.div`
  width: 100%;
  padding: 10px;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 10;
`;
