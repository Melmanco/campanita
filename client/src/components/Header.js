import React from 'react'
import logo from '../img/integra.png';
import messageButton from '../img/message.png';
import settingsButton from '../img/settings.png';

function Header() {
    return (
        <div className = "Files">
            <div className ="Header-nav Padding">
                <img className= "img" src = {logo}/>
                <div class="btn-group">
                    <button id="message_button">
                        <img class="message_icon" src={messageButton}/>
                    </button>
                    <button id="settings_button">
                        <img class="settings_icon" src={settingsButton}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;