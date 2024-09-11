import "./App.css";
import Navbars from "./components/Navbars";

// import the react router dom packages and the browser router and the route packages
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*BrowserRouter is used to wrap the entire application to enable routing.
Route is used to define the different routes and the components that should be rendered for each route.
Link is used to create navigation links to different routes. */

// importing the Roomscreen
import Roomscreen from "./screens/Roomscreen";
import Bookingscreen from "./screens/Bookingscreen";
import Signupscreen from "./screens/Signupscreen";
import Loginscreen from "./screens/Loginscreen";
import Homescreen from "./screens/Homescreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";
import Aboutscreen from "./screens/Aboutscreen";
import Contactscreen from "./screens/Contactscreen";
import Forgotpassword from "./screens/Forgotpassword";
import Resetpassword from "./screens/Resetpassword";

// now in the localhost 3000/home we have to render this Roomscreen

function App() {
	return (


		<div className="App">
			
            
			{/* creating the routes for the Roomscreen in the browser router */}
			<BrowserRouter>
                <Navbars />
				<Routes>
                    <Route path="/home" element={<Homescreen />}/>
					<Route path="/rooms" element={<Roomscreen />} />
                    <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} /> {/* see note.... am putting parameters here indicatting that the actual values will be passed in the room.js where the URL is to the bookingscreen that the values will be use.... 
                    then go to the room components to add the from date and todate as props to put the actual values of the varaibles in the url*/}
                    <Route path="/signup" element={<Signupscreen />} />
                    <Route path="/login" element={<Loginscreen />} />
                    <Route path="/about" element={<Aboutscreen />} />
                    <Route path="/contact" element={<Contactscreen />} />
                    <Route path="/profile" element={<Profilescreen />}/>
                    <Route path="/admin" element={<Adminscreen />}/>
                    <Route path="/" element={<Landingscreen />}/> {/*the landingpase in the react is the normal / */}
                    <Route path="/forgotpassword" element={<Forgotpassword />}/>
                    <Route path="/resetpassword/:userid/:token" element={<Resetpassword />}/> {/*this userid & token is like parameter when used in the resetpassword screen to get the values in the url */}
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;
