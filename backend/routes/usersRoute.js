// importing the express and the router
const express = require("express");
const router = express.Router(); /*router package */
require('dotenv').config();
const bcrypt = require('bcryptjs');

const User = require("../models/user") /*importing the user model here */
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')


/*writing the generate token function */
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '2m'}); /*the id is the payload(user data(which is the user._id to generate the token)) */
};

router.post('/signup', async(req, res) => {

    // first we are going to recieve the values
    // const newuser = new User({name : req.body.name, email : req.body.email, password : req.body.password}) /*const newuser is equal to new user and the schema is equal to request . body(gettin the details) */
    const { name, email, password } = req.body;

    // Check if the user with the same email already exists in the database
    const userExists = await User.findOne({ email : email }) 
        if(userExists){
            // If a user with this email is found, return a 400 Bad Request error
            res.status(400);
            throw new Error('User email already Exists');
            return res.status(400).json({ message: 'Useremail already exists' });
            
        }

    try { 

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
 
        // Create new user with hashed password
        const newuser = new User({
            name, 
            email, 
            password: hashedPassword
        });
 
        // Save user to database
        
        // get the details of the new user we are storing
        const user = await newuser.save()
        // if we have any errors we are going to send the response as(.....ERROR 404) but if its success we are going to send
        if (user){
            const userData = {
                _id : user._id,
                name : user.name,
                email: user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id) /*passing the unique id of the user as augment to the function generatetoken invoke */
            }
        res.status(201).json( /*SENDING THE SAVED USER RESULT BACK TO THE FRONTEND THAT MADE THE API REQUEST IN THE SIGNUPSCREEN */
            userData )
        } else {
            console.error("sign up", error.message)
            return res.status(400).json({ error: 'Payment verification failed', details: error.message });
        }
       
        
    } catch (error) {
        // response.error
        return res.status(400).json({error});

        // after the signing in is done(creating a new user) i want it to generate a new JWT token and send it to our user
    }

});

// now we are going to write for the login the above is for the sign in

router.post("/login", async (req, res) => {

    // first we will destructure the variables that are coming from the frontend== the userdata
    // here we are not destructuring because we are the same variable as in the model as well as in the FRONTEND
    // when you are using the same variables you not to destructure LOOK MORE INTO IT... you can directly send the values 
    // if you want to destructure we can too... just in the FRONTEND SIDE the above code "const newuser = new user(req.body) [for experienced candidate]" just type
    // CONST NEWUSER = NEW USER({NAME : REQ.BODY.NAME, EMAIL: REQ.BODY.EMAIL, PASSWORD: REQ.BODY.PASSWORD}) ITS ALSO CORRECT BUT SINCE ITS FOR BEGGINERS WE WILL KEEP IT THIS WAY
    const {email , password} = req.body;
    // this code here we are destructuring because we are going to write the conditons

   try {
        const user = await User.findOne({email : email}) /*the conditons email == email and password == password.. so we are checking both the email and password so if the condition are matched so the 
        the try block will execute.... (also write a condition to check if the user is present or not)*/
        if(user && await bcrypt.compare(password, user.password)) /*if user is present then we have to send the success msg COMPARING THE BCRPT PASSWORD AND THE LOGIN PASSWORD IF THERE ARE THE SAME TO LOG THE USER IN*/{
            res.json( {
                name : user.name,
                email : user.email, /*this is where we exclude the password details look at my note #16 for more info.. */
                isAdmin : user.isAdmin,
                _id : user._id,
                token : generateToken(user._id)
            })/* res.send user to the frontend if the login is a success ELSE */
        } else /* else we need to write res.error because if there is no user the login is false that means falied*/{
            return res.status(400).json('Login failed go to sign up to create an account')
        }
   } catch (error) {
        return res.status(400).json('incorrect email or password')
   }



});

/*getting all users for the admin side */

router.get('/getallusers', async(req,res) => {

    try {
        const users = await User.find({})
        return res.send(users)
    } catch (error) {
       return res.status(400).json({error})
        
    }

})

// FORGOTTEN PASSWORD ROUTES

router.post('/forgotpassword', async(req,res) => {

    const {email} = req.body;
    try{ 
         // Find the user by email
        const user = await User.findOne({email : email})
        // If user is not found, return a message
        if(!user){
            return res.status(404).json({ status: 'User does not exist' })
        }
        // If user exists, return a success message (or trigger an action like sending a reset link)
        // You can integrate a real password reset functionality here
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '2m'});
        // sending email the token as link to the user mail to access it for reset of password
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nnatuanyafrank@gmail.com',
              pass: 'zjwp phft jlfr nrpi'
            }
        });
          
        var mailOptions = {
            from: 'nnatuanyafrank@gmail.com',
            to: `${user.email}`,
            subject: 'Reset Your Password',
            text: ` Hello, \n please the link below to reset your password: \n
            https://administration-frontend.onrender.com/resetpassword/${user._id}/${token} \n
            link expires in a minute `
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.send({Status: 'Email sent Successfully'})
            }
        }); 

        res.status(200).json({ status: 'Password reset email sent' });

    } catch (error) {

    }
})


// THE SERVER SIDE FOR RESETPASSWORD TO UPDATE THE NEW PASSWORD

router.post('/resetpassword', async(req, res) => {
    //const {userid, token} = req.params //getting the values added to the Api sent from the frontend
    const {password, token, userid} = req.body

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { //the third one is a function that contains error(if there is one), then decoded(its our userdata(the userid in this case))
        if(err){
            return res.json({Status : "Error with token"})
        } }) 
        /*if there is no error(token is valid) we will first of all hash our password bcos we stored our hash password inside the database // Hash the password before saving*/
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const updatedUser = await User.findByIdAndUpdate({_id : userid}, {password : hashedPassword}, { new: true }) // This option returns the updated document /*querying the data to find the userby id and update the password */

        // If the user was updated successfully, send a success response
        if (updatedUser) {
            return res.status(200).json({ status: 'Password updated successfully' });
        } else {
            return res.status(404).json({ status: 'User not found' });
        }
    } catch (error) {
        console.error( error.message)
        return res.status(400).json({error})
    }

    
    //now to verify the token if its correct or not from the frontend if its correct or not

})



// we have completed the SERVER SIDE FOR THE USER
module.exports = router ;

// we will import this router module in the server.js
