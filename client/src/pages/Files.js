import Axios from 'axios';
import logo from '../img/integra.png';
import messageButton from '../img/message.png';
import settingsButton from '../img/settings.png';
import '../App.css';

function Files(){
    return(
        <div className = "Body">
            <form action="/files" method="post" enctype="multipart/form-data">
                <input type="file" name="new_file" id=""/>
                <input type="submit" value="Enviar"/>
            </form>
        </div>
    );
}

export default Files;