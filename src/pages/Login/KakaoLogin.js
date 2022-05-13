import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { KAKAO } from '../../config';
import styled from 'styled-components';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const AUTH = location.search.split('=')[1];

  useEffect(() => {
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&code=${AUTH}&redirect_uri=${KAKAO.REDIR}`,
    })
      .then(res => {
        if (res.status !== 200) {
          alert('로그인 실패');
          navigate('/');
        } else {
          return res.json();
        }
      })
      .then(res => {
        fetch('http://10.58.3.182:8000/users/login', {
          headers: { Authorization: res.access_token },
        })
          .then(res => res.json())
          .then(res => {
            if (res.MESSAGE !== 'SUCCESS') {
              alert('로그인을 다시 시도해 주세요');
              navigate('/');
            } else {
              console.log(res);
              alert('로그인을 성공하셨습니다');
              localStorage.setItem('token', res.access_token);
              navigate('/');
            }
          });
      });
  }, []);

  return <LoginMessage>로그인중입니다.</LoginMessage>;
};
export default KakaoLogin;

const LoginMessage = styled.p`
  font-size: 2rem;
`;
