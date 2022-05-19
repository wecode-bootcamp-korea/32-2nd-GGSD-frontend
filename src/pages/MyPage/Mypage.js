import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InfoCard from './InfoCard';
import PortfolioWrapper from './PortfolioWrapper';
import StackWrapper from './StackWrapper';
import GitHubWrapper from './GitHubWrapper';
import Card from '../../components/Card/Card';
import { API } from '../../config';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    batch: '',
    email: '',
    github_url: '',
    name: '',
    portfolios: '',
    profile_url: '',
    stacks: [],
  });
  const [projectList, setProjectList] = useState({ create: [], request: [] });
  const [postData, setPostData] = useState({
    stack: [],
    github_repo_url: '',
    portfolio_file_url: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  let isValid = !!postData.github_repo_url && !!postData.portfolio_file_url;

  useEffect(() => {
    fetch(`${API.PROJECTS}?apply_status_id=2`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => res.json())
      .then(res => setProjectList(prev => ({ ...prev, create: res.results })));

    fetch(`${API.PROJECTS}?apply_status_id=1`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => res.json())
      .then(res => setProjectList(prev => ({ ...prev, request: res.results })));

    fetch(`${API.USERS}/detail`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
      .then(res => res.json())
      .then(res => {
        setUserInfo(res.results[0]);
      });
  }, []);

  const uploadData = () => {
    fetch(`${API.USERS}/detail`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(postData),
    })
      .then(res => {
        if (res.status !== 200) {
          alert('통신에러');
        } else {
          return res.json();
        }
      })
      .then(res => {
        if (res.MESSAGE === 'SUCCESS') {
          window.location.reload();
          editHandler();
        } else {
          alert('다시입력해주세요');
        }
      });
  };

  const editHandler = () => {
    setIsEdit(!isEdit);
    setUserInfo(prev => ({
      ...prev,
      portfolios: '',
      github_url: '',
      stacks: [],
    }));
  };

  return (
    <MypageContainer>
      <MypageTitle>마이페이지</MypageTitle>
      <MypageInfo>
        <ProfileImg url={userInfo.profile_url} />
        <InfoCard title="기수">{userInfo.batch}기</InfoCard>
        <InfoCard title="이름">{userInfo.name}</InfoCard>
        <InfoCard title="이메일">{userInfo.email}</InfoCard>
        <PortfolioWrapper
          userInfo={userInfo}
          title="포트폴리오"
          setPostData={setPostData}
          setUserInfo={setUserInfo}
          isEdit={isEdit}
        />
        <StackWrapper
          title="내스텍"
          userInfo={userInfo}
          setPostData={setPostData}
          setUserInfo={setUserInfo}
          isEdit={isEdit}
        />
        <GitHubWrapper
          title="GIT HUB 주소"
          userInfo={userInfo}
          setPostData={setPostData}
          setUserInfo={setUserInfo}
          isEdit={isEdit}
        />
        {isEdit ? (
          <ApplyButton disabled={!isValid} onClick={uploadData}>
            변경사항 저장
          </ApplyButton>
        ) : (
          <EditButton onClick={editHandler}>편집하기</EditButton>
        )}
      </MypageInfo>
      <MypageRequest>
        <RequestTitle>내가 요청한 프로젝트</RequestTitle>
        <RequestList>
          {projectList.request ? (
            projectList.request.map((list, idx) => (
              <Card key={idx} data={list} />
            ))
          ) : (
            <ListTitle>요청한 프로젝트가 없습니다.</ListTitle>
          )}
        </RequestList>
      </MypageRequest>
      <MypageCreate>
        <CreateTitle>내가 생성한 프로젝트</CreateTitle>
        <CreateList>
          {projectList.create ? (
            projectList.create.map((list, idx) => (
              <Card key={idx} data={list} />
            ))
          ) : (
            <ListTitle>생성한 프로젝트가 없습니다.</ListTitle>
          )}
        </CreateList>
      </MypageCreate>
    </MypageContainer>
  );
};

export default Mypage;

const MypageContainer = styled.main`
  width: 100%;
  min-width: 975px;
  padding: 180px 50px 30px;
  margin: 0 auto;
`;

const MypageTitle = styled.h1`
  width: 700px;
  font-size: 3rem;
  margin: 0 auto;
`;

const MypageInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 50px auto 100px;
`;

const ProfileImg = styled.img.attrs(({ url }) => ({
  src: url,
}))`
  width: 150px;
  height: 150px;
  background-color: grey;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const MypageRequest = styled.div`
  width: 80%;
  margin: 30px auto;
`;

const RequestTitle = styled.h2`
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.inputBorder};
`;

const RequestList = styled.div`
  display: flex;
`;

const MypageCreate = styled(MypageRequest)`
  margin-top: 80px;
`;

const CreateTitle = styled(RequestTitle)``;

const CreateList = styled(RequestList)``;

const ListTitle = styled.p`
  font-size: 1.2rem;
`;

const EditButton = styled.button`
  width: 80px;
  height: 20px;
  margin-top: 50px;
  background-color: ${({ theme }) => theme.cssColor};
  color: white;
  border: 1px solid ${({ theme }) => theme.cssColor};
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.cssColor};
  }
`;

const ApplyButton = styled(EditButton)`
  width: 100px;
  opacity: ${({ disabled }) => disabled && 0.3};
  cursor: ${({ disabled }) => disabled && 'initial'};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? ({ theme }) => theme.cssColor : 'white'};
    color: ${({ disabled }) =>
      disabled ? 'white' : ({ theme }) => theme.cssColor};
  }
`;
