import React, { useState } from 'react';
import styled from 'styled-components';
import useLockBodyScroll from '../../components/CustomHook/useLockBodyScroll';

const GitHubModal = ({ toggleHandler, setPostData, setUserInfo }) => {
  const [gitInput, setGitInput] = useState({});
  useLockBodyScroll();

  const gitHandler = ({ target }) => {
    setGitInput(prev => ({ ...prev, gitAddress: target.value }));
  };

  const postGitHub = () => {
    setPostData(prev => ({ ...prev, github_repo_url: gitInput.gitAddress }));
    setUserInfo(prev => ({ ...prev, github_url: gitInput.gitAddress }));
    toggleHandler();
  };

  return (
    <>
      <GitHubWindow>
        <GitHubInput onChange={gitHandler} />
        <Resister onClick={postGitHub}>입력완료</Resister>
      </GitHubWindow>
      <ModalBack
        onClick={() => {
          toggleHandler();
        }}
      />
    </>
  );
};

export default GitHubModal;

const GitHubWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 100px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  z-index: 50;
`;

const GitHubInput = styled.input.attrs(() => ({
  type: 'text',
  placeholder: '주소를 입력하세요',
}))`
  width: 80%;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.cssColor};
  border-radius: 5px;
  outline: none;
`;

const Resister = styled.button`
  width: 80px;
  height: 30px;
  font-size: 1rem;
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
