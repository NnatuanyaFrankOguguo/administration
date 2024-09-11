// Backend (which is node.js for the room model)
//  first we have to create the require statement for the mongoose
const mongoose = require("mongoose");

// then we have to create the schemma( structure of the room model database including how data are organise and how relationships between data are manage(being stored in a consistent and logical manner))
const roomSchema = mongoose.Schema({
    name : { /* firt writhe the properties of the room models which are keys and the conditions as values */
        /* the conditions which are types whether string/or number/ or boolean and so on other conditions*/ 
        type: String,
        required: true
    },

    maxcount : {
        type: Number,
        required: true
    },

    phonenumber : {
        type: Number,
        required: true
    },

    rentperday : {
        type : Number,
        required: true
    },

    imageUrls : [], /* no need to write type and required like the rest cause its array[]  */

/* (after selecting the date we will get the availability based on the current bookings)
current bookings property this is the part where the bookings made previously are stored so the bookings made currently will show the
rooms that is available that hasnt been previously booked */
    currentbookings: [], /* also an array cause a rrom can have more than one current bookings (based on the dates intervals) */

    type: {
        type : String,
        required: true
    },

    description: {
        type : String,
        required : true
    }
// all this are the required properties in the room model
}, {
    timestamps : true, /*if you give the timestamps to true it will give the created and updated properties at the mongodb */
})

/*schema created now to create the actual model */
// the first parameters in the mongoose.model(collectionName, Schema )which will be present in the mongodb
//  we have already created the rooms
const roomModel = mongoose.model('rooms', roomSchema) /* "rooms"(collection name) roomschema variable of the schema values TO BE STORED IN MONGODB */

//NOW TO EXPORT THE CODE
// Now that we have created the model lets create the route for the room operations


module.exports = roomModel

// SUCCESSFULLY CREATE OUR ROOM MODEL