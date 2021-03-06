import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <div className='container-fluid'>
              
              <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
              </button>
              
              <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                  
                  <li className='nav-item'>
                    <Link to='/home' className='nav-link active'>Inicio</Link>
                  </li>
                  
                  <li className='nav-item'>
                    <Link to='/files' className='nav-link active'>Documentos</Link>
                  </li>
                  
                  <li className='nav-item'>
                    <Link to='/Contacto' className='nav-link active'>Contacto</Link>
                  </li>
                  
                  <li className='nav-item'>
                    <Link to='/Certificado' className='nav-link active'>Certificado</Link>
                  </li>
                
                  <li className='nav-item'>
                    <Link to='/Anuncios' className='nav-link active'>Anuncios</Link>
                  </li>

                  <li className='nav-item'>
                    <Link to='/Clases' className='nav-link active'>Clases</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    );
}

export default Navbar;
