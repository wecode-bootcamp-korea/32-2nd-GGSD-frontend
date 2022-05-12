import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Buttons';
import useLockBodyScroll from '../../components/CustomHook/useLockBodyScroll';

const StackModal = ({ children, toggleHandler, setPostData, setUserInfo }) => {
  const [stackList, setStackList] = useState([]);
  useLockBodyScroll();

  const handleClick = stack => {
    if (stackList.includes(stack)) {
      setStackList(prev => prev.filter(stacklist => stacklist !== stack));
    } else {
      setStackList(stackList.concat(stack).sort((a, b) => a.id - b.id));
    }
  };

  const postStack = () => {
    setPostData(prev => ({ ...prev, stack: stackList.map(list => list.id) }));
    setUserInfo(prev => ({ ...prev, stacks: stackList }));
    toggleHandler();
  };

  return (
    <>
      <ModalWindow>
        <Title>스택을 선택해 주세요</Title>
        <List>
          {children.map((stack, idx) => (
            <Button
              key={idx}
              text={stack.title}
              handleClick={() => handleClick(stack)}
              isClicked={stackList.includes(stack)}
            />
          ))}
        </List>
        <Resister onClick={postStack}>선택완료</Resister>
      </ModalWindow>
      <ModalBack
        onClick={() => {
          toggleHandler();
        }}
      />
    </>
  );
};

export default StackModal;

const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 300px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  z-index: 50;
`;

const Title = styled.h1`
  font-size: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.inputBorder};
  padding-bottom: 30px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.inputBorder};
  padding: 20px 10px;
`;

const Resister = styled.button`
  width: 100px;
  height: 40px;
  font-size: 1.2rem;
  margin: 20px;
  border: 1px solid ${({ theme }) => theme.cssColor};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.cssColor};
  color: white;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.cssColor};
  }
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
