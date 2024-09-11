// importing the express and the router
const axios = require('axios')
const express = require("express");
const router = express.Router(); /*router package */
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const Room = require('../models/room') /*fetching from the backend used to interact with the collection from the mongodb */
const Booking = require('../models/booking'); /*importing the booking model here */
const { model } = require("mongoose");
const customer = require('paystack/resources/customer');
const paystack = require('paystack')
const PAYSTACK_SECRET_KEY = 'sk_test_1723293bb66a89b718ecc24954c0de2fb84ac762'
/*Posting send data to the front end */

router.post('/bookroom', async(req,res) => {

    /*receiving the data from the frontend */
    const {room,  /*this includes room name and all other properites in the room object */
        userid ,
        bookingdate, 
        type,
        fromdate, 
        username,
        todate,
        totalamount,
        totaldays,
        reference       
        } = req.body /*destructing all these objects */
        
    

        try {


            const verificationResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference.reference}`, {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                },
            });

            const { data } = verificationResponse.data;

            if (data.status !== 'success') {
                return res.status(400).json({ error: 'Payment verification failed.' });
            }

            const newbooking = new Booking({ /*writing the things we are going to store in the database */
                room : room.name,
                roomid : room._id, /*roomid is equal to room._id */
                userid,
                username,
                bookingdate,
                type : room.type,
                fromdate,
                images : room.imageUrls,
                todate,
                totalamount,
                totaldays,
                transactionId : data.id /*since we are not using stripe yet static data will do for now.... so these are the nessecary things(status is not mandatory since default is booked) */
            })
    
            const booking = await newbooking.save() /*saving the booking to the database */
    
            /*fetching the room we want to update the current booking (first, we have to import the room model to be able to access it) */
            const roomdetails = await Room.findOne({_id : room._id}) /*This line searches the Room collection in the database for a document with the ID equal to room._id. The result, roomdetails, contains all the details of the room. */
            /*we are getting all the property of that particular room with the help of room._id(because we are getting the room object property here room._id) */
    
            // now the code to update the array in the room model (based on the data that was sent on the booking details(newbooking)) because in this roomdetails we are having the entire room object property (which is key is equal to values)
            roomdetails.currentbookings.push({
                bookingid : booking._id, 
                fromdate : fromdate,
                images : room.imageUrls,
                todate : todate,
                username : username, 
                userid : userid, 
                status : booking.status,
                bookeddate : bookingdate,
                transactionId : data.id }) /*now we are going to push the updated booking details which contains the following in the curly braces */
            
            // now we are updating by saving the current bookings of the particular room with the details by pushing the current booking _id details, booking id, fromdate, todate
    
            await roomdetails.save()
    
            res.send(' room is booked successfull, ') 
    
        }catch (error) {
            console.error("Error during Paystack booking process:", error.message)
            return res.status(400).json({ error: 'Payment verification failed', details: error.message });
        }

})


/*creating the endpoint for the getbookingbyuserid #27*/

router.post('/getbookingsbyuserid', async (req, res) => {

    const userid = req.body.userid /* is an object that contains the data sent from the frontend.. in a way extracting the data n saving it in the varaible */

    try {
        const bookings = await Booking.find({userid : userid}) /* finding the booking made in the database with the key userid and the values too as the actual userid saved above sent from the frontend  */
        res.send(bookings) /* sending the bookings data as a response to the frontend as an array with FIND but with FINDOne sends an object */
    } catch (error) {
       return res.status(400).json({error});
        
    }


});


router.post('/cancelbooking', async (req, res) => {

    /* first to destructure the two variables request coming in from the frontend */
    const {bookingid, roomid} = req.body
    console.log(req.body)
    try { /*first in the try block we will use the bookingid variable to find the repective booking made in the database(booking model) */
        const bookingitem = await Booking.findOne({_id : bookingid}) /* to find the booking_id in the bookings collection using the bookingid values sent from the frontend */

        // changing the status when it actually finds it(the bookings object with the actual booking_id submitted)
        bookingitem.status = 'Cancelled'

        if (!bookingitem) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // now to save
        await bookingitem.save()

        // now after changing the status to cancelled we have to update the room availability by romving the bookingcancelled(based on the bookingid) from the currentbookings in the room object(roomid)
        /*but before we start we need to get the actual room the booking was made from the database */
        const room = await Room.findOne({_id : roomid}) /*just like the up bookingid too */
        // then we directly update the currentbookings array of this room gotten by first storing the currentbookings array inside bookings variable
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        const curbookings = room.currentbookings
        // now we are going to filter this bookings array and remove the bookings which is canceled
        const filteredbookings = curbookings.filter(booking => booking.bookingid.toString()!==bookingid) /*the filter meaning is booking.bookingid(is the format to access the bookingid in the curbookings arr ) booking is the variable for iteration
        tostring means we are converting it to string and to check is not equal to the bookingid(bookingid we are getting from the fronted).. so which is create a new array that does not contain the bookingid we are getting from the frontend*/
        // then we have to update the filteredbookings with the room.currentbookings to show the current bookings as the new currentbookings
        room.currentbookings = filteredbookings /*so the cancel booking will be moved from the currentbookings array */

        // now to save
        await room.save()

        res.send('Booking Cancelled Successfully')  
    } catch (error) {
        console.error('Error in cancellation process:', error); // Log the full error
        return res.status(500).json({ error: 'Internal Server Error' });    
    }
})


/*send the data of all bookings to the front end  */
router.get('/getallbookings', async(req,res) => {

    try {
        const bookings = await Booking.find({})
        return res.send(bookings);
    } catch (error) {
        return res.status(400).json({error})
    }

})

module.exports = router
     

    // try {
    //     const newbooking = new Booking({ /*writing the things we are going to store in the database */
    //         room : room.name,
    //         roomid : room._id, /*roomid is equal to room._id */
    //         userid,
    //         bookingdate,
    //         type : room.type,
    //         fromdate,
    //         todate,
    //         totalamount,
    //         totaldays,
    //         transactionId : '1234' /*since we are not using stripe yet static data will do for now.... so these are the nessecary things(status is not mandatory since default is booked) */
    //     })

    //     const booking = await newbooking.save() /*saving the booking to the database */

    //     /*fetching the room we want to update the current booking (first, we have to import the room model to be able to access it) */
    //     const roomdetails = await Room.findOne({_id : room._id}) /*This line searches the Room collection in the database for a document with the ID equal to room._id. The result, roomdetails, contains all the details of the room. */
    //     /*we are getting all the property of that particular room with the help of room._id(because we are getting the room object property here room._id) */

    //     // now the code to update the array in the room model (based on the data that was sent on the booking details(newbooking)) because in this roomdetails we are having the entire room object property (which is key is equal to values)
    //     roomdetails.currentbookings.push({
    //         bookingid : booking._id, 
    //         fromdate : fromdate, 
    //         todate : todate, 
    //         userid : userid, 
    //         status : booking.status }) /*now we are going to push the updated booking details which contains the following in the curly braces */
        
    //     // now we are updating by saving the current bookings of the particular room with the details by pushing the current booking _id details, booking id, fromdate, todate

    //     await roomdetails.save()

    //     res.send('Room Booked Successfully ')

    // } catch (error) {
    //     return res.status(400).json({error});
    // }


// })

// module.exports = router

// now we are going to import the booking routes in the serve.js... this is how the format of the bookingdetials as was set in the
// booking model will be saved in the backend when sent from the frontend as dey have common API Endpoint('/bookroom') for interaction
// then this bookingroute will be accessed by server.js
   
/*
// importing the express and the router
const stripe = require('stripe')('sk_test_51Pqyl6L7ZCi0ieOzJuDvqGyz3vn5suW3AYDSBpgAziIlEPrV455DTHKVUUG7EELnbWxFwskUDdwpPr5VUlV0FwBL006BLzJ5uM')
const express = require("express");
const router = express.Router(); /*router package */
// const moment = require('moment');
// const { v4: uuidv4 } = require('uuid');
// const Room = require('../models/room') /*fetching from the backend used to interact with the collection from the mongodb */
// const Booking = require('../models/booking'); /*importing the booking model here */
// const { model } = require("mongoose");
// const customer = require('paystack/resources/customer');
// // const paystack = require('paystack')


// router.post('/bookroom', async(req,res) => {

//     /*receiving the data from the frontend */
//     const {room,  /*this includes room name and all other properites in the room object */
//         userid ,
//         bookingdate, 
//         type,
//         fromdate, 
//         todate,
//         totalamount,
//         totaldays,
//         token       
//         } = req.body /*destructing all these objects */
        
    

//         try {


//             // const verificationResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference.reference}`, {
//             //     headers: {
//             //         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//             //     },
//             // PAYSTACK LOGIC FOR INTEGRATING IN BACKEND THAT IS NOT WORKING});

//             // if (verificationResponse.status !== 'success') {
//             //     return res.status(400).json({ error: 'Payment verification failed.' });
//             // }

//             const customer = await stripe.customers.create({
//                 email : token.email,
//                 source : token.id
//             })

//             const payment = await stripe.charges.create({
//                 amount : totalamount * 100,
//                 customer : customer.id,
//                 currency : "USD",
//                 receipt_email : token.email

//             }, {
//                 idempotencyKey : uuidv4()
//             })

//             if(payment) {
//                 const newbooking = new Booking({ /*writing the things we are going to store in the database */
//                     room : room.name,
//                     roomid : room._id, /*roomid is equal to room._id */
//                     userid,
//                     bookingdate,
//                     type : room.type,
//                     fromdate,
//                     todate,
//                     totalamount,
//                     totaldays,
//                     transactionId : payment.id /*since we are not using stripe yet static data will do for now.... so these are the nessecary things(status is not mandatory since default is booked) */
//                 })
        
//                 const booking = await newbooking.save() /*saving the booking to the database */
        
//                 /*fetching the room we want to update the current booking (first, we have to import the room model to be able to access it) */
//                 const roomdetails = await Room.findOne({_id : room._id}) /*This line searches the Room collection in the database for a document with the ID equal to room._id. The result, roomdetails, contains all the details of the room. */
//                 /*we are getting all the property of that particular room with the help of room._id(because we are getting the room object property here room._id) */
        
//                 // now the code to update the array in the room model (based on the data that was sent on the booking details(newbooking)) because in this roomdetails we are having the entire room object property (which is key is equal to values)
//                 roomdetails.currentbookings.push({
//                     bookingid : booking._id, 
//                     fromdate : fromdate, 
//                     todate : todate, 
//                     userid : userid, 
//                     status : booking.status }) /*now we are going to push the updated booking details which contains the following in the curly braces */
                
//                 // now we are updating by saving the current bookings of the particular room with the details by pushing the current booking _id details, booking id, fromdate, todate
        
//                 await roomdetails.save()
        
//                 res.send(' room is booked successfull, ') 
        
//             }
//         }  catch (error) {
//             return res.status(400).json({ error: 'Payment verification failed', details: error.message });
//         }
    

// })

// module.exports = router
     

