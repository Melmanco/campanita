import React from 'react'
import logo from '../img/integra.png';
import messageButton from '../img/message.png';
import settingsButton from '../img/settings.png';

function Header(props) {
    return (
        <div className = "Files">
            <div className ="Header-nav Padding">
                <img className= "img" src = {logo}/>

            </div>
        </div>
    )
}

export default Header;