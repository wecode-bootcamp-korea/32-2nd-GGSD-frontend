export const KAKAO = {
  REDIR: 'http://localhost:3000/kakaologin',
  API_KEY: process.env.REACT_APP_KAKAO_API_KEY,
};

const BASE_URL = 'http://13.125.197.74:8000';

export const API = {
  COMMONS: `${BASE_URL}/commons`,
  JOINPOST: `${BASE_URL}/applies`,
  PROJECTS: `${BASE_URL}/projects`,
  USERS: `${BASE_URL}/users`,
};
