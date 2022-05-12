import React from 'react';
import useToggle from '../../components/CustomHook/useToggle';
import styled from 'styled-components';
import GitHubModal from './GitHubModal';

const GitHubWrapper = ({
  title,
  userInfo,
  setPostData,
  setUserInfo,
  isEdit,
}) => {
  const { isToggleOn, toggleHandler } = useToggle();

  return (
    <GitHub>
      <GitHubInfo>
        <GitHubTitle>{title}</GitHubTitle>
        {isEdit && <EditButton onClick={toggleHandler}>편집하기</EditButton>}
        {isToggleOn && (
          <GitHubModal
            setPostData={setPostData}
            toggleHandler={toggleHandler}
            setUserInfo={setUserInfo}
          />
        )}
      </GitHubInfo>
      <GutHubList>
        <GitHubAddress>{userInfo.github_url}</GitHubAddress>
      </GutHubList>
    </GitHub>
  );
};
export default GitHubWrapper;

const GitHub = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};
  margin-top: 10px;
`;

const GitHubInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const GitHubTitle = styled.h1`
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

const GutHubList = styled.div`
  width: 100%;
`;

const GitHubAddress = styled.p`
  padding-left: 10px;
  margin-top: 15px;
  font-size: 1.5rem;
`;
