import React, { useState, useEffect } from "react";
/*useState , useEffect are the life cycle methods in react functional components */
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "antd/es/style/index"; /*importing the styles for the date range */
import Error from "../components/Error";
import moment from 'moment'

import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
function Roomscreen() {

	// performing the API OPERATIONS(when performing the API OPERATIONS in frontend or backend)
	// always use async, await and try catch block as was explained why MANDATORY

	/* AFTER SUCCESSFULLY PERFORMING THE API OPERATION AND IT DISPLAY THE TOTAL DATA ON THE SERVER IN THE BACKEND
    THEN COME BACK BEFORE THE /useEffect hook/ TO UPDATE THE STATE OF THE ROOMS WE ARE GETTING FROM THE BACKEND
    N START BY CREATING ONE const [rooms, setrooms]* /useState/ IS USUALLY EMPTY AFTER PERFORMING THE API OPERATIONS
    WE HAVE TO UPDATE THE ROOM STATE BY THE DATA WE AE GETTING FROM THE BACKEND*/
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState();
	const [error, setError] = useState();

    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    
    const [duplicaterooms, setduplicaterooms] = useState([]) /*refer to notes on more info #22 */

    const [searchkey, setsearchkey] = useState('') /* creating a usestate for the searchinput #26 */
    const [type, settype] = useState('') /* creating a usestate for the selectinput value #26 */
 
	useEffect(() => {

        const user = JSON.parse(localStorage.getItem('currentuser'))
          
        if(!user){
            window.location.href = '/login'
        }


		// as a law we have to define async function and call it inside the use effect bcos
		// it doesnt directly accept asynchronous function
		const fetchData = async () => {
			try {
				setLoading(
					true
				); /*before the API request as eplained in the note */
				const response = await axios.get(`${apiBaseUrl}/api/rooms/getallrooms`); /*passing the API ENDPOINT and wrappig it in the data object */
				// console.log(response) instead of printing the response in the console we are updating the state
				setRooms(response.data);
                setduplicaterooms(response.data);
				setLoading(
					false
				); /*after the API request as eplained in the note */
			} catch (error) {
				setError(error);
				console.log(`ERROR MESSAGE: ${error}`);
				// always go with this syntax with the try catch block otherwise you will face errors
				setLoading(
					false
				); /*after the API request fails or an error occurs it will end the loading as eplained in the note */
			}
		};

		fetchData(); /*calling the async function*/
	}, []);


    function filterByDate(dates) {
        setfromdate(moment(dates[0].$d).format('DD-MM-YYYY : HH:mm')); 
        settodate(moment(dates[1].$d).format('DD-MM-YYYY : HH:mm')); 
    
        const filteredRooms = duplicaterooms.filter(room => {
            let availability = true;
    
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    const bookingStart = moment(booking.fromdate, 'DD-MM-YYYY');
                    const bookingEnd = moment(booking.todate, 'DD-MM-YYYY');
    
                    const selectedStart = moment(dates[0].$d, 'DD-MM-YYYY');
                    const selectedEnd = moment(dates[1].$d, 'DD-MM-YYYY');
    
                    // Check if there is any overlap
                    const isOverlap = selectedStart.isBetween(bookingStart, bookingEnd, null, '[]') ||
                                      selectedEnd.isBetween(bookingStart, bookingEnd, null, '[]') ||
                                      bookingStart.isBetween(selectedStart, selectedEnd, null, '[]') ||
                                      bookingEnd.isBetween(selectedStart, selectedEnd, null, '[]');
    
                    if (isOverlap) {
                        availability = false;
                        break;  // No need to check further, as the room is already unavailable
                    }
                }
            }
    
            return availability;
        });
        
        console.log(filteredRooms)
        setRooms(filteredRooms);
    }
    

    function filterbysearch() { /*the function being triggered by the filtered by search input */
        const filteredRooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase())) 
        setRooms(filteredRooms)
    }
    

  
    const filterbytype = (e) => {
        settype(e); // Update the selected type
    
        if (e !== 'all') {
          // Filter rooms based on the selected type
          const filteredRooms = duplicaterooms.filter(room => room.type.toLowerCase() === e.toLowerCase());
          setRooms(filteredRooms); // Update the rooms state with filtered rooms
        } else {
          // If "All" is selected, show all rooms
          setRooms(duplicaterooms); // Reset the rooms state to the full list
        }
      };

	return (
		<div className="container">

            <div className="row mt-5 filters">

                {/* adding the search filter */}
                <div className="col-md-4">
                    <input type='text' className='form-control ' placeholder='Search Rooms' 
                    value={searchkey} onChange={(e) => {setsearchkey(e.target.value)}} onKeyUp={filterbysearch}/> {/*when the user types in the search input, the onChange event is triggered, updating the searchkey state with the current input value
                    simultaneously, the input value field is updated to reflect whats in the searchkey useSate. the oneKey up event triggers the filterbysearch function everytime the user releases a key allowing the component to filter the rooms based
                    based on the current search key */}
                </div>

                <div className="col-md-4">{/*three colors for the date range filter #18 */}
                <RangePicker className='range' showTime={{ format:'HH:mm'}} format='DD-MM-YYYY : HH:mm'
                 placeholder={['CheckIn Date & Time', 'Check Out Date' ]} onChange={filterByDate} /> {/*this is the date filter and to select the date that should appear(as dd mm yyy) now to write the function up */}

                </div>
                
            
                <select className=" col-md-4 form-control" value={type} onChange={(e) => {filterbytype(e.target.value)}}>
                    
                    <option value='all'>All Rooms</option>
                    <option value='delux'>Delux</option>
                    <option value='non-delux'>Non-Delux</option>

                </select>
            

            </div>


			{/*to move it to the center of the page */}
			{/* to make the Roomscreen repsonsive we have to use a BOOTSRAP GRIDS*/}
			<div className="row justify-content-center mt-4">
				{/* we will use the bootstrap rows and columns for responsiveness purpose*/}
				{loading ? (
					<Loader />) : /*removed the conditions here n error component here*/ (
					rooms.map((room) => {
						
						{/*this block here is where the iteration is taking place */}
						
						return (
							<div className="col-md-10 mt-2">
								<Room room={room} fromdate={fromdate} todate={todate}/>
							</div>
						); {/* now we will have to return the component */}
					})
				) /*error component before */  }
				
			</div>
		</div>
	);
}

export default Roomscreen;

