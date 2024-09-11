import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import {Link} from "react-router-dom";

function Room({ room, fromdate, todate } /*PROPS */) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<div className="row bs">
			<div className="col-md-4">
				{/*space for the pictures */}
				<img src={room.imageUrls[0]} className="smallimg" />
				{/*for every room we are having 3 imgs so on d homepage we r going to display the 1st img [0] in d array */}
			</div>
			<div className="col-md-7 ">
				{/* space for the texts (one column for margins)*/}
				<h1>{room.name}</h1>
				<b>
					{" "}
					<p>{room.facility}</p>
					<p> Max Count : {room.maxcount}</p>
					<p> Phone Number : {room.phonenumber}</p>
					<p> Type : {room.type}</p>
				</b>

				<div style={{ float: "right" }}>

                    {/* putting the conditional rendering is react operator that if fromdate and todate are having values then show booknow button #21 */}
                    {(fromdate &&  todate) && (
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}> {/*adding the room_id to our url parameter to the bookinscreen link so that the room_id in the URL will be use to get other details of the particular roomid.... also adding fromdate and todate in the URL as well (#18) to bookingscreen */}
                        <button className="btn btn-primary m-2">Book now</button>
                    </Link>)}
                    {/* adding the booknow button with link or anchor tag reference to the bookingscreen page */}
                    
                    
					<button className="btn btn-primary" onClick={handleShow}>
						View Details
					</button>
				</div>
			</div>

			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Header>
					<Modal.Title>{room.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Carousel prevLabel='' nextLabel=''>
						{/*write the imageUrl in the array for it to iterate in the carousel */}
						{room.imageUrls.map((url) => {
							return (
								<Carousel.Item>
									<img
										className="d-block w-100 bigimg"
										src={url}/>
								</Carousel.Item>
							);
						})}
					</Carousel>
                    <p className="mt-2">{room.description}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Room;
