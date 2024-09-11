import React , {useEffect, useState} from "react";
import { UserOutlined, CalendarOutlined} from "@ant-design/icons";
import { Tabs, Modal } from "antd";
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Flex, Tag } from 'antd';

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem('currentuser'))

    useEffect(() => { /*putting a useeffect to trigger once the page loads with a condition that if no user go back
        to login page */

        if(!user){
            window.location.href='/login'
        }

    }) /* but if user is there it will take in the user details from below */


	return (
	<div className="ml-3 mt-3">
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane
            key="1"
            tab={<span> <UserOutlined style={{ marginRight: 7 }} />Profile</span>}>
            {/* Content for Profile Tab */}
            <div className="row bs mr-5 ml-5">
                <div className="col-md-7">
                    <h1>My Profile</h1>

                    <br/>

                    <h1 className="profile-text">Name : {user.name}</h1>
                    <h1 className="profile-text">Email : {user.email}</h1>
                    <h1 className="profile-text">isAdmin : {user.isAdmin ? 'YES' : 'NO'}</h1>
                </div>
            </div>
            </Tabs.TabPane>
        
        {/* SECOND TAB */}

            <Tabs.TabPane
            key="2"
            tab={ <span> <CalendarOutlined style={{ marginRight: 7 }} /> Bookings</span>}>
            {/* Content for Bookings Tab */}
                <MyBookings/>
            </Tabs.TabPane>
        </Tabs>
    </div>
  );
}

export default Profilescreen;


/*we will make a request to get the user booked details from the backend to display */
export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentuser'))
    const [bookings, setbookings] = useState([])
    const [loading, setLoading] = useState(false); /* set to false bcos we already loading on the antd tab */
	const [error, setError] = useState();

    useEffect(() => {

        const fetchdata = async () => {
            try {
                setLoading(true)
                const roomdata = await axios.post('/api/bookings/getbookingsbyuserid', {userid : user._id}) /*we pass the userid as the parameter */
                // console.log(roomdata.data)
                setbookings(roomdata.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
                setError(error)
            }
        }
        fetchdata ();
    }, [])
/*go to the backend bookingRoute to create the API endpoint */

    async function cancelBooking(bookingid, roomid ) { /*these here when writing the functions here parameters(the ones in the arrow function when its invoke are argument)*/
        Modal.confirm({
            title: 'Are you sure you want to cancel this booking?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Cancel',
            okType: 'danger',
            cancelText: 'No, Keep it',
            onOk: async() => {
                try {
                    setLoading(true)
                    const response = await (await axios.post('/api/bookings/cancelbooking', {bookingid, roomid})).data
                    console.log(response)
                    setLoading(false)
                    Swal.fire({
                        title: 'Success!',
                        text: 'Booking Cancelled successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'}).then(response => {window.location.reload()})
                } catch (error) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    // frontend part completed of making the cancelbooking api endpoint operation now we move to the backend
                    setError(true)
                }
               // Call your cancel function here

            },
        })

      
    }

  return (
    <div>
        <div className="row">
            <div className="col-md-8 ">

                {loading && (<h1><Loader/></h1>)}
                {bookings && (bookings.map(booking => {
                    return  <div className="bs">
                                <div className="bookingsdisplay">
                                    <div>
                                        <h1>{booking.room}</h1>
                                        <img src={booking.images[0]} className="smallimg col-md-10" />
                                    </div>
                                    <div className="mt-5">
                                        <p><b>BookingId</b> : {booking._id}</p>
                                        <p><b>CheckIn date</b> : {booking.fromdate}</p>
                                        <p><b>Check Out date</b> : {booking.todate}</p>
                                        <p><b>Amount</b> : NGN {booking.totalamount}</p>
                                        <p><b>TransactionId</b> : {booking.transactionId}</p>
                                        <p><b>Status</b> : {booking.status==='Cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFRIMED</Tag>)}</p> 
                                    </div>
                                </div>

                                {booking.status !== 'Cancelled' && (
                                    <div style={{textAlign: 'right'}}>
                                    <button className="btn btn-primary" onClick={()=>{cancelBooking(booking._id, booking.roomid)}}>CANCEL BOOKING</button>
                                    {/*we are using arrow function in the onClick cause we are passing parameters in the function we are executing if we use the normal way without arrow function i dont think it will go 
                                    booking._id data is used to change the status of the booked room while booking.roomid is used to update the respective booking by removing it.*/}
                                </div>
                                )}

                            </div>
                })) }

            </div>
        </div>
    </div>
  )
}


