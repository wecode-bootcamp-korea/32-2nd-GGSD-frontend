import React, { useEffect, useState } from 'react';
import Slider from 'react-slick/lib/slider';
import styled from 'styled-components';
import ProjectCarousel from './ProjectCarousel';
import { MAIN_CAROUSEL } from './carouselData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { API } from '../../config';

const LIMIT = 12;
const Main = () => {
  const [deadline, setDeadline] = useState([]);
  const [newProject, setNewProject] = useState([]);

  const option = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    nextArrow: <NextArrow isTop />,
    prevArrow: <PrevArrow isTop />,
  };

  useEffect(() => {
    fetch(`${API.PROJECTS}?sort=recent_created&limit=${LIMIT}&offset=0`)
      .then(res => res.json())
      .then(data => setNewProject(data.results));
    fetch(`${API.PROJECTS}?sort=deadline&limit=${LIMIT}&offset=0`)
      .then(res => res.json())
      .then(data => setDeadline(data.results));
  }, []);

  return (
    <MainWrap>
      <Carousel>
        <Slider {...option}>
          {MAIN_CAROUSEL.map((data, idx) => (
            <CarouselImg key={data.id} src={data.img} alt={data.alt} />
          ))}
        </Slider>
      </Carousel>
      <Banner
        href="https://justcoder.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BannerImg src="/images/wecodebanner.png" alt="wecodebanner" />
      </Banner>
      <ProjectCarousel deadline={deadline} newProject={newProject} />
    </MainWrap>
  );
};

const MainWrap = styled.div`
  width: 100%;
  max-width: 970px;
  margin: 0 auto;
`;

const Carousel = styled.div`
  width: 100%;
  margin-bottom: 8%;
`;

const CarouselImg = styled.img``;

const Banner = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerImg = styled.img`
  height: 147px;
  margin-bottom: 10%;
`;

const NextArrow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${props => (props.isTop ? '50%' : 'calc(125px / 2)')};
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
    color: ${props => (props.isTop ? '#FFFFFF' : '#666666')};
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

export default Main;
