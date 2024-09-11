// Backend (which is node.js for the room model)
//  first we have to create the require statement for the mongoose
const mongoose = require("mongoose");

// then we have to create the schemma( structure of the room model database including how data are organise and how relationships between data are manage(being stored in a consistent and logical manner))
const bookingSchema = mongoose.Schema({
    /* the room we are booking */
    room : {
        type : String,
        required : true
    },
    /* the roomid generated from the mongodb of the room we are booking we need to add it (the id is in the format of object so we can use the mongodb object or use the direct string) */
    roomid : {
        type : String,
        required : true
    },
    /* we have to store the userid generated from the mongodb in the room booking */
    userid : {
        type : String,
        required : true
    },

    username : {
        type : String,
        required : true
    },

    type : {
        type: String,
        required : true
    },
    /* we also need to add the fromdate and todate in the room we are booking(because we are using the alternate format from the moment thats the reason we specified fromdate type = string) */
    fromdate : {
        type: String,
        required : true
    },

    todate : {
        type : String,
        required : true
    },

    bookingdate : {
        type : String,
        required : true
    },

    images : [],

    totalamount : {
        type : Number,
        required : true
    },

    totaldays : {
        type : Number,
        required : true
    },
    /* when we implenting paystack we are going to store the transaction id  */
    transactionId : {
        type : String,
        required : true
    },
    /* another one to add is status so the user can book and the user can also cancel the room thats why we have to include status object  */
    status : {
        type : String,
        required : true,
        default : 'Booked' /*this object here is, by default whenever the room is booked the status will be booked */
    }
        /* these are all the members in the object of the booking model if we want to add another on we can do that but these are the necessary things */

},{
    timestamps : true,
})

const bookingModel = mongoose.model('bookings', bookingSchema) /* "bookings"(collection name) bookingSchema variable of the schema values TO BE STORED IN MONGODB */

module.exports = bookingModel

// Now that we have created the model lets create the bookings route for the bookings operations

