import React, { useState } from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Files from './pages/Files';
import Contacto from './pages/Contacto';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Certificado from './pages/Certificado';
import Anuncios from './pages/Anuncios';

function App() {

    const [loginStatus, setLoginStatus] = useState(true);
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
                        <Route path='/' element=
                            {<Navigate to='/login'/>}
                        />

                    <Route path='/login' element=
                        {<Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} username={username} setUsername={setUsername}/>}
                    />

                        <Route path='/home' element=
                            {<Home/>}
                        />

                        <Route path='/files' element=
                            {<Files username={username}/>}
                        />

                        <Route path='/Contacto' element=
                            {<Contacto username={username}/>}
                        />
                        
                        <Route path='/Certificado' element=
                            {<Certificado username={username}/>}
                        />

                        <Route path='/Anuncios' element=
                            {<Anuncios username={username}/>}
                        />
                </Routes>

            </BrowserRouter>
        </div>
      );
}

export default App;
