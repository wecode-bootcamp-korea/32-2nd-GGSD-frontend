import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Card = ({ data }) => {
  const { thumbnail, title, stacks } = data;
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`detail/${data.project_id}`);
  };

  return (
    <CardList onClick={goToDetail}>
      <ImgWrap>
        <CardImg src={thumbnail} />
      </ImgWrap>
      <Category>project</Category>
      <Title>{title}</Title>
      <StackCover>
        {stacks.map(stack => {
          return (
            <Stack key={stack.id} color={stack.color}>
              {stack.title}
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
  flex-basis: 25%;
  width: 100%;
  transform: scale(0.9);
  transform: all 0.3s;

  &:hover {
    transform: scale(1);
    transition-duration: 0.5s;
  }
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 139px;
  border-radius: 8px;
`;

const CardImg = styled.img`
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
