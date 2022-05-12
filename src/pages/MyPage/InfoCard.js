import React from 'react';
import styled from 'styled-components';

const InfoCard = ({ title, children }) => {
  return (
    <Info>
      <Title>{title}</Title>
      <Context>{children}</Context>
    </Info>
  );
};

export default InfoCard;

const Info = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};
  margin-top: 10px;
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.fontColor};
`;

const Context = styled.p`
  padding-left: 10px;
  margin-top: 15px;
  font-size: 1.5rem;
`;
