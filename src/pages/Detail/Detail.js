import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import JoinWrapper from '../../components/JoinModal/JoinWrapper';
import { API } from '../../config';

const Detail = () => {
  const [data, setData] = useState({});
  const {
    creators,
    title,
    thumbnail,
    category,
    project_stacks,
    region,
    description,
    front_vacancy,
    back_vacancy,
    front_fixed,
    back_fixed,
    start_recruit,
    end_recruit,
    start_project,
    end_project,
  } = data;

  const params = useParams();

  useEffect(() => {
    fetch(`${API.PROJECTS}/${params.id}`)
      .then(res => res.json())
      .then(data => setData(data.results[0].project));
  }, []);

  if (!data.project_stacks) return <>데이터가 없습니다!</>;

  return (
    <DetailBox>
      <MainContents>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectThumbnail thumbnailUrl={thumbnail} />
      </MainContents>
      <ImportantContents>
        <Article>
          <ContentWrap>
            <Content isTitle>프로젝트 카테고리</Content>
            <Content>{category}</Content>
          </ContentWrap>
        </Article>
        <Article>
          <ContentWrap>
            <Content isTitle>현재 확정 인원</Content>
            <Content>
              <PersonnelList fullPersonnel={front_fixed === front_vacancy}>
                FE : {front_fixed} / {front_vacancy}
              </PersonnelList>
              <PersonnelList fullPersonnel={back_fixed === back_vacancy}>
                BE : {back_fixed} / {back_vacancy}
              </PersonnelList>
            </Content>
          </ContentWrap>
        </Article>
        <Article>
          <ContentWrap>
            <Content isTitle>모집 기간</Content>
            <Content>{`${start_recruit} ~ ${end_recruit}`}</Content>
          </ContentWrap>
        </Article>
        <Article>
          <ContentWrap>
            <Content isTitle>프로젝트 기간</Content>
            <Content>{`${start_project} ~ ${end_project}`}</Content>
          </ContentWrap>
        </Article>
        <Article>
          <ContentWrap>
            <Content isTitle>모임 장소</Content>
            <Content>{region || '협의'}</Content>
          </ContentWrap>
        </Article>
        <Article>
          {creators[0].portfolio[0].file_url &&
            !creators[0].portfolio[0].is_private && (
              <PortfolioBtn
                href={creators[0].portfolio[0].file_url}
                download={`${creators[0].name}_포트폴리오`}
              >
                <DownloadText>모집자 포트폴리오 다운로드</DownloadText>
                <Icon alt="download icon" src="/images/filedown.svg" />
              </PortfolioBtn>
            )}
        </Article>
      </ImportantContents>
      <DetailInfo>
        <Article>
          <ContentWrap>
            <Content isTitle>필수 스택</Content>
            <Content stack>
              {project_stacks.map(stack => (
                <Stack key={stack.stack_id} color={stack.color}>
                  {stack.title}
                </Stack>
              ))}
            </Content>
          </ContentWrap>
        </Article>
        <ContentWrap>
          <Content isTitle>상세 내용</Content>
          <Content idDetail>{description}</Content>
        </ContentWrap>
      </DetailInfo>
      <JoinBtnWrap>
        <JoinWrapper
          projectId={params.id}
          title={title}
          feVacancy={front_vacancy - front_fixed}
          beVacancy={back_vacancy - back_fixed}
          essentialStacks={project_stacks}
        />
      </JoinBtnWrap>
    </DetailBox>
  );
};

const textBoxPadding = css`
  padding: 0 3.6%;
`;

const DetailBox = styled.section`
  position: relative;
  margin: 50px auto;
  max-width: 650px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);

  * {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const ProjectThumbnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 13/8;
  overflow: hidden;
  background: no-repeat center ${({ thumbnailUrl }) => `URL(${thumbnailUrl})`};
  background-size: 100%;
  opacity: 1;
`;

const MainContents = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ProjectTitle = styled.h3`
  position: absolute;
  bottom: -15px;
  left: 0;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: 1.3em;
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  background-color: #000;
  padding: 5px 20px;
`;

const ImportantContents = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  margin-top: 50px;
  ${textBoxPadding}
  @media (max-width: 650px) {
    padding: 0 8%;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 15px;
  margin-bottom: 15px;
  font-size: 21px;
  font-weight: 300;
  white-space: pre-wrap;
  text-indent: 10px;
  color: ${({ theme }) => theme.fontColor};
  ${props => {
    if (props.isTitle) {
      return css`
        font-size: 16px;
        font-weight: 800;
        text-indent: 0px;
      `;
    } else if (props.stack) {
      return css`
        text-indent: 0px;
      `;
    } else if (props.idDetail) {
      return css`
        font-size: 19px;
        text-indent: 0px;
        line-height: 1.3em;
      `;
    }
  }}
`;

const PersonnelList = styled.span`
  ${props => {
    if (!props.fullPersonnel) {
      return css`
        color: skyblue;
        font-weight: 600;
      `;
    } else {
      return css`
        opacity: 0.4;
      `;
    }
  }};
  margin-right: 15px;
`;

const Stack = styled.span`
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 25px;
  margin-bottom: 5px;
  margin-right: 8px;
  padding: 5px 7px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border-radius: 7px;
  background-color: ${props => props.color};
`;

const PortfolioBtn = styled.a`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 300px;
  padding: 20px;
  color: ${({ theme }) => theme.middleGrey};
  border: 1px solid ${({ theme }) => theme.grey};

  :hover {
    color: ${({ theme }) => theme.deepGrey};
    border: 1px solid ${({ theme }) => theme.middleGrey};
    cursor: pointer;
  }
  &:link {
    text-decoration: none;
  }
`;

const DownloadText = styled.span``;

const DetailInfo = styled.section`
  width: 100%;
  ${textBoxPadding}
  padding-bottom: 50px;
`;

const Icon = styled.img`
  position: absolute;
  top: 17px;
  right: 30px;
  height: 20px;
  opacity: 0.3;
`;

const JoinBtnWrap = styled.article`
  display: flex;
  justify-content: center;
  ${textBoxPadding}
  padding-bottom: 75px;
`;

export default Detail;
