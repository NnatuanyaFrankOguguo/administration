const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    // those four inputs fields we are taking from the user is what we are going put below
    name : {
        type: String,
        required : true
    },

    email : {
        type: String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    /*apart from this three things we are going to add one more thing which is called as the "is "ADMIN" property"
    so here we do not have any seperate usersand "ADMIN" modules so your user cannot be a "ADMIN" or he can be "ADMIN"
    so thats the same reason we are going to use the same users module for the "ADMIN" so every time when the user is logged in we are going to 
    check one property whether the user is "ADMIN" or not  so if the user is "ADMIN" we are going to provide the access of admin panel per for that user
    so if the user is not "ADMIN" we are going to hide the "ADMIN" panel for that user so thats the reason we are going to give this property "isADMIN : "*/

    isAdmin : {
        type : Boolean, default : false
    }

    /* it is not required and initially it is fault because we have to give the access from the database to any user if you want to get an "ADMIN".... so thats the reason we will write "default false" above 
    i hope we have understand why we have written this "ADMIN" property so to provide the "ADMIN" panel we have to check this condition whether the user is "ADMIN" or not */
}, {
    timestamps : true,
} )

// 
// userSchema.methods.matchPassword = async function (enteredpassword){
//     return await bcrypt.compare(enterPassword, this.password)
// }

// // (b4 saving the user into the database it will encrypt the password )NOW WE ARE GOING TO ENCRYPT THE PASSWORD IN THE DATABASE SO IT WONT BE SHOWING THE ACTUAL PASSWORD BUT JUST RANDOM STRINGS
// userSchema.pre('save', async function (next) { // like before the userSchema saves these middleware function should run first
//     if(!this.isModified){
//         next(); /*thats if this current password is not modified... then move on to the next which is dont render the after it. if otherwise we will generate a new password   */
//     }

//     const salt = await bcrypt.genSalt(10); /*we will generate salt of 10(the higher the figure the more strong salt will be generated) */
//     this.password = await bcrypt.hash(this.password, salt);
// }) 




/*schema created now to create the actual model */
// the first parameters in the mongoose.model(collectionName, Schema )which will be present in the mongodb
//  we have already created the users
const userModel = mongoose.model('users', userSchema) /* "users"(collection name) userSchema variable of the schema values TO BE STORED IN MONGODB */

//NOW TO EXPORT THE CODE

module.exports = userModel

// Now that we have created the model lets create the route for the user operations
