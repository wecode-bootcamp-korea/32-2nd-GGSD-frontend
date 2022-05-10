import styled, { css } from 'styled-components';

const focusNoOutline = css`
  &:focus {
    outline: none;
  }
`;

export const CreateForm = styled.form`
  margin: 0 auto;
  max-width: 650px;
  padding: 75px 3.6%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
`;

export const Wrap = styled.div`
  position: relative;
  display: flex;
  justify-content: ${({ between }) =>
    between ? 'space-between' : 'flex-start'};
  flex-wrap: ${({ vacancy }) => vacancy || 'wrap'};
  gap: 10px 15px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${props => {
    if (props.textInput) return '100%';
  }};

  .react-calendar {
    position: absolute;
    left: 0;
    top: 0;
    width: 400px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    z-index: 100;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    margin-top: 8px;
    color: #6f48eb;
    background: none;
    font-size: 16px;
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
    background: none;
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

export const Article = styled.article`
  display: ${props => !props.useClick && 'flex'};
  flex-direction: column;
  margin-top: 50px;
`;

export const Label = styled.label`
  display: ${props => (props.flex ? 'flex' : 'inline-block')};
  margin-right: 20px;
  align-items: ${props => props.flex && 'center'};
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
`;

export const SubLabel = styled.label`
  display: ${props => props.flex && 'flex'};
  align-items: ${props => props.flex && 'center'};
`;

export const Name = styled.h3`
  margin-right: ${props => props.subName && '10px'};
  margin-bottom: ${props => props.inputTitle && '15px'};
  font-weight: ${({ subName }) => subName || 800};
  color: ${({ theme }) => theme.fontColor};
`;

//인풋 모음
export const RadioBtn = styled.input`
  margin-right: 10px;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: ${({ id }) =>
    id === 'frontVacancy' || id === 'backVacancy' ? '50%' : '100%'};
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  ${props => {
    if (props.type === 'date') {
      return css`
        width: 100px;
      `;
    }
  }};
  ${focusNoOutline}
`;

export const FileArea = css`
  width: inherit;
  height: ${props => (props.isImg ? '400px' : '150px')};
  cursor: pointer;
`;

export const FileDrag = styled.div`
  position: relative;
  display: ${({ isImg }) => isImg && 'none'};
  width: inherit;
  cursor: pointer;
`;

export const FileInput = styled.input`
  position: absolute;
  z-index: 10;
  opacity: 0;
  ${FileArea}
`;

export const Area = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed ${({ theme }) => theme.inputBorder};
  overflow: hidden;
  z-index: 1;
  ${FileArea}
`;

export const Thumbnail = styled.img`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const term = css`
  padding: 10px;
  font-size: 12px;
  ${props => {
    if (props.isDefault) {
      return css`
        color: ${({ theme }) => theme.middleGrey};
      `;
    } else {
      return css`
        color: ${({ theme }) => theme.deepGrey};
      `;
    }
  }}
  border: 1px solid ${({ theme }) => theme.inputBorder};
  cursor: pointer;
`;

export const ProjectTerm = styled.div`
  ${term}
  @media screen and (max-width: 410px) {
    width: 100%;
  }
`;

export const RecruitmentTerm = styled.div`
  ${term}
  @media screen and (max-width: 410px) {
    width: 100%;
  }
`;

export const CalendarOff = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 5;
`;

export const Place = styled.select`
  width: 100px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.middleGrey : theme.deepGrey};
  ${focusNoOutline}
`;

export const Regions = styled.option``;

export const Description = styled.textarea`
  height: 200px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 3px;
  line-height: 1.5em;
  resize: none;

  ::placeholder {
    color: ${({ theme }) => theme.middleGrey};
  }
  ${focusNoOutline}
`;

export const CheckPortfolio = styled.input`
  margin-right: 10px;
`;

export const PortfolioLabel = styled(Label)`
  font-size: ${props => (props.isTitle ? '21px' : '16px')};
  font-weight: ${({ subName }) => subName || 800};
  color: ${({ theme }) => theme.fontColor};
`;

export const DefaultThumbLabel = styled(PortfolioLabel)`
  width: fit-content;
  margin-bottom: 15px;
`;
export const DefaultThumb = styled(CheckPortfolio)``;

export const SubmitBtn = styled.button.attrs(
  props => props.isAllFilled || { disabled: true }
)`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  border: none;
  border-radius: 3px;
  font-size: 12px;

  ${props => {
    if (props.isAllFilled) {
      return css`
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
        cursor: pointer;
        :hover {
          opacity: 0.8;
        }
      `;
    }
  }}
`;

export const ButtonBox = styled.div`
  width: 100%;
`;
