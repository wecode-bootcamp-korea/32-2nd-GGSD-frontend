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
          <Text>상호명:(주)위코드개고수덜</Text>
          <Text>대표이사:LEE HEE JUN</Text>
          <Text>개인정보책임관리자:정덕우</Text>
          <Text>
            주소:서울시 강남구 테헤란로 427 위워크 타워(위워크 선릉 2호점)
          </Text>
          <Text>사업자등록번호:110-55-12345</Text>
          <Text>통신판매업신고증:제 2022-캘리포니아-00555 호</Text>
          <Text>직업정보제공사업 신고번호:서울청 제 2019-55호</Text>
          <Text>고객센터:1599-5555</Text>
        </Content>
      </Context>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  display: flex;
  height: 200px;
  padding: 20px 30px;
  border-top: 1px solid ${({ theme }) => theme.inputBorder};

  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: auto;
    gap: 30px;
  }
`;

const Logo = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img.attrs(
  { src: './images/logo.png' },
  { alt: '로고이미지' }
)`
  @media only screen and (max-width: 900px) {
    width: 180px;
  }
`;

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

  @media only screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
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
