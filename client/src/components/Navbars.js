import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbars() {
    const location = useLocation()
    const [Lcolor, setLcolor] = useState(false)
    const [Hcolor, setHcolor] = useState(false)
    const [dynamic, setdynamic] = useState(false)

    useEffect(() => {
        
        // window.addEventListener('scroll', ()=> {
        //     window.scrollY > 50 ? setHcolor(false) 
        // })

        if(location.pathname === '/') {
            setLcolor(true)
        }else{
            setHcolor(true)
            setLcolor(false)
        
        };
    

    }, [location.pathname])
    



 const dropdownStyle = {
    backgroundColor: 'bisque',
    maxWidth: "200px",

 }
  
// UPDATING THE NABVAR FOR WHEN USER IS LOGGED IN( WE NEED RETURN THE RESPONSE JSON THAT WAS STRINGIFY IN THE LOCAL STORAGE in the loginscreen BACK TO JSON USIN PARSE)
  const user = JSON.parse(localStorage.getItem('currentuser'));
// so in the link while showing the registration we have to check if the user is logged in or not
// so if the user is not logged in then only we have to show the registration but if the user is logged in
// we have to show the username 

const iconStyle = {
    color: 'darkblue',    // Change icon color to blue
    fontSize: '0.9rem', // Reduce icon size (adjust as needed)
  };

  const buttonStyle = {
    padding: '0px 10px', // Increase padding to make the button more rectangular
    height: 'auto',       // Ensure the height is automatic to avoid squaring
    display: 'flex',
    alignItems: 'center',
  };

  function logout() {
    // first we have to remove user from localstorage
    localStorage.removeItem('currentuser')
    // refreshing the page and directing to the login section
    window.location.href="/login"
  }

  return (
	<nav class={`navbar sticky-top navbar-expand-lg navbar-custom navbar-light bg-light ${Lcolor ? 'black' : ''} ${Hcolor ? 'navbar-custom' : ''} `}>
        <a class="navbar-brand ml-5" style={{fontSize : '23px'}} href="/home">Peaceveil</a>
        <button class="navbar-toggler" styl type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mr-5">
                <li class="nav-item active mr-4">
                    <Link class="nav-link" to="/home">Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item mr-4">
                    <a class="nav-link" href="#about">About Us</a>
                </li>
                <li class="nav-item mr-4">
                    <a class="nav-link" href="#con">Contact </a>
                </li>
                <li class="nav-item mr-5">
                    <Link class="nav-link" to="/rooms">Rooms</Link>
                </li>

                {/* ------------------ */}


                {user ? (<><div class="dropdown ">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={buttonStyle}>
                <h1 className="Uname mt-2"><FontAwesomeIcon style={iconStyle} icon={faUser} /> {user.name}</h1> {/* displayin as our username */}
                </button>
                <div class="dropdown-menu" style={dropdownStyle} aria-labelledby="dropdownMenuButton">
                    <Link class="dropdown-item" to="/profile">Profile</Link>
                    <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                    
                </div>
                </div></>) /*if logged in user is there then else if no user show the menus */
                : (<>
                <li class="nav-item dropdown mr-2">
                <a class="btn nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Login/signup
                </a>
                <div class="dropdown-menu" style={dropdownStyle} aria-labelledby="navbarDropdownMenuLink">
                    <Link class="dropdown-item" to ="/signup">Sign Up</Link>
                    <Link class="dropdown-item" to ="/login">Login</Link>
                
                </div>
                </li> </>)}
        
            </ul>
        </div>
    </nav>
  );
}

export default Navbars;
