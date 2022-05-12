import React from 'react';
import styled from 'styled-components';
import useToggle from '../../components/CustomHook/useToggle';
import PortfolioModal from './PortfolioModal';

const PortfolioWrapper = ({
  title,
  setPostData,
  userInfo,
  setUserInfo,
  isEdit,
}) => {
  const { isToggleOn, toggleHandler } = useToggle();

  return (
    <Portfolio>
      <PortfolioInfo>
        <PortfolioTitle>{title}</PortfolioTitle>
        {isEdit && <EditButton onClick={toggleHandler}>편집하기</EditButton>}
        {isToggleOn && (
          <PortfolioModal
            setPostData={setPostData}
            toggleHandler={toggleHandler}
            setUserInfo={setUserInfo}
          />
        )}
      </PortfolioInfo>
      <PortfolioList>
        {userInfo.portfolios ? (
          <PortfolioLink url={userInfo.portfolios}>
            포트폴리오 등록완료
          </PortfolioLink>
        ) : (
          <PortfolioAddress>포트폴리오 없음</PortfolioAddress>
        )}
      </PortfolioList>
    </Portfolio>
  );
};

export default PortfolioWrapper;

const Portfolio = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};
  margin-top: 10px;
`;

const PortfolioInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PortfolioTitle = styled.h1`
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

const PortfolioList = styled.div`
  width: 100%;
`;

const PortfolioLink = styled.a.attrs(({ url }) => ({
  href: url,
  target: '_blank',
}))`
  padding-left: 10px;
  margin-top: 15px;
  font-size: 1.5rem;
`;

const PortfolioAddress = styled.p`
  padding-left: 10px;
  margin-top: 15px;
  font-size: 1.5rem;
`;
