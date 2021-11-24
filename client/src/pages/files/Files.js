import Navbar from './Navbar';
import Axios from 'axios';
import logo from '../../img/integra.png';
import messageButton from '../../img/message.png';
import settingsButton from '../../img/settings.png';
import './Files.css';

function asd(){
    return false;
}

function Files(){
    return(
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
            <Navbar/>
            <div className ="Body">
                <form action="/files" method="post" enctype="multipart/form-data">
                    <input type="file" name="new_file" id=""/>
                    <input type="submit" value="Enviar"/>
                </form>
            </div>
        </div>
    );
}

export default Files;