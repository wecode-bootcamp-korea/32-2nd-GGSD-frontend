import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({ text, isClicked, handleClick }) => {
  return (
    <Btn isClicked={isClicked} onClick={handleClick} type="button">
      {text}
    </Btn>
  );
};

const Btn = styled.button`
  ${({ isClicked, theme }) => {
    if (isClicked) {
      return css`
        background-color: ${theme.mainColor};
        border: 1px solid ${theme.mainColor};
        color: #fff;
      `;
    } else {
      return css`
        background-color: #fff;
        border: 1px solid ${theme.middleGrey};
        color: ${theme.middleGrey};
      `;
    }
  }}
  margin: 0 8px 8px 0;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 15px;

  @media screen and (max-width: 690px) {
    padding: 1% 30%;
    width: 80%;
  }

  &:hover {
    ${({ isClicked, theme }) => {
      if (isClicked) {
        return css`
          background-color: ${theme.mainColor};
          border: 1px solid ${theme.mainColor};
          color: #fff;
        `;
      } else {
        return css`
          background-color: white;
          border: 1px solid ${({ theme }) => theme.mainColor};
          color: ${({ theme }) => theme.mainColor};
        `;
      }
    }}
  }
`;

export default Button;
