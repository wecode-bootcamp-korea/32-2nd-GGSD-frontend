import React from 'react';
import styled from 'styled-components';
import useToggle from '../CustomHook/useToggle';
import { KAKAO } from '../../config';

const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO.API_KEY}&redirect_uri=${KAKAO.REDIR}&response_type=code`;

const LoginModal = () => {
  const { isToggleOn, toggleHandler } = useToggle();

  return (
    <>
      <LoginButton onClick={toggleHandler}>로그인</LoginButton>
      {isToggleOn && (
        <>
          <LoginWindow>
            <LoginTitle>로그인 방식을 선택해주세요</LoginTitle>
            <LoginImg toggleHandler={toggleHandler} URL={URL}>
              <KakaoImg />
            </LoginImg>
          </LoginWindow>
          <LoginBack onClick={toggleHandler} />
        </>
      )}
    </>
  );
};

export default LoginModal;

const LoginButton = styled.div`
  width: 100px;
  height: 50px;
  background-color: ${props => props.theme.mainColor};
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.white};
    color: ${props => props.theme.mainColor};
  }
`;

const LoginWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 240px;
  padding: 50px;
  border-radius: 10px;
  background-color: white;
  font-size: 1.5rem;
  transform: translate(-50%, -50%);
  z-index: 105;
`;

const LoginTitle = styled.p`
  width: 100%;
  padding: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.inputBorder};
`;

const LoginImg = styled.a.attrs(({ URL }) => ({
  href: URL,
}))`
  display: flex;
  justify-content: center;
`;

const KakaoImg = styled.img.attrs(() => ({
  src: '/images/kakaologin.png',
}))`
  width: 200px;
`;

const LoginBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
