import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/Login';
import Files from './pages/Files';
import Contacto from './pages/Contactos';
import Anuncio from './pages/Anuncios';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header/>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/files' element={<Files/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/anuncios' element= {<Anuncio/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
