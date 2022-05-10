import React, { useEffect, useState } from 'react';
import Slider from 'react-slick/lib/slider';
import styled from 'styled-components';
import Card from '../../components/Card/Card';

const LIMIT = 12;
const ProjectCarousel = () => {
  const [deadline, setDeadline] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [newProject, setNewProject] = useState([]);

  useEffect(() => {
    fetch(
      `http://10.58.3.182:8000/projects?sort=recent_created&limit=${LIMIT}&offset=0`
    )
      .then(res => res.json())
      .then(data => setNewProject(data.results));
  }, []);

  useEffect(() => {
    fetch(
      `http://10.58.3.182:8000/projects?sort=deadline&limit=${LIMIT}&offset=0`
    )
      .then(res => res.json())
      .then(data => setDeadline(data.results));
  }, []);

  useEffect(() => {
    fetch(
      `http://10.58.3.182:8000/projects?sort=recent_created&limit=${LIMIT}&offset=0`
    )
      .then(res => res.json())
      .then(data => {
        setRecommendation(data.results);
      });
  }, []);

  const option = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Title>🌟 신규 프로젝트</Title>
      <ProjectCarouselWrap>
        <Slider {...option}>
          {newProject.map(data => (
            <Card key={data.project_id} data={data} />
          ))}
        </Slider>
      </ProjectCarouselWrap>

      <Title>🚨 마감임박</Title>
      <ProjectCarouselWrap>
        <Slider {...option}>
          {deadline.map(data => (
            <Card key={data.project_id} data={data} />
          ))}
        </Slider>
      </ProjectCarouselWrap>

      <Title>💟 전체기수 추천</Title>
      <ProjectCarouselWrap>
        <Slider {...option}>
          {recommendation.map(data => (
            <Card key={data.project_id} data={data} />
          ))}
        </Slider>
      </ProjectCarouselWrap>
    </>
  );
};

const Title = styled.p`
  margin-left: 8px;
  padding-bottom: 18px;
  font-size: 22px;
  font-weight: 700;
  color: ${props => props.theme.fontColor};
`;

const ProjectCarouselWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 180px;
  margin-bottom: 15%;
`;

const NextArrow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${props => (props.top ? '50%' : 'calc(125px / 2)')};
  right: 0;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.lightGrey};
  border-radius: 100%;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    background-color: ${props => props.theme.deepGrey};
  }

  &::before {
    content: '>';
    color: ${props => (props.color ? '#FFFFFF' : '#666666')};
    font-size: 30px;
  }
`;

const PrevArrow = styled(NextArrow)`
  left: 0;
  z-index: 1;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    background-color: ${props => props.theme.lightGrey};
  }

  &::before {
    content: '<';
  }
`;

export default ProjectCarousel;
