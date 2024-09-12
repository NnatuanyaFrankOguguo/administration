import React, {useState, useEffect} from 'react';
import axios from 'axios'
import * as Yup from 'yup';
// add the routes to the login screen and sign up screen to app.js for linking the pages
// now we will implement bootstrap grid system in the register screen
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
console.log('API Base URL:', apiBaseUrl);
function Signupscreen() {
    const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [formerror, setformerror] = useState({})
    // creating the states for all the inputs fields
    const [name, setname] = useState('') /* initially at first it will be empty on the useState */
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')

    // creating a YUP validation schema 
    const signupSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Username should be atleast 3 characters').required('Username is Required').max(16, 'Username should be below 15 characters'),
        email: Yup.string().email('Invalid Email Format').required('Email is required'),
        password: Yup.string().required('Password is Required').min(7, 'for security Password should be atleast 7 characters')
        .matches(/[!@#$%^&*()_-{}|?<>]/, 'Password must contain atleast one symbol')
        .matches(/[0-9]/, 'Password must contain atleast one number')
        .matches(/[A-Z]/, 'Password must contain atleast one uppercase letter')
        .matches(/[a-z]/, 'Password must contain atleast one lowercase letter'),
        cpassword : Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('confirm password is Required')

    })

    // writting the function register calling the variables from the useState bcos it has been saved into the setname values from the user and placed in the variable
    async function register (e) {
        e.preventDefault();

        // making it a condition that if password and cpassword are the same the code should run(bcos i have not yet added the validation)
        
        const user = {
            name,
            email,
            password,
            cpassword
        }

        // VALIDATING USING YUP
        try {
            await signupSchema.validate(user, {abortEarly: false}); // (user object values as one of the parameter  )abortEarly: false ensures all errors are returned
            console.log('form submitted', user)
        } catch (validationErrors) {
            console.log(validationErrors)  // Extract the validation errors
            const newErrors = {};
            
            validationErrors.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });

            setformerror(newErrors); // Set validation errors
            return; // Stop form submission if validation fails

            
        }

        // API call after validation passes
        //performing the API operation, make the function async first before we start( this is like the last step after all the user model and route has been made that we put the asyn behind the function)
        try {
            setLoading(true);
            const response = (await axios.post(`${apiBaseUrl}/api/users/signup`, user)).data /*we are sending the user object as our data */
            setLoading(false)
            setSuccess(true)
            localStorage.setItem('currentuser', JSON.stringify(
                response
                 /*if your backend sends a jwt token, save it here*/));

            // emptying the sets... in the useState input fields after successfully signing up
            setname('')
            setemail('')
            setpassword('')
            setcpassword('')
            window.location.href="/home"

            
           
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true)
            setError(true)
            setTimeout(()=> {setError(false)}, 4000)
        }

        // console.log(user)
       
    }


  return (
    <div>

        {loading && (<Loader/> )} {/* the conditions is if loading is equal to true show loading component*/}
        

      <div className="row justify-content-center mt-4">{/* class creates a horizontal group of columns in this row place we will only utilize 5 columns atleast it will fill up enough space and as the container we will place it in the middle */}
            <div className="col-md-5"> {/* This div defines a column that takes up 5 out of 12 available grid columns on medium and larger screens, ensuring that the form isn't too wide */}
            {success && (<Success message="Signed up Successfully"/> )} {/*the conditions is if success is equal to true show success component sending in the props to appear in the success components as message*/}
            {error && (<Error message={'Email already in use'}/> )} {/* the conditions is if error is equal to true show error component*/}

                <div className='bs form-link'> 
                    <h2 style={{textAlign:'center'}}>Sign up</h2>

                    <form onSubmit={register}>
                        <div>
                            <input type="text" className='form-control' placeholder='Username' 
                            value={name} onChange={(e) => {setname(e.target.value) } } /> {/*This event handler updates the name state with the input's value when the field loses focus The e in the code represents the event object that is automatically passed to event handler functions in JavaScript. When an event, such as onBlur, onClick, or onChange, is triggered on an HTML element ask chatgpt for more */}
                            {formerror.name && <div className='errorcode'>{formerror.name}</div>}
                        </div>
                        
                        <div>
                            <input type="text" className='form-control' placeholder='email' 
                            value={email} onChange={(e) => {setemail(e.target.value) }} />
                            {formerror.email && <div className='errorcode'>{formerror.email}</div>}
                        </div>
                        
                        <div>
                            <input type="password" className='form-control' placeholder='password'
                            value={password} onChange={(e) => {setpassword(e.target.value) }} />
                            {formerror.password && <div className='errorcode'>{formerror.password}</div>}
                        </div>

                        <div>
                            <input type="password" className='form-control' placeholder='confirm password'
                            value={cpassword} onChange={(e) => {setcpassword(e.target.value) }} />
                            {formerror.cpassword && <div className='errorcode'>{formerror.cpassword}</div>}
                        </div>

                        <a href='/login'><p>Already Registered? Login</p></a>
                        
                        {/*we will add the hooks for the input fields to take the values */}

                        <button type='submit' className='btn btn-primary mt-0'>Sign up</button>
                        {/*we will print the values on the console to check we are getting the values by using an inbuilt function onClick to trigger the function.. lets go n make the register function to print the results in the console */}
                    </form>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Signupscreen
