import React, {useState, useEffect} from 'react' ;
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { PaystackButton } from 'react-paystack';
import Swal from 'sweetalert2';



function Bookingscreen() {
    const[loading, setLoading] = useState(true);
    const[room, setRoom] = useState();
    const[error, setError] = useState();

    const { roomid, fromdate, todate } = useParams(); {/* calling the variable 'roomid' i made in the roomscreen to access it here */}
   {/* calling the variable todate i made in the roomscreen to access it here */}


    // retreiving the values from this current booking screen URL and assinging them to the moment function not convert
    const fromDate = moment(fromdate, 'DD-MM-YYYY')
    const toDate = moment(todate, 'DD-MM-YYYY')
    const roomId = {roomid}

    const totaldays = moment.duration(toDate.diff(fromDate)).asDays()+1 

    const [totalamount , settotalamount ] = useState()

// --------------------------------My LOGIC using PAYSTACK-----------------------------------------------------------

    const config = {
        reference: (new Date()).getTime().toString(),
        email: JSON.parse(localStorage.getItem('currentuser')).email,
        amount: totalamount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_5a45ca17d23a2f735a73322eb70880867abf002b',
      };
        // customizations : {
        //     title : 'Presken Hotels',
        //     description : 'Booking Room'

        // },
    const onSuccess = async (reference) => {
        // Handle callback from Flutterwave (bookRoom(response.tx_ref); // Call your booking function with transaction reference)
        console.log('Payment successful!', reference);
        // Proceed with booking after payment /* we will make the function as async bcos here we are performing the axios operation to send the booking details to the backend */
        const bookingDetails = { /* we will send the object in a form of booking model that whatever details we kept in the booking model are what we have to send to the backend  */
            room, /*this includes room name and all other properites in the room object */
            username : JSON.parse(localStorage.getItem('currentuser')).name,
            userid : JSON.parse(localStorage.getItem('currentuser'))._id, /*to get the user user:JSON.parse(localStorage.getItem('currentUser')) but we didnt put user instead userid*/
            bookingdate: moment(new Date()).format("DD-MM-YYYY"), /*adding the current date */
            type : room.type,
            images : room.imageUrls,
            fromdate,
            todate,
            totalamount,
            totaldays,
            reference/*sending the details of the transaction to the backend to save */
        }

        try {
            // adding the loading icon whenever the request is processing #25
            setLoading(true);

            const response = await axios.post('/api/bookings/bookroom', bookingDetails) /*going to create the Url in the booking route and add it server.js to receive the response(after much time we are done,
            now to process the request in the frontend sending the bookingDetails as our object (#22)- along  with the booking details we will send our reference) */
            setLoading(false);
            Swal.fire({
                title: 'Success!',
                text: 'Your booking has been made successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
        }).then(response => {window.location.href='/profile'})
        } catch (error) {
            setLoading(false)
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue with your booking. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            
            
        }
   
            
    };

    const onClose = () => {
        console.log('payment close')
    }

    
    useEffect ( () => {

        const fetchdata =  async () => {

            try {
                setLoading(true);

                const response = await axios.post('/api/rooms/getroombyid', {roomid})
                setRoom(response.data.room);
                settotalamount(totaldays * response.data.room.rentperday)

                setLoading(false);

            } catch(error) {

                setError(error)

                console.log(`Error: ${error}`)

                setLoading(false)

            };

        };
        

        fetchdata();

    }, []);


  return (
    <div className='m-4 mb-4'>
    {/*writing the condition */}
    {loading ? (<h1><Loader/></h1>) : room ?  (<div>

            <div className='row justify-content-center mt-3 bs'> {/*making the row the space where the room details will stay  */}
                
                <div className="col-md-6">{/*making the column that will occupy how wide the details will be in the row.. but here 5col is how wide or the amount of space for the img  */}
                    <h1>{room.name}</h1>
                    <img src={room.imageUrls[0]} alt='' className='bigimg'/>
                </div>

                <div className="col-md-5">{/*making the column that will occupy how wide the details will be in the row.. but here 5col is how wide or the amount of space for the description purposes  */}
                    <div style={{textAlign:'right'}}>
                        <h1>Booking Details</h1>
                        <hr/>
                        {/* the dynamic values we have to get from the logged in user  will be implented here */}
                    
                        <b>
                        <p>Name : {JSON.parse(localStorage.getItem('currentuser')).name} </p>
                        <p>Check In Date /time : {fromdate} </p> {/* having everything right from the roomscreen first, then to the app.js, then to the room.js now finally in the bookingscreen to access the actual values from the fromdate & todate */}
                        <p>Check Out Date : {todate} </p>
                        <p>Max Count : {room.maxcount}</p>
                        </b>
                    </div>

                    <div style={{textAlign:'right'}}>
                        <b>
                        <h1>Amount</h1>
                        <hr/>
                        <p>Total Days : {totaldays}</p>
                        <p>Rent per day : NGN{room.rentperday}</p>
                        <p>Total Amount : NGN{totalamount} </p>
                        </b>
                    </div>

                    <div style={{textAlign:'right'}}>
                         {/*implenting the flutterwave if e too cost change to paystack here in the frontend to carry out our transcation #22 */}
                        <PaystackButton {...config} 
                                onSuccess={onSuccess}
                                onClose={onClose}
                                text="Pay Now"  
                                className='btn btn-primary'
                        />

                    </div>

                </div>


            </div>


        </div>)  :  (<Error />)}

    </div> 
  );
}
export default Bookingscreen;
