import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Files from './pages/files/Files';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/files/Navbar';
import { Header } from './componentes/Header';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header/>
    <Navbar/>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/files' element={<Files/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
