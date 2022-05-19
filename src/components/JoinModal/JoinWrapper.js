import React from 'react';
import styled from 'styled-components';
import JoinModal from './JoinModal';
import useToggle from '../CustomHook/useToggle';
const JoinWrapper = ({
  projectId,
  title,
  feVacancy,
  essentialStacks,
  beVacancy,
}) => {
  const { isToggleOn, toggleHandler } = useToggle();
  return (
    <>
      <GoToJoin onClick={toggleHandler}>소인 그대와 조인할것이옵니다.</GoToJoin>
      {isToggleOn && (
        <>
          <JoinModal
            projectId={projectId}
            title={title}
            feVacancy={feVacancy}
            essentialStacks={essentialStacks}
            beVacancy={beVacancy}
            toggleHandler={toggleHandler}
          />
          <Modal onClick={toggleHandler} />
        </>
      )}
    </>
  );
};

export default JoinWrapper;

const GoToJoin = styled.button`
  width: 70%;
  padding: 16px;
  margin-top: 16px;
  border-radius: 3px;
  font-size: 12px;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.mainColor};
    color: #fff;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 80;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000070;
`;
