import React,  {useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
// add the routes to the login screen and sign up screen to app.js for linking the pages
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Forgotpassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    // creating the states for all the inputs fields
    /* initially at first it will be empty on the useState */
    const [email, setemail] = useState('')
    const [formerror, setformerror] = useState('')


    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid Email Format').required('Email is required'),
    })

     // writting the function register calling the variables from the useState bcos it has been saved into the setname values from the user and placed in the variable
     async function forgot (e) {
        e.preventDefault()

        try {
            await loginSchema.validate({email}, {abortEarly : false}); /*the first parameter value must always be an object not a string */
        } catch (validationErrors) {
            setformerror(validationErrors.message);
            return;

        }



        //  we put the API operation here
        try {
            /* before the API request is processed set loading should be true more info in my note #17*/
            setLoading(true);
            const response = (await axios.post('/api/users/forgotpassword', {email})).data /*we are sending the user object as our data */       
            setLoading(false)
            setSuccess(true)


                
            setTimeout(()=> {window.location.href="/forgotpassword";}, 5000)
            
           

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
            setError(true)
            setTimeout(()=> {setError(false)}, 4000)

        }
        console.log(email)
            
     }



  return (
    <div>
        {loading && (<Loader /> )} {/* the conditions is if loading is equal to true show loading component*/}

        <div className="row justify-content-center mt-5">{/* class creates a horizontal group of columns in this row place we will only utilize 5 columns atleast it will fill up enough space and as the container we will place it in the middle */}
            <div className="col-md-5"> {/* This div defines a column that takes up 5 out of 12 available grid columns on medium and larger screens, ensuring that the form isn't too wide */}
            {success && (<Success message="Link sent to your Email"/> )} 
            {error && (<Error message='Invalid Credentails' /> )} {/* the conditions is if error is equal to true show error component*/}  
                <div className='bs form-link'> 
                    <h3 style={{textAlign:'center', fontWeight: '600'}}>Forgot Password</h3>
                    {/*This event handler updates the name state with the input's value when the field loses focus The e in the code represents the event object that is automatically passed to event handler functions in JavaScript. When an event, such as onBlur, onClick, or onChange, is triggered on an HTML element ask chatgpt for more */} 
                    <form onSubmit={forgot}>
                        <div>
                            <input type="text" className='form-control' placeholder='email' 
                            value={email} onChange={(e) => {setemail(e.target.value) }}/>
                            {formerror && <div className='errorcode'>{formerror}</div>}
                        </div>
                        {/*we will add the hooks for the input fields to take the values */}

                        <button type='submit'  className='btn btn-primary mt-3' >Send</button>
                        {/*we will print the values on the console to check we are getting the values by using an inbuilt function onClick to trigger the function.. lets go n make the register function to print the results in the console */}
                    </form>
                </div>
            </div>
        </div>
  </div>
  )
}

export default Forgotpassword
