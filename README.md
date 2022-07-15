# ► 개고수덜(GGSD)팀
- 개발자들의 고민과 수고를 덜어주는 사이트
- 숨고페이지를 다시 기획하여 숨은 고수를 찾아주는 페이지가 아닌
  개발자들끼리 프로젝트를 매칭해주는 페이지로 기획 변경해보았습니다.

## ► [개고수덜 사이트](http://13.56.151.244:8000/)

## ► 개발 인원 및 기간

- __개발기간__ : 2022/05/09 ~ 2022/05/20
- __개발인원__ : [[FE]](https://github.com/wecode-bootcamp-korea/32-2nd-GGSD-frontend) 정덕우, 최승이, 이하영, 이희준  //  [[BE]](https://github.com/wecode-bootcamp-korea/32-2nd-GGSD-backend) 지기성, 임수연
 


## ► 사용기술

### 📍기술스택 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=react router&logoColor=black"> <img src="https://img.shields.io/badge/styled component-4A154B?style=for-the-badge&logo=styled components&logoColor=black"> <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=black">

### 📍협업 툴
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## ► 기획 & 구현

### 1. metadata 

<img width="700" alt="meta data view" src="https://user-images.githubusercontent.com/89971435/169652820-5c771cf7-dc0f-47d5-94a7-07211917fba8.png">

- 변할 수 있는 값들을 메타데이터에서 찾아서 자동으로 데이터값이 적용
- 백엔드와 함께 소통하는 과정에서 인간의존성을 줄임


### 2. 이미지 직접 업로드(S3)

<img width="700" alt="S3 사용 이유" src="https://user-images.githubusercontent.com/89971435/169653649-1ca7947a-8e45-4883-9413-dbe107ccce05.png">
- local의 Resource를 직접 업로드 생성된 Uri 이용


## ► 기능 구현 및 시연영상
### 1. 소셜 로그인 기능

- 카카오 API 

https://user-images.githubusercontent.com/98532217/169686342-833df33c-d28c-44d6-abdc-e51ea1dfc194.mp4

- 사용자 정보 초기세팅 모달창
- 유효성검사 (기수 값에는 number 만 입력, 이름 값에는 text, 포지션 값은 metadata 활용)
- 모든 값 입력시 서버로 전송

https://user-images.githubusercontent.com/98532217/169686162-89ab645f-b5e0-4616-906f-b778529967c3.mp4

### 2. 메인페이지 : 캐러셀 
- 리액트 라이브러리 캐러셀 사용
- nextArrow , prevArrow 스타일 변경

https://user-images.githubusercontent.com/98532217/169685942-e8af90b0-f36d-4356-8f9d-f2459ba8bbc6.mp4

### 3. 리스트페이지 : 필터링 기능, 무한스크롤 기능
- 라이브러리 사용 x scroll이벤트 활용한 무한스크롤기능

https://user-images.githubusercontent.com/94230809/169644499-b3417ddd-6dc6-40b8-ae58-7b97fe6ff139.mp4


### 4. 프로젝트 생성페이지 : formdata 전송 기능
- 기본이미지 체크하면 서버에 저장되어 있는 기본이미지로 저장
- 로컬에 Resource 를 직접 업로드, 마지막으로 업로드한 사진으로 서버에 전송
- 버튼 클릭이벤트로 제출하면 모든 데이터 값(이미지 포함)이 서버로 전송

https://user-images.githubusercontent.com/98532217/169688264-427acc00-e243-417e-b32b-c65be45aca8c.mp4

### 5. 마이페이지 : 사진 서버로 전송 및 서버에서 받아서 활용
- S3이용하여 사진 파일 업로드

https://user-images.githubusercontent.com/98532217/169702443-74b3e822-dbba-4506-8a7a-e656c9ea5460.mp4


### Reference

- 이 프로젝트는 숨고 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.



