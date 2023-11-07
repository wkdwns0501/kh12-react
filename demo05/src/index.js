import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//link 대신 import를 통해 설치한 라이브러리의 CSS를 불러오도록 처리
//- node_modules에 설치한 요소들은 바로 이름을 사용하여 접근 가능
import 'bootstrap/dist/css/bootstrap.min.css';
//이곳에 bootswatch css 파일을 불러오는 구문을 작성
import 'bootswatch/dist/cosmo/bootstrap.min.css';
import "bootstrap";


//Router는 React 앱을 여러 페이지로 분할하여 사용하도록 만드는 기술
// - HashRouter는 주소에 해시(#)가 포함된다 //아무리 페이지를 많이 만들어 놔도 전체로 1페이지로 밖에 안보인다
// - BrowserRouter는 주소에 해시(#)가 포함되지 않는다 //페이지가 각각 다르다
// import {BrowserRouter} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
