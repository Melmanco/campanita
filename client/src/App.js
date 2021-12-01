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
                    <Route path='/' element={<PrivateRoute path='/' loginStatus={loginStatus}/>}>
                        <Route path='/' element=
                            {<Navigate to='/home'/>}
                        />
                    </Route>

                    <Route path='/login' element=
                        {<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} username={username} setUsername={setUsername}/>}
                    />

                    <Route path='/home' element={<PrivateRoute path='/home' loginStatus={loginStatus}/>}>
                        <Route path='/home' element=
                            {<Home/>}
                        />
                    </Route>

                    <Route path='/files' element={<PrivateRoute path='/files' loginStatus={loginStatus}/>}>
                        <Route path='/files' element=
                            {<Files username={username}/>}
                        />
                    </Route>
                </Routes>

            </BrowserRouter>
        </div>
      );
}

export default App;