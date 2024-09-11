// created a database configuration for mongodb being used as client
// run 'npm i mongoose' in the terminal of main folder (with the help of mongoose we can simplify the mongodb operations)
// after that run 'nodemon server' restart the server 
// now create the mongodb connection with the help of this package

// initialise the mongoose
const mongoose = require('mongoose')

// loading the environment of variables of .env using the dotenv package
require('dotenv').config({path: './backend/.env'});


// to knw how to connect the node.js and the mongodb database using mongoose you have the mongo documentation to refer to
//  or its in the code below here
// add the database name in the link ending with the name

var mongoURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&tls=true`
// while deploying pls make sure YOU DO NOT KEEP IMPORTANT TINZ IN THE DIRECT FILES
// KEEP THEM IN THE process.env

// this mongoose.connect acceepts three parameters (links, two safetyparameters)
mongoose.connect(mongoURL,  /*ACCORDING TO THE LATEST VERSION NOT ON THE VIDEO THIS TWO 
PARAMETERS ARE NO LONGER NECESSARRY{useNewUrlParser: true, useUnifiedTopology : true }*/)


// mandatory things when connecting the node.js and mongodb using the mongoos
// the updated form of try catch error 
//   .then(() => {
//     console.log('MongoDB connection successful');
//   })
//   .catch(err => {
//     console.error('MongoDB connection failed:', err);
//   });
// TO CHECK IF THE CONNECTION OF THE SERVER AND DATABASE ARE CONNECTED SUCCESFULLY
var connection = mongoose.connection

connection.on('error', () => {
    console.log('MongoDB connection failed')
})

connection.on('connected', () => {
    console.log('MongoDB connected successful')
})


module.exports = mongoose

// WE HAVE COMPLETED THE ENTIRE SETUP OF THE FRONT-END AND THE BACK-END