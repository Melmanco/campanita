import React from 'react';
import '../index.css';
import Slider from '../pages/Sliders/Slider'
import ScaleText from "react-scale-text";

function Home(){
 
    return(
        <div className="container-flush" >
            <div className="Body">
                <Slider/>
                <div className= "tamanoImagen" > <img src={process.env.PUBLIC_URL + `/imgSlide/Documentos2.jpg`}/> </div>
                
            </div>
        </div>
    );
}

export default Home;
