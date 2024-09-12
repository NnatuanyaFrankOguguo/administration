import React , {useState, useEffecy, useEffect} from 'react';
import { UserOutlined, CalendarOutlined, HomeOutlined, PlusOutlined} from "@ant-design/icons";
import { Tabs, Modal } from "antd";
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios';
import { Color } from 'antd/es/color-picker';
import Swal from 'sweetalert2';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
function Adminscreen() {

    useEffect(() => { /*if user is not an admin an tries to get into the admin will be navigated to the homepage(i fit change the admin path to something else not necesarilly the admin keyword ) */
      
    const user =  JSON.parse(localStorage.getItem('currentuser')).isAdmin 
    if(!user){
        window.location.href='/home' 
    }
    
    }, [])
    

  return (
    <div className='ml-3 mt-3 mr-3 bs'> 
        <h2 className='text-center' style={{fontSize : '30px'}}><b>Admin Panel</b></h2>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane
            key="1"
            tab={<span> <CalendarOutlined style={{ marginRight: 7 }} />Bookings</span>}>
            {/* Content for Profile Tab */}
                <Bookings/>
            </Tabs.TabPane>

            <Tabs.TabPane
            key="2"
            tab={ <span> <HomeOutlined style={{ marginRight: 7 }} /> Rooms</span>}>
            {/* Content for Bookings Tab */}
                <Rooms/>
            </Tabs.TabPane>

            <Tabs.TabPane
            key="3"
            tab={ <span> <PlusOutlined style={{ marginRight: 7 }} /> Add Rooms</span>}>
            {/* Content for Bookings Tab */}
                <Addroom/>
            </Tabs.TabPane>

            <Tabs.TabPane
            key="4"
            tab={ <span> <UserOutlined style={{ marginRight: 7 }} /> Users</span>}>
            {/* Content for Bookings Tab */}
                <Users/>
            </Tabs.TabPane>
        </Tabs>
       
    </div>
  )
}

export default Adminscreen

// THE ADMINSCREEN COMPONENTS STARTS HERE BELOW

export function Bookings(){

    const [loading, setLoading] = useState(false); 
	const [error, setError] = useState();
    const [bookings, setbookings] = useState([])

    useEffect(() => {
      
        const fetchdata = async () => {
            
            try {
                setLoading(true)
                const response = await axios.get(`${apiBaseUrl}/api/bookings/getallbookings`) /*get request to collect data from the backend */
                setbookings(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
                setError(error)
            }
        }
        
        fetchdata();
      
    }, [])
    


    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Bookings</h1>
                {loading && (<Loader/>)}
                

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booked Date</th>
                            <th>Booking Id</th>
                            <th>UserName</th>
                            <th>Room</th>
                            <th>CheckIn date</th>
                            <th>Check Out Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(bookingitem => {
                            return <tr>
                                <td>{bookingitem.bookingdate}</td>
                                <td>{bookingitem._id}</td>
                                <td>{bookingitem.username}</td>
                                <td>{bookingitem.room}</td>
                                <td>{bookingitem.fromdate}</td>
                                <td>{bookingitem.todate}</td>
                                <td>{bookingitem.status}</td>
                            </tr>
                        }))}
                        
                    </tbody>
                </table>
                
            </div>
           
        </div>
    ) /*now we go to the back to create the api endpoint */
}


// ----------GET ALL ROOMS COMPONENT BELOW


export function Rooms(){

    const [loading, setLoading] = useState(false); 
	const [error, setError] = useState();
    const [rooms, setrooms] = useState([])

    useEffect(() => {
      
        const fetchdata = async () => {
            
            try {
                setLoading(true)
                const response = await axios.get(`${apiBaseUrl}/api/rooms/getallrooms`) /*get request to collect data from the backend(already
                 we have created this API in roomscreen so we are going to use it) */
                setrooms(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
                setError(error)
            }
        }
        
        fetchdata();
      
    }, [])


    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Rooms</h1>
                {loading && (<Loader/>)}
                

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && (rooms.map(roomitem => {
                            return <tr>
                                <td>{roomitem._id}</td>
                                <td>{roomitem.name}</td>
                                <td>{roomitem.type}</td>
                                <td>{roomitem.rentperday}</td>
                                <td>{roomitem.maxcount}</td>
                                <td>{roomitem.phonenumber}</td>
                            </tr>
                        }))}
                        
                    </tbody>
                </table>
                
            </div>
           
        </div>
    ) /*now we go to the back to create the api endpoint */
}


