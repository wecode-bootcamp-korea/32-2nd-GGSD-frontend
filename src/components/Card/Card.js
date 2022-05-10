import React from 'react';
import { STACK_LIST } from './cardData';
import styled from 'styled-components';

const Card = () => {
  return (
    <CardList>
      <CardImg src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"></CardImg>
      <Category>project</Category>
      <Title>하영이의 클론코딩을 함께하면 너무 재밌어요?</Title>
      <StackCover>
        {STACK_LIST.map(stack => {
          const { id, color, name } = stack;

          return (
            <Stack key={id} color={color}>
              {name}
            </Stack>
          );
        })}
      </StackCover>
    </CardList>
  );
};

const StackCover = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 223px;
  margin: 0 8px;
`;

const CardImg = styled.img`
  border-radius: 8px;
  height: 139px;
  width: 100%;
`;

const Category = styled.div`
  font-size: 14px;
  margin: 8px 0;
  color: #828282;
`;

const Title = styled.div`
  color: #333;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Stack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 25px;
  margin-bottom: 5px;
  margin-right: 8px;
  padding: 3px 5px;
  font-size: 12px;
  color: white;
  border-radius: 7px;
  background-color: ${props => props.color};
`;

export default Card;
