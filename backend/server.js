// this is the ENTRYPOINT of our BACKEND application

const express = require("express");

const app = express();

const cors = require('cors');

const path = require('path');


// loading the environment of variables of .env using the dotenv package
app.use(cors({ 
    origin: 'https://administration-frontend.onrender.com',  // Allow requests only from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure POST is included here the kind requests being made
    credentials: true  // Enable this if you are sending cookies or other credentials
}));



// first import) importing the mongodb.js 
const dbconfig = require('./db');

// second import) importing the roomRouter
const roomRoute = require('./routes/roomsRoute');

// third import) importing the userRouter
const userRoute = require('./routes/usersRoute');

// fourth import) importing the userRouter
const bookingsRoute = require('./routes/bookingsRoute')

app.get('/', (req, res) => {
    res.send('Welcome to the API Server!');
  });


app.use(express.json()) /*if you do not write this statement you will not be able to receive the parameter its mandatory to accept it JSON DATA */

// creating the access for this roomroute so whenever the api url is coming with keyword
// app.use so it will go and check the endpoint in rooms route
app.use('/api/rooms', roomRoute)

app.use('/api/users', userRoute) /*the API ENDPOINT NAME ('/api/users')... SO IF THE API REQUEST IS COMING WITH THIS URL/URI IT WILL GO AND CHECK IN THIS USERROUTE (THAT IS IT FOR BACKEND
1) WE CREATE THE USER MODELS, 2) THEN THE USERROUTE 3) AND ADD THE API ENDPOINT HERE 4) NOW TO GO AND PERFORM THE API OPERATION IN THE FRONTEND BEFORE WE DO THAT ADD THE API ENDPOINT IN THE FRONTEND IN SIGNINSCREEN  ) */

app.use('/api/bookings', bookingsRoute) /*NOW LISTEN I JUST DISCOVER SOMETHING HERE #20 THIS API ENDPOINT /api/bookings or users or rooms WILL ADDED IN THE FRONTEND WHEN MAKING THE REQUEST
 THAT WHEN ITS BEING DIRECTED T0 THIS SERVER.JS THE SERVER.JS WILL TAKE IT TO IT'S SECOND PARAMETER WHICH IS THE bookingsRoute THAT IT HAS IMPORTED FROM THE ROUTES FOLDER AND THEN IN THE 
 bookingsroute IT WILL NOW USE THE ENDPOINT THERE /bookroom SO FOR A SUCCESSFULL API OPERATION IN FRONTEND AND BACKEND TO HAPPEN IT NEEDS TWO THINGS IN THE API REQUEST
 1) THE API NAME IN THE SERVER.JS AND AFTER THAT, ENDPOINT IN THE ROUTES FILE  */

// we have successfully created our first API endpoint which FETCHES all the rooms in our database
// so to check we can use the postman or we can directly use the google chrome browser only 
// in the google postman we can only use get request because we cannot perform the post request in the URl 
// so to use the postman.. to check the API endpoint if its working fine before implementing in the react side 


// by default port (METHOD TO START THE NODE.JS SERVER OR EXPRESS JS SERVER)
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Server started on port using nodemon ${port}`)});