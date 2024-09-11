/*ROUTER.POST In summary, router.post is essential for handling POST requests on the server side, 
allowing you to define how the server should process and respond to data sent by clients.
Request Handling: The function typically processes the data sent in the request body (often JSON), 
performs some operations (like interacting with a database), and sends a response back to the client. */

/*ROUTER.GET Request Handling: The function typically retrieves and sends back data to the client, such as rendering
 a web page or returning JSON data. GET requests are used for retrieving data or resources from the server.
  It’s commonly used for serving web pages, returning data in JSON format, and handling requests with query parameters.*/




// importing the express and the router
const express = require("express");
const router = express.Router(); /*router package */

// importing the mongodb room model into this room route bcus we are going to face the data of the rooms
const Room = require('../models/room'/*you put the location of the room model */)

// to create our First API endpoints which is use to fetch all the details of the rooms
router.get('/getallrooms'/*<= that is the ENDPOINT NAME (writing this endpoint as 
    async, await function) using the ASYNC keyword cause the try catch block will save our time */, async(req, res) => {
     /* "const rooms = await Room.find({}pass an empty object,that means zero condition(so this line of code will bring all the rooms
    in the mongodb but in the process errors might occur so to aviod that we will put this line of code in a try catch error)" )*/

    try {
    const rooms = await Room.find({})
    return  res.json(rooms);  /* response success while if there is any error down  */
    } catch (error) {
        return res.status(400).json({message: error});       
    }

});

router.post('/getroombyid'/*changing the type of method to post bcos we are receiving the roomid from the frontend
    also change the API ENDPOINT to getroombyid so here we are receiving the parameters from the body
    that is the reason  */, async(req, res) => {
     /* "const rooms = await Room.find({}pass an empty object,that means zero condition(so this line of code will bring all the rooms
    in the mongodb but in the process errors might occur so to aviod that we will put this line of code in a try catch error)" )*/
         
    const roomid = req.body.roomid

    try {
    const room = await Room.findOne({_id : roomid})   /* make the variable room not rooms like the one above bcos its only one that is the condition written find one by id writing the parameter and searching the id with the help of roomid */
    return  res.json({room});  /* response success while if there is any error down  */
    } catch (error) {
        return res.status(400).json({message: error});       
    }

});


router.post('/addroom', async(req, res) => {
   try {
        const newroom = new Room(req.body)
        await newroom.save()
        res.send('Room has been added successfully')
    } catch (error) {
        res.status(400).json({error})
    
   }
})


// now to export this server becaus we have to use this in the 
// server.js cause it is the entry point of our node(BACKEND) application
module.exports = router;

// now we go to the server.js to import the rooms route