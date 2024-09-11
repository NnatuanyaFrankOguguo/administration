import React from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
        <div className='col-md-11 my-auto text-center container'>
            <h2 className='land-text'>peaceveil</h2>
            <div className='container-text'>
                <h1 className='intro-text'>"There is only one boss. The Guest"</h1>

                <Link to='/home'>
                    <button className='landing-btn btn-primary mt-2' >Get Started</button>
                </Link>
            </div>
        </div>
      
    </div>
  )
}

export default Landingscreen
   