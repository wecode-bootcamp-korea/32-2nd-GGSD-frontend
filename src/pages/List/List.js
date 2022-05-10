import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Buttons';
import Card from '../../components/Card/Card';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const LIMIT = 8;

const List = () => {
  // 메타데이터
  const [metaDataObj, setMetaDataObj] = useState({});
  //
  const [filterList, setFilterList] = useState([]);

  // 상품
  const [card, setCard] = useState([]);
  const [isclickCalendar, setIsclickCalendar] = useState(false);
  const [date, setDate] = useState([]);
  const [offset, setOffset] = useState(0);

  // 메타 데이터
  useEffect(() => {
    fetch('http://10.58.3.182:8000/commons/meta')
      .then(res => res.json())
      .then(data => {
        setMetaDataObj(data.results[0]);
      });
  }, []);

  // 리스트 데이터
  useEffect(() => {
    fetch(
      `http://10.58.3.182:8000/projects?&limit=${LIMIT}&offset=${
        LIMIT * offset
      }&${filterList.join('&')}`
    )
      .then(res => res.json())
      .then(data => {
        setCard(prev => [...prev, ...data.results]);
      });
  }, [offset]);

  useEffect(() => {
    setOffset(0);
    fetch(
      `http://10.58.3.182:8000/projects?&limit=${LIMIT}&offset=${
        LIMIT * offset
      }&${filterList.join('&')}`
    )
      .then(res => res.json())
      .then(data => {
        setCard(data.results);
      });
  }, [filterList]);

  useEffect(() => {
    if (date.length === 0) return;

    const startDate = `${date[0].getFullYear()}-${
      date[0].getMonth() + 1
    }-${date[0].getDate()}`;

    const endDate = `${date[1].getFullYear()}-${
      date[1].getMonth() + 1
    }-${date[1].getDate()}`;

    const newList = filterList.filter(item => !item.includes('recruit'));
    setFilterList([
      ...newList,
      `start_recruit=${startDate}&end_recruit=${endDate}`,
    ]);
  }, [date]);

  console.log(filterList);
  window.onscroll = () => {
    window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight && setOffset(prev => prev + 1);
  };

  // 스택 버튼
  const handleClickStack = id => {
    if (filterList.includes(`stack_ids=${id}`)) {
      setFilterList(filterList.filter(stack => stack !== `stack_ids=${id}`));
    } else {
      setFilterList(prev => [...prev, `stack_ids=${id}`]);
    }
  };

  // 라디오 버튼
  const handleClickRadio = id => {
    if (filterList.includes(`category_ids=${id}`)) {
      setFilterList(
        filterList.filter(category => category !== `category_ids=${id}`)
      );
    } else {
      setFilterList(prev => [...prev, `category_ids=${id}`]);
    }
  };

  // 장소 버튼
  const handleClickPlace = e => {
    if (e.target.value === '지역을 선택해주세요.') {
      setFilterList(prev => prev.filter(place => !place.includes('region_id')));
      return;
    }

    if (filterList.find(place => place.includes('region_id')) === undefined) {
      setFilterList(prev => [...prev, `region_id=${e.target.value}`]);
    } else {
      setFilterList(prev => prev.filter(place => !place.includes('region_id')));
      setFilterList(prev => [...prev, `region_id=${e.target.value}`]);
    }
  };

  // 기간 버튼
  const handleClickCalendar = () => {
    document.body.style.overflow = 'hidden';
    setIsclickCalendar(true);
  };

  const outModal = () => {
    document.body.style.overflow = 'auto';
    setIsclickCalendar(false);
  };

  if (!metaDataObj.stacks) return <>데이터가 없습니다</>;

  return (
    <Wrap>
      <Article>
        <Title stack>스택</Title>
      </Article>
      <>
        {metaDataObj.stacks.map((item, idx) => (
          <Button
            key={idx}
            text={item.title}
            isClicked={filterList.includes(`stack_ids=${item.id}`)}
            handleClick={() => handleClickStack(item.id)}
          />
        ))}
      </>
      <Section termplace>
        <Article term>
          <Title term>모집 기간</Title>
          <TermBox onClick={handleClickCalendar}>
            {date.length === 0
              ? '기간을 선택해주세요.'
              : `${date[0]
                  .toLocaleDateString()
                  .slice(
                    0,
                    date[0].toLocaleDateString().length - 1
                  )} ~ ${date[1]
                  .toLocaleDateString()
                  .slice(0, date[1].toLocaleDateString().length - 1)}`}
          </TermBox>
          {isclickCalendar && (
            <Wrap calendar>
              <Calendar
                onChange={setDate}
                selectRange={true}
                minDate={new Date()}
                nextLabel="month >"
                nextAriaLabel="Go to next month"
                next2Label="year >"
                next2AriaLabel="Go to next year"
                prevLabel="< month"
                prevAriaLabel="Go to prev month"
                prev2Label="< year"
                prev2AriaLabel="Go to prev year"
              />
              <TermBoxBackground onClick={outModal} />
            </Wrap>
          )}
        </Article>
        <Article place>
          <Title place>지역</Title>
          <PlaceBox onChange={handleClickPlace}>
            <PlaceOption>지역을 선택해주세요.</PlaceOption>
            {metaDataObj.regions.map((place, idx) => (
              <PlaceOption key={idx} value={place.id}>
                {place.district_name}
              </PlaceOption>
            ))}
          </PlaceBox>
        </Article>
      </Section>
      <Section category>
        <Title category>프로젝트 카테고리</Title>
        {metaDataObj.categories.map((category, idx) => (
          <CategoryBox key={idx}>
            <CategoryBtn
              id={category.id}
              type="checkBox"
              isClicked={filterList.includes(category.name)}
              onClick={() => handleClickRadio(category.id)}
            />
            <CategoryName htmlFor={category.id}>{category.title}</CategoryName>
          </CategoryBox>
        ))}
      </Section>
      <ProjectListWrap>
        <Title>프로젝트 리스트</Title>
        <ProjectCardBox>
          {card.map((data, idx) => (
            <Card key={idx} data={data} />
          ))}
        </ProjectCardBox>
      </ProjectListWrap>
    </Wrap>
  );
};

