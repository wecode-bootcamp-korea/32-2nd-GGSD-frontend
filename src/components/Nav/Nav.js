import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import ProfileModal from './ProfileModal';
import SearchCard from './SearchCard';
import InitialModal from './InitialModal';
import { API } from '../../config';

const Nav = () => {
  const [searchInput, setSearchInput] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [searchOutput, setSearchOutput] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname !== '/mypage' &&
      localStorage.getItem('token') &&
      fetch(`${API.USERS}/detail`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(res => res.json())
        .then(res => {
          setUserInfo(res.results[0]);
        });
  }, [location]);

  useEffect(() => {
    fetch(`${API.PROJECTS}?search=${searchInput.search}`)
      .then(res => res.json())
      .then(res => setSearchOutput(res.results));
  }, [searchInput]);

  const inputHandler = ({ target }) => {
    setSearchInput(prev => ({ ...prev, search: target.value }));
  };

  const resetSearch = () => {
    setSearchInput(prev => ({ ...prev, search: '' }));
  };

  const resumeSearch = ({ target }) => {
    setSearchInput(prev => ({ ...prev, search: target.value }));
  };

  const goMain = () => {
    navigate('/');
  };

  function handleScroll() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    }

    scrollListener();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Navigation scrollY={scrollY}>
      <Wrapper>
        <Logo onClick={goMain} />
        <SearchWrapper>
          <Search
            onChange={inputHandler}
            onBlur={resetSearch}
            onFocus={resumeSearch}
          />
          <SearchResult searchInput={searchInput}>
            {searchOutput.map((output, idx) => (
              <SearchCard key={idx} output={output} />
            ))}
          </SearchResult>
        </SearchWrapper>
        <LoginWrapper>
          {localStorage.getItem('token') ? (
            <ProfileModal
              userInfo={userInfo.profile_url}
              userName={userInfo.name}
            />
          ) : (
            <LoginModal />
          )}
        </LoginWrapper>
      </Wrapper>
      {localStorage.getItem('token') &&
        localStorage.getItem('batch') === 'null' && <InitialModal />}
    </Navigation>
  );
};

export default Nav;

const Navigation = styled.nav`
  position: sticky;
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  min-width: 1200px;
  height: 90px;
  background-color: white;
  border-bottom: ${props =>
    props.scrollY === 0 ? 'none' : `1px solid #00000030`};
  z-index: 10;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  min-width: 975px;
  height: 100%;
`;

const Logo = styled.img.attrs(() => ({
  src: '/images/logo.png',
}))`
  width: 200px;
  margin-right: 70px;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Search = styled.input.attrs(() => ({
  type: 'text',
  placeholder: '통합검색(프로젝트명/기수/스택)',
}))`
  width: 100%;
  height: 50px;
  padding: 0 30px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  outline: none;
`;

const SearchResult = styled.div`
  display: ${({ searchInput }) => (searchInput.search ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  background-color: white;
`;

const LoginWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
`;
