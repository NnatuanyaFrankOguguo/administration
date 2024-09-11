import React,  {useState} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
// add the routes to the login screen and sign up screen to app.js for linking the pages
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";


function Resetpassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    // creating the states for all the inputs fields
    /* initially at first it will be empty on the useState */
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [formerror, setformerror] = useState({})
    const {userid, token} = useParams() /*how the userid and token are gotten from the URL */

    // making the a variable
    // const Userid = {userid}
    // const Token = {token}

    const resetSchema = Yup.object().shape({
        password: Yup.string().required('Password is Required').min(7, 'for security Password should be atleast 7 characters')
        .matches(/[0-9]/, 'Password must contain atleast one number')
        .matches(/[A-Z]/, 'Password must contain atleast one uppercase letter')
        .matches(/[a-z]/, 'Password must contain atleast one lowercase letter')
        .matches(/[!@#$%^&*()_-{}|?<>:]/, 'Password must contain atleast one symbol'),
        cpassword : Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('confirm password is Required')
    })
    

    // writting the function register calling the variables from the useState bcos it has been saved into the setname values from the user and placed in the variable
    async function reset (e) {
        e.preventDefault()

        const user = {  
                password,
                cpassword,
                token,
                userid
            }

        try {
            await resetSchema.validate(user, {abortEarly : false});
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
            const response = (await axios.post('/api/users/resetpassword', user)).data /*we are sending the user object as our data and ALSO ADDING THE TOKEN AND USEID IN THE API TO THE BACKEND(but we can still put the userid and token in the user object too) */       
            setLoading(false)
            setSuccess(true)
            /* after the API request is processed we will now navigate the user to the homepage 
            BEFORE NAVIGATING INTO THE HOMESCREEN, WE HAVE TO STORE THE USER IN THE LOCAL STORAGE.*/
            // localStorage.setItem('currentuser', JSON.stringify(response)); 
            // navigating into the homescreen after storing the user details as strings in localstorage
            setTimeout(()=> {window.location.href="/login";}, 2000) /*JUST BECOS OF THE TUTORIAL PURPOSE WE PUT ROOMS (NORMALLY IT SUPPOSE TO BE HOME SO LATER CHANGE IT) */

            /* later we will update the Navbar SO PUT THE LOADING AND ERROR COMPONENTS
            // becos we have set the loader to be at the middle we should always keep it at the root div in the return block 
            // so it should not be tampered by another style rule #17 */
        

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)
        }
        console.log(user)
            
        
    }


  return (
    <div>
        {loading && (<Loader /> )} {/* the conditions is if loading is equal to true show loading component*/}

        <div className="row justify-content-center mt-5">{/* class creates a horizontal group of columns in this row place we will only utilize 5 columns atleast it will fill up enough space and as the container we will place it in the middle */}
            <div className="col-md-5"> {/* This div defines a column that takes up 5 out of 12 available grid columns on medium and larger screens, ensuring that the form isn't too wide */}
            {error && (<Error message='Something went wrong' /> )} {/* the conditions is if error is equal to true show error component*/}
            {success && (<Success message="Password Updated Successfully, go to Login"/> )}  
                <div className='bs form-link'> 
                    <h2 style={{textAlign:'center'}}>Reset Password</h2>
                    {/*This event handler updates the name state with the input's value when the field loses focus The e in the code represents the event object that is automatically passed to event handler functions in JavaScript. When an event, such as onBlur, onClick, or onChange, is triggered on an HTML element ask chatgpt for more */} 
                    <form onSubmit={reset}>

                        <div>
                            <input type="password" className='form-control' placeholder='New Password'
                            value={password} onChange={(e) => {setpassword(e.target.value) }}/>
                            {formerror.password && <div className='errorcode'>{formerror.password}</div>}
                        </div>
                        <div>
                            <input type="password" className='form-control' placeholder='Confirm New Password'
                            value={cpassword} onChange={(e) => {setcpassword(e.target.value) }} />
                            {formerror.cpassword && <div className='errorcode'>{formerror.cpassword}</div>}
                        </div>

                        {/*we will add the hooks for the input fields to take the values */}

                        <button type='submit'  className='btn btn-primary mt-3' >Update</button>
                        {/*we will print the values on the console to check we are getting the values by using an inbuilt function onClick to trigger the function.. lets go n make the register function to print the results in the console */}
                    </form>
                </div>
            </div>
        </div>
  </div>
  )
}

export default Resetpassword
