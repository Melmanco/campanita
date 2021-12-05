import React from 'react';
import {Route, Navigate} from 'react-router-dom';

function PrivateRoute(children, ...props) {
    const {loginStatus} = props
    if(loginStatus){
        return children
    } else{
        return <Navigate to='/login' />
    }   
}

export default PrivateRoute;