// ----------GET ALL USERS COMPONENT BELOW


export function Users() {


    const [loading, setLoading] = useState(false); 
	const [error, setError] = useState();
    const [users, setusers] = useState([])


    useEffect(() => {
      
        const fetchdata = async () => {
            
            try {
                setLoading(true)
                const response = await axios.get(`${apiBaseUrl}/api/users/getallusers`) /*get request to collect data from the backend(already
                 we have created this API in roomscreen so we are going to use it) */
                setusers(response.data)
                setLoading(false)
               
            } catch (error) {
                setLoading(false)
                console.log(error)
                setError(error)
                
            }
        }
        
        fetchdata();
      
    }, [])
    // console.log(users)


    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Users</h1>
                {loading && (<Loader/>)}
                
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Users Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {users.length && (users.map(useritem => {
                            return <tr>
                                <td>{useritem._id}</td>
                                <td>{useritem.name}</td>
                                <td>{useritem.email}</td>
                                <td>{useritem.isAdmin ? 'YES' : 'NO'}</td> {/*conditional statement is user equal to ADMIN if true show YES if false or not show NO */}
                               
                            </tr>
                        }))}
                        
                    </tbody>
                </table>
                
            </div>
           
        </div>
        
    )


}


// NOW FOR THE ADD ROOM COMPONENT



export function Addroom() {

    
    const [loading, setLoading] = useState(false); 
	const [error, setError] = useState();

    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState('')
    const [maxcount, setmaxcount] = useState('')
    const [type, settype] = useState('')
    const [phonenumber, setphonenumber] = useState('')
    const [description, setdescription] = useState('')
    const [imageurl1, setimageurl1] = useState('')
    const [imageurl2, setimageurl2] = useState('')
    const [imageurl3, setimageurl3] = useState('')

    async function addRoom () {

        /*create an object of the data from the input values */
        const newroom = {
            name,
            rentperday,
            maxcount,
            type,
            phonenumber,
            description,
            imageUrls : [
                imageurl1, imageurl2, imageurl3
            ],

        }

        try {
            setLoading(true)
            const response = (await axios.post(`${apiBaseUrl}/api/rooms/addroom`, newroom)).data /* send the newroom object as the data to the backend */
            console.log(response)
            setLoading(false)
            Swal.fire({
                title: 'Success!',
                text: 'Your Room has been added Successfully.',
                icon: 'success',
                confirmButtonText: 'OK'}).then(response => {window.location.href='/home'})
        } catch (error) {
            setLoading(false)
            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: 'Something Went Wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }


        console.log(newroom)


    }


  return (
    <div>
        <h1 className='md-0'>Add Rooms</h1>
        <div className='row bs mt-0' style={{background : '#000814'}}>
            <div className="col-md-6">
                {loading && (<Loader/>)}
                <input type='text' className='form-control' placeholder='Room Name'
                value={name} onChange={(e) =>{setname(e.target.value)}}/>

                <input type='text' className='form-control' placeholder='rent per day'
                value={rentperday} onChange={(e) => {setrentperday(e.target.value)}}/>

                <input type='text' className='form-control' placeholder='max count'
                value={maxcount} onChange={(e) => {setmaxcount(e.target.value)}}/>

                <input type='text' className='form-control' placeholder='Room Type'
                value={type} onChange={(e) => {settype(e.target.value)}}/>
                
            </div>


            <div className="col-md-6">
                <input type='text' className='form-control' placeholder='Phone Number'
                value={phonenumber} onChange={(e) => {setphonenumber(e.target.value)}}/>

                <input type='text' className='form-control' placeholder='Image Url 1'
                value={imageurl1} onChange={(e) => {setimageurl1(e.target.value)}}/>

                <input type='text' className='form-control' placeholder='Image Url 2'
                value={imageurl2} onChange={(e) => {setimageurl2(e.target.value)}}/>

                <input type='text' className='form-control' placeholder='Image Url 3'
                value={imageurl3} onChange={(e) => {setimageurl3(e.target.value)}}/>

                <textarea className='form-control mt-3' placeholder='Room Description' name='description'
                value={description} onChange={(e) => {setdescription(e.target.value)}} rows="4" />  {/*Adjust the number of rows as needed*/}

                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}


/*i will also add facilties in the room and the room model also do the window the refresh when you click addroom */



