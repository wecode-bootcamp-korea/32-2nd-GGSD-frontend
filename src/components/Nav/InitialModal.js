import React from 'react';
import styled from 'styled-components';
import useLockBodyScroll from '../CustomHook/useLockBodyScroll';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import useToggle from '../CustomHook/useToggle';

const InitialModal = () => {
  const { isToggleOn, toggleHandler } = useToggle();
  useLockBodyScroll();
  return (
    <>
      {!isToggleOn && (
        <>
          <ModalWindow>
            <AdditionalInfo toggleHandler={toggleHandler} />
          </ModalWindow>
          <ModalBack />
        </>
      )}
    </>
  );
};

export default InitialModal;

const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-color: white;
  z-index: 105;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
