import React from 'react';
import '../index.css';

function Files(){
    return(
        <div className="Body">
            <form action="/files" method="post" enctype="multipart/form-data">
                <input type="file" name="new_file" id=""/>
                <input type="submit" value="Enviar"/>
            </form>
        </div>
    );
}

export default Files;