//공통

const Wrap = styled.div`
  margin: 0 auto;
  max-width: 970px;
`;

const Section = styled.section`
  display: flex;
  justify-content: ${props => props.termplace && 'space-between'};
  margin-top: ${props => (props.termplace || props.category ? '50px' : '0px')};
`;

const Title = styled.h3`
  margin-bottom: ${props => props.stack && '30px'};
  margin-right: ${props => (props.term || props.place ? '30px' : '0px')};
  margin-top: ${props => (props.list || props.stack ? '80px' : '0px')};
  font-size: ${props =>
    props.term || props.place || props.stack || props.category
      ? '25px'
      : '35px'};
`;

const Article = styled.div`
  display: ${props => (props.term || props.place ? 'flex' : '')};
  align-items: ${props => (props.term || props.place ? 'center' : '')};
  position: relative;
  /* top: 50%; */
  .react-calendar {
    width: 400px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    position: absolute;
    z-index: 1000;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #d0c1ff;
    color: #6f48eb;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
    color: white;
  }
`;

// 프로젝트 기간
const TermBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  font-size: 15px;
`;

const TermBoxBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const ProjectCardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 970px;
  margin-top: 50px;
`;

const ProjectListWrap = styled.div`
  width: 970px;
  height: 100%;
  margin-top: 70px;
`;

// 프로젝트 카테고리

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const CategoryBtn = styled.input``;

const CategoryName = styled.label`
  margin-left: 5px;
`;

// 프로젝트 지역

const PlaceBox = styled.select`
  border: 1px solid black;
  width: 200px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  font-size: 15px;
  text-align: center;
`;

const PlaceOption = styled.option`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default List;
