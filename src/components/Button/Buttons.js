import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../styles/Theme';

const Button = ({ item, isClicked, handleClick }) => {
  return (
    <Btn isClicked={isClicked} onClick={handleClick} type="button">
      {item.name}
    </Btn>
  );
};

const Btn = styled.button`
  ${props => {
    if (props.isClicked) {
      return css`
        background-color: ${props.theme.mainColor};
        border: 1px solid ${props.theme.mainColor};
        color: #fff;
      `;
    } else {
      return css`
        background-color: #fff;
        border: 1px solid ${props.theme.middleGrey};
        color: ${props.theme.middleGrey};
      `;
    }
  }}
  padding: 5px 10px;
  margin-right: 8px;
  border-radius: 20px;
  font-size: 15px;
  margin-bottom: 8px;
  &:hover {
    background-color: white;
    border: 1px solid ${theme.mainColor};
    color: ${theme.mainColor};
  }
`;

export default Button;
