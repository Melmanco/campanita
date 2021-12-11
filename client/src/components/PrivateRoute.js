import React from 'react';
import {Route, Navigate} from 'react-router-dom';

function PrivateRoute(children, ...properties) {
    const {path, loginStatus} = properties
    if(loginStatus){
        return <Route path={path}>{children}</Route>
    } else{
        return <Navigate to='/login' />
    }   
}

export default PrivateRoute;