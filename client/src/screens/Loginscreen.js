import React,  {useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
// add the routes to the login screen and sign up screen to app.js for linking the pages
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";


function Loginscreen() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    // creating the states for all the inputs fields
    /* initially at first it will be empty on the useState */
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [formerror, setformerror] = useState({})

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid Email Format').required('Email is required'),
        password: Yup.string().required('Password is Required').min(7, 'for security Password should be atleast 7 characters')
        .matches(/[0-9]/, 'Password must contain atleast one number')
        .matches(/[A-Z]/, 'Password must contain atleast one uppercase letter')
        .matches(/[a-z]/, 'Password must contain atleast one lowercase letter')
        .matches(/[!@#$%^&*()_-{}|?<>:]/, 'Password must contain atleast one symbol'),
    })
    

    // writting the function register calling the variables from the useState bcos it has been saved into the setname values from the user and placed in the variable
    async function login (e) {
        e.preventDefault()

        const user = {  
                email,
                password,
            }

            try {
                await loginSchema.validate(user, {abortEarly : false});
            } catch (validationErrors) {
                const newErrors = {};
                validationErrors.inner.forEach(err => {
                    newErrors[err.path] = err.message
                });

                setformerror(newErrors);
                return;

            }



            //  we put the API operation here
            try {
                /* before the API request is processed set loading should be true more info in my note #17*/
                setLoading(true);
                const response = (await axios.post('/api/users/login', user)).data /*we are sending the user object as our data */       
                setLoading(false)
                setSuccess(true)
                /* after the API request is processed we will now navigate the user to the homepage 
                BEFORE NAVIGATING INTO THE HOMESCREEN, WE HAVE TO STORE THE USER IN THE LOCAL STORAGE.*/
                localStorage.setItem('currentuser', JSON.stringify(response)); 
                // navigating into the homescreen after storing the user details as strings in localstorage
                window.location.href="/rooms" /*JUST BECOS OF THE TUTORIAL PURPOSE WE PUT ROOMS (NORMALLY IT SUPPOSE TO BE HOME SO LATER CHANGE IT) */

                /* later we will update the Navbar SO PUT THE LOADING AND ERROR COMPONENTS
                // becos we have set the loader to be at the middle we should always keep it at the root div in the return block 
                // so it should not be tampered by another style rule #17 */
            

            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(true)
                setTimeout(()=> {setError(false)}, 4000)
                
            }
            console.log(user)
            
        
    }


  return (
    <div>
        {loading && (<Loader /> )} {/* the conditions is if loading is equal to true show loading component*/}

        <div className="row justify-content-center mt-5">{/* class creates a horizontal group of columns in this row place we will only utilize 5 columns atleast it will fill up enough space and as the container we will place it in the middle */}
            <div className="col-md-5"> {/* This div defines a column that takes up 5 out of 12 available grid columns on medium and larger screens, ensuring that the form isn't too wide */}
            {success && (<Success message="Login Successfully"/> )}
            {error && (<Error message='Invalid Credentails' /> )} {/* the conditions is if error is equal to true show error component*/}   
                <div className='bs form-link'> 
                    <h2 style={{textAlign:'center'}}>Login</h2>
                    {/*This event handler updates the name state with the input's value when the field loses focus The e in the code represents the event object that is automatically passed to event handler functions in JavaScript. When an event, such as onBlur, onClick, or onChange, is triggered on an HTML element ask chatgpt for more */} 
                    <form onSubmit={login}>
                        <div>
                            <input type="text" className='form-control' placeholder='email' 
                            value={email} onChange={(e) => {setemail(e.target.value) }}/>
                            {formerror.email && <div className='errorcode'>{formerror.email}</div>}
                        </div>
                        <div>
                            <input type="password" className='form-control' placeholder='password'
                            value={password} onChange={(e) => {setpassword(e.target.value) }}/>
                            {formerror.password && <div className='errorcode'>{formerror.password}</div>}
                        </div>

                        <div className='mr-3' style={{display: 'flex', justifyContent: 'space-between'}}>
                            <a href='/signup'><p>Need an Account? Sign Up</p></a>
                            <a href='/forgotpassword'><p>Forgot Password?</p></a>
                        </div>
                        {/*we will add the hooks for the input fields to take the values */}

                        <button type='submit'  className='btn btn-primary ' >Login</button>
                        {/*we will print the values on the console to check we are getting the values by using an inbuilt function onClick to trigger the function.. lets go n make the register function to print the results in the console */}
                    </form>
                </div>
            </div>
        </div>
  </div>
  )
}

export default Loginscreen
