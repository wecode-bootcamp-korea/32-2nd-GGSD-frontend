import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <Logo>
        <LogoImg />
      </Logo>
      <Context>
        <Content>
          <Text>상호명:(주)브레이브모바일</Text>
          <Text>대표이사:KIM ROBIN H</Text>
          <Text>개인정보책임관리자:김태우</Text>
          <Text>주소:서울특별시 강남구 테헤란로 415, L7 강남타워 5층</Text>
          <Text>사업자등록번호:120-88-22325</Text>
          <Text>통신판매업신고증:제 2021-서울강남-00551 호</Text>
          <Text>직업정보제공사업 신고번호:서울청 제 2019-21호</Text>
          <Text>고객센터:1599-5319</Text>
        </Content>
      </Context>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  display: flex;
  width: 100%;
  min-width: 975px;
  height: 200px;
  padding: 20px 30px;
  border-top: 1px solid ${({ theme }) => theme.inputBorder};
`;

const Logo = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img.attrs(() => ({
  src: '/images/logo.png',
  alt: '로고이미지',
}))``;

const Context = styled.section`
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Content = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Text = styled.p`
  font-size: 15px;
  margin-left: 10px;
  line-height: 20px;

  &::before {
    content: '';
    margin-right: 4px;
    border: 1px solid grey;
    vertical-align: bottom;
    font-size: 8px;
  }
`;
