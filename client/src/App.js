import React, { useState } from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Files from './pages/Files';

import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';



function App() {

    const [loginStatus, setLoginStatus] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <div className='container-flush'>
            <BrowserRouter>
                {loginStatus === true?
                <div>
                    <Header username={username}/>
                    <Navbar/>
                </div>
                :
                ''
                }

                <Routes>

                    <Route path='/login' element=
                        {<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} username={username} setUsername={setUsername}/>}
                    />

                    <Route path='/home' element={
                        <PrivateRoute loginStatus={loginStatus}>
                            <Home/>
                        </PrivateRoute>
                    }/>

                    <Route path='/files' element={
                        <PrivateRoute loginStatus={loginStatus}>
                            <Files/>
                        </PrivateRoute>
                    }/>
                </Routes>

            </BrowserRouter>
        </div>
      );
}

export default App;