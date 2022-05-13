import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Buttons';
import Calendar from 'react-calendar';
import * as S from './CreateProject.style';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config';

const PlaceholderText = `프로젝트에 대한 설명을 자세히 적어주세요.
프로젝트 주제 : 
주요 기능 :`;

const imgType = ['jpeg', 'jpg', 'png'];

const defaultThumbnailUrl = `https://ggsd.s3.ap-northeast-2.amazonaws.com/4d1074a2-c605-46c4-b43f-dae9e499588f`;

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    thumbnail: null,
    category: null,
    title: null,
    frontVacancy: 0,
    backVacancy: 0,
    applyPosition: null,
    region: null,
    stacks: [],
    portfolio: false,
    description: null,
  });

  const {
    thumbnail,
    category,
    title,
    frontVacancy,
    backVacancy,
    applyPosition,
    region,
    stacks,
    portfolio,
    description,
  } = projectData;

  const navigate = useNavigate();

  const [metaData, setMetaData] = useState({});

  const [defaultThumbnail, setDefaultThumbnail] = useState(false);

  console.log(defaultThumbnail);

  const fileRef = useRef();
  const [preview, setPreview] = useState();

  const [currentTerm, setCurrentTerm] = useState('');
  const [recruitmentTerm, setRecruitmentTerm] = useState([
    new Date(),
    new Date(),
  ]);
  const [projectTerm, setProjectTerm] = useState([new Date(), new Date()]);

  const changeFormDataImg = e => {
    const formData = new FormData();
    formData.append('project_thumbnail', e.target.files[0]);

    setProjectData({ ...projectData, thumbnail: formData });
  };

  const changePreviewImg = e => {
    const { files } = e.target;

    if (!imgType.includes(files[0].type.slice(6))) {
      alert('이미지 파일만 업로드가 가능합니다');
      return;
    }

    const imgSrc = URL.createObjectURL(files[0]);
    setPreview(imgSrc);
  };

  const setImageData = e => {
    changeFormDataImg(e);
    changePreviewImg(e);
  };

  const setChangeInput = e => {
    const { type, id, value } = e.target;

    let valueFix = value.trim(' ');

    if (type === 'text' && id !== 'title') {
      valueFix = parseInt(value) || 0;
    }

    if (id === 'region') {
      valueFix = parseInt(value);
    }

    setProjectData({ ...projectData, [id]: valueFix });
  };

  const typeClick = e => {
    const { nodeName, id } = e.target;

    nodeName === 'INPUT' &&
      setProjectData({ ...projectData, category: Number(id) });
  };

  const positionClick = e => {
    const { nodeName, id } = e.target;

    nodeName === 'INPUT' &&
      setProjectData({ ...projectData, applyPosition: Number(id) });
  };

  const dateTypeChange = dateTerm => {
    return dateTerm.map(date =>
      date.toLocaleDateString('en-GB').split('/').reverse().join('-')
    );
  };

  useEffect(() => {
    fetch(`${API.COMMONS}/meta`)
      .then(res => res.json())
      .then(data => {
        setMetaData(data.results[0]);
      });
  }, []);

  const getThumbnailUrl = async () => {
    try {
      const response = await fetch(`${API.COMMONS}/file`, {
        method: 'POST',
        body: thumbnail,
      });
      const data = await response.json();
      return data.UPLOADED_URL;
    } catch (err) {
      console.error('이것은 이미지 못받은 에러다', err);
    }
  };

  const postProjectForm = async imgUrl => {
    const recruitmentDate = dateTypeChange(recruitmentTerm);
    const projectDate = dateTypeChange(projectTerm);

    try {
      const response = await fetch(`${API.PROJECTS}/enrollment`, {
        method: 'POST',
        // headers: { Authorization: `${localStorage.getItem('token')}` },
        body: JSON.stringify({
          image_url: imgUrl,
          project_category_id: category,
          title: title,
          front_vacancy: frontVacancy,
          back_vacancy: backVacancy,
          project_apply_position_id: applyPosition,
          start_recruit: recruitmentDate[0],
          end_recruit: recruitmentDate[1],
          start_project: projectDate[0],
          end_project: projectDate[1],
          region_id: region,
          project_stacks_ids: stacks,
          is_private: portfolio,
          description: description,
        }),
      });

      const projectId = await response.json();
      alert('프로젝트가 등록되었습니다!');
      navigate(
        `${process.env.PUBLIC_URL}/detail/${projectId.results[0].project.id}`
      );
    } catch (err) {
      console.error('이것이 에러다', err);
    }
  };

  const submitClick = async () => {
    try {
      if (defaultThumbnail) {
        await postProjectForm(defaultThumbnailUrl);
      } else {
        const getReturnImgUrl = await getThumbnailUrl();
        await postProjectForm(getReturnImgUrl);
      }
    } catch (err) {
      console.error('연결 async 에러!!', err);
    }
  };

  const handleStack = id => {
    const { stacks } = projectData;
    if (stacks.includes(id)) {
      const newStacks = stacks.filter(stack => id !== stack);
      setProjectData({ ...projectData, stacks: newStacks });
    } else {
      const newStacks = stacks.concat(id);
      setProjectData({ ...projectData, stacks: newStacks });
    }
  };

  const showCalendar = e => {
    if (e.target !== e.currentTarget) return;
    setCurrentTerm(e.target.id);
  };

  const hideCalendar = () => {
    setCurrentTerm('');
  };

  const CheckPortFolio = e => {
    setProjectData({ ...projectData, portfolio: e.target.checked });
  };

  const toggleDefaultThumb = () => {
    setDefaultThumbnail(!defaultThumbnail);
  };

  const checkedDefaultThumbnail = e => {
    fileRef.current.value = '';
    if (e.target.checked) {
      toggleDefaultThumb();
      setProjectData({
        ...projectData,
        thumbnail: defaultThumbnailUrl,
      });
    } else {
      toggleDefaultThumb();
      setProjectData({
        ...projectData,
        thumbnail: null,
      });
    }
  };

  const isAllFilled =
    thumbnail &&
    category &&
    title &&
    applyPosition &&
    recruitmentTerm.length > 1 &&
    projectTerm.length > 1 &&
    region !== '선택하세요' &&
    stacks.length &&
    description;

  if (!metaData.categories) return <>데이터가 없습니다!</>;
  return (
    <S.CreateForm>
      <S.Section textInput>
        <S.Name inputTitle>프로젝트 이미지</S.Name>
        <S.Name inputTitle>
          (썸네일 사이즈 : 650 x 400 , 가능 확장자 : .jpeg/.jpg/.png)
        </S.Name>
        <S.DefaultThumbLabel useClick>
          <S.DefaultThumb onChange={checkedDefaultThumbnail} type="checkBox" />
          기본이미지 사용
        </S.DefaultThumbLabel>
        <S.FileDrag isImg={defaultThumbnail}>
          <S.FileInput
            isImg={thumbnail}
            id="thumbnail"
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={setImageData}
          />
          <S.Area isImg={thumbnail}>
            {thumbnail ? (
              <S.Thumbnail alt="project thumbnail" src={preview} />
            ) : (
              '이미지를 드래그 앤 드롭 하세요.'
            )}
          </S.Area>
        </S.FileDrag>
        <S.Article>
          <S.Name inputTitle isTitle>
            프로젝트 카테고리
          </S.Name>
          <S.Wrap onClick={typeClick}>
            {metaData.categories.map(({ title, id }) => (
              <S.Label key={id}>
                <S.RadioBtn
                  name="category"
                  projectData={projectData}
                  id={id}
                  type="radio"
                />
                {title}
              </S.Label>
            ))}
          </S.Wrap>
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            프로젝트명
          </S.Name>
          <S.Input
            id="title"
            maxLength="20"
            type="text"
            placeholder="20자 내로 작성해 주세요"
            onChange={setChangeInput}
          />
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            인원
          </S.Name>
          <S.Wrap vacancy>
            <S.SubLabel flex htmlFor="frontVacancy">
              <S.Name subName>FE</S.Name>
              <S.Input
                id="frontVacancy"
                type="text"
                min="0"
                value={frontVacancy}
                onChange={setChangeInput}
              />
            </S.SubLabel>
            <S.SubLabel flex htmlFor="backVacancy">
              <S.Name subName>BE</S.Name>
              <S.Input
                id="backVacancy"
                type="text"
                min="0"
                value={backVacancy}
                onChange={setChangeInput}
              />
            </S.SubLabel>
          </S.Wrap>
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            내 포지션
          </S.Name>
          <S.Wrap onClick={positionClick}>
            {metaData.positions
              .slice(0, 2)
              .reverse()
              .map(({ id, roll }) => (
                <S.Label key={id}>
                  <S.RadioBtn
                    name="applyPosition"
                    projectData={projectData}
                    id={id}
                    type="radio"
                  />
                  {roll}
                </S.Label>
              ))}
          </S.Wrap>
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            모집기간
          </S.Name>
          <S.Wrap>
            <S.RecruitmentTerm
              id="recruitment"
              isDefault={
                recruitmentTerm[0].toLocaleString() ===
                recruitmentTerm[1].toLocaleString()
              }
              onClick={showCalendar}
            >
              {recruitmentTerm[0].toLocaleString() ===
              recruitmentTerm[1].toLocaleString()
                ? '기간을 선택하세요'
                : `${recruitmentTerm[0]
                    .toLocaleDateString('en-GB')
                    .split('/')
                    .reverse()
                    .join('-')} ~ ${recruitmentTerm[1]
                    .toLocaleDateString('en-GB')
                    .split('/')
                    .reverse()
                    .join('-')}`}
              {currentTerm === 'recruitment' && (
                <>
                  <Calendar
                    calendarType="US"
                    onChange={setRecruitmentTerm}
                    value={recruitmentTerm}
                    selectRange={true}
                    minDate={new Date()}
                    nextLabel="month >"
                    nextAriaLabel="Go to next month"
                    next2Label="year >"
                    next2AriaLabel="Go to next year"
                    prevLabel="<S. month"
                    prevAriaLabel="Go to prev month"
                    prev2Label="<S. year"
                    prev2AriaLabel="Go to prev year"
                  />
                  <S.CalendarOff onClick={hideCalendar} />
                </>
              )}
            </S.RecruitmentTerm>
          </S.Wrap>
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            프로젝트기간
          </S.Name>
          <S.Wrap>
            <S.ProjectTerm
              id="projectTerm"
              isDefault={
                projectTerm[0].toLocaleString() ===
                projectTerm[1].toLocaleString()
              }
              onClick={showCalendar}
            >
              {projectTerm[0].toLocaleString() ===
              projectTerm[1].toLocaleString()
                ? '기간을 선택하세요'
                : `${projectTerm[0]
                    .toLocaleDateString('en-GB')
                    .split('/')
                    .reverse()
                    .join('-')} ~ ${projectTerm[1]
                    .toLocaleDateString('en-GB')
                    .split('/')
                    .reverse()
                    .join('-')}`}
              {currentTerm === 'projectTerm' && (
                <>
                  <Calendar
                    calendarType="US"
                    onChange={setProjectTerm}
                    value={projectTerm}
                    selectRange={true}
                    minDate={new Date()}
                    nextLabel="month >"
                    nextAriaLabel="Go to next month"
                    next2Label="year >"
                    next2AriaLabel="Go to next year"
                    prevLabel="<S. month"
                    prevAriaLabel="Go to prev month"
                    prev2Label="<S. year"
                    prev2AriaLabel="Go to prev year"
                  />
                  <S.CalendarOff onClick={hideCalendar} />
                </>
              )}
            </S.ProjectTerm>
          </S.Wrap>
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            장소
          </S.Name>
          <S.Place
            id="region"
            isSelected={region === null}
            onChange={setChangeInput}
          >
            <S.Regions>선택하세요</S.Regions>
            {metaData.regions.map(({ id, district_name }) => (
              <S.Regions key={id} value={id}>
                {district_name}
              </S.Regions>
            ))}
          </S.Place>
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            필요스택
          </S.Name>
          <S.ButtonBox>
            {metaData.stacks.map(({ id, title }) => (
              <Button
                key={id}
                text={title}
                isClicked={stacks.includes(id)}
                handleClick={() => handleStack(id)}
              />
            ))}
          </S.ButtonBox>
        </S.Article>
        <S.Article useClick>
          <S.PortfolioLabel>
            <S.CheckPortfolio onChange={CheckPortFolio} type="checkBox" />내
            포트폴리오 비공개
          </S.PortfolioLabel>
        </S.Article>
        <S.Article>
          <S.Name inputTitle isTitle>
            상세 내용
          </S.Name>
          <S.Description
            id="description"
            placeholder={PlaceholderText}
            onChange={setChangeInput}
          />
        </S.Article>
      </S.Section>
      <S.SubmitBtn
        isAllFilled={isAllFilled}
        type="button"
        onClick={submitClick}
      >
        등록완료
      </S.SubmitBtn>
    </S.CreateForm>
  );
};

export default CreateProject;
