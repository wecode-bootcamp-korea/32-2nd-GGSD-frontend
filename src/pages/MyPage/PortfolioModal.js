import React, { useState } from 'react';
import styled from 'styled-components';

const PortfolioModal = ({ toggleHandler, setPostData, setUserInfo }) => {
  const [formData, setFormData] = useState();

  const inputFile = ({ target }) => {
    const formData = new FormData();
    formData.append('project_thumbnail', target.files[0]);
    setFormData({ thumbnail: formData });
  };

  const postPortfolio = () => {
    fetch(`http://10.58.3.182:8000/commons/file`, {
      method: 'POST',
      body: formData.thumbnail,
    })
      .then(res => res.json())
      .then(res => {
        setPostData(prev => ({
          ...prev,
          portfolio_file_url: res.UPLOADED_URL,
        }));
        setUserInfo(prev => ({
          ...prev,
          portfolios: res.UPLOADED_URL,
        }));
      });
    toggleHandler();
  };

  return (
    <>
      <PortfolioWindow>
        <FileUpload onChange={inputFile} type="file" />
        <Resister onClick={postPortfolio}>입력완료</Resister>
      </PortfolioWindow>
      <ModalBack
        onClick={() => {
          toggleHandler();
        }}
      />
    </>
  );
};

export default PortfolioModal;

const PortfolioWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 100px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  z-index: 50;
`;

const FileUpload = styled.input.attrs(() => ({
  type: 'file',
}))``;

const Resister = styled.button`
  width: 80px;
  height: 30px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.cssColor};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.cssColor};
  color: white;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.cssColor};
  }
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 10;
`;
