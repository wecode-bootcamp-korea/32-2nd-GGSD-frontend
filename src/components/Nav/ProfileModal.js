import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useToggle from '../CustomHook/useToggle';

const ProfileModal = ({ userInfo, userName }) => {
  const { isToggleOn, toggleHandler } = useToggle();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    window.location.reload();
    toggleHandler();
  };

  const moveCreatePage = () => {
    navigate('/create');
  };

  const moveListPage = () => {
    navigate('/list');
  };

  const moveMypage = () => {
    navigate('/mypage');
  };

  return (
    <>
      <Profile userInfo={userInfo} onClick={toggleHandler} />
      {isToggleOn && (
        <>
          <List>
            <ProfileTitle>
              <UserName>{userName}</UserName>님
            </ProfileTitle>
            <ProfileList onClick={moveMypage}>마이페이지</ProfileList>
            <ProfileList onClick={logoutHandler}>로그아웃</ProfileList>
          </List>
          <ProfileBack onClick={toggleHandler} />
        </>
      )}
      <CreateBtn onClick={moveCreatePage}>프로젝트 생성</CreateBtn>
      <ProjectList onClick={moveListPage}>프로젝트 리스트</ProjectList>
    </>
  );
};

export default ProfileModal;

const Profile = styled.img.attrs(({ userInfo }) => ({
  src: userInfo,
  alt: 'userImage',
}))`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: grey;
  border-radius: 50%;
`;

const CreateBtn = styled.p`
  margin-right: 30px;
  font-size: 1rem;
  line-height: 50px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.mainColor};
  }
`;

const ProjectList = styled(CreateBtn)``;

const List = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  width: 150px;
  background-color: white;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 10px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

const ProfileTitle = styled.p`
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 10px;
`;

const ProfileList = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.inputBorder};
    cursor: pointer;
  }
`;

const UserName = styled.span`
  text-decoration: underline;
`;

const ProfileBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
`;
