import React from 'react';
import styled from 'styled-components';

const SearchCard = ({ output }) => {
  return (
    <Card>
      <CardImg url={output.thumbnail[0]} />
      <CardTitle>{output.title}</CardTitle>
    </Card>
  );
};

export default SearchCard;

const Card = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.inputBorder};
  }
`;

const CardImg = styled.img.attrs(({ url }) => ({
  src: url,
}))`
  width: 40px;
  margin-right: 20px;
`;

const CardTitle = styled.p``;
