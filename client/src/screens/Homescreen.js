import React, { useRef, useState } from 'react';
import styles from '../components/Homestyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import image2 from '../pics/image2.jpeg';
import image3 from '../pics/image3.jpeg';
import image4 from '../pics/image4.jpeg';
import house from '../pics/house.png';
import restuarant from '../pics/restuarant.png';
import terrace from '../pics/terrace.png';
import about from '../pics/about.jpeg';
import play_icon from '../pics/play_icon.png';
import gallery_2 from '../pics/gallery_2.jpeg'
import gallery_4 from '../pics/gallery_4.jpeg'
import gallery_7 from '../pics/gallery_7.jpeg'
import gallery_5 from '../pics/gallery_5.jpeg'
import right from '../pics/right.png';
import back from '../pics/back.png';
import profile from '../pics/profile.png';
import woman from '../pics/woman.png';
import mail from '../pics/mail.png'
import email from '../pics/email.png'
import location from '../pics/location.png'
import phone from '../pics/phone.png'
import videoPlayer from '../pics/videoPlayer.mp4'



function Homescreen() {
    /*adding functionality for when user sends in data from the site contact us it will com to our mail */


    /*add functionality that when we click the play icon the video will play */
    const [playstate, setplaystate] = useState(false); /*it means the playstate will be false means video will be hidden */
    // creating a function that when th user clicks the play icon button setplaystate will be true and then the video will show
    // we have to change it dynamically in the videoplayer div by adding if statement turnary operator

    /*its playing(now to add functionality that when we click on the empty space it will stop playing the video) we will do that by selecting this that container div videoplayer using Useref */
    const player = useRef(null);
    // having putting the useref on the div element we will have to add the onclick feature on the div and when we click
    // on the div it will execute a function called closedplayer(now to write the function)
    const closePlayer = (e) => {
        if(e.target === player.current){/*it means the element where we have click which is save as that div referenced thru useRef it will close the player */
            /*else if we click on the video it will not close the player(to close the player we have to click away from the video)
            BUT TO CLOSE THE VIDEO WE HAVE TO EXECUTE THE AS ....... THEN THE ORIGINAL .hide WILL APPEAR */
                setplaystate(false)
            }
    
        } 
    




    // ------------------------------------------------------------------------------
    /* the logic to make this move is that each testimonials in the unordered contains 25% percent width for that makes up 100% for all
    (100% width in the hidden part 100% width in the shown part making it 200% in total) so when we move the ul tag by 25% it will display
    the third width increment it by another 25% again which is 50% it will display the fourth and so on and so forth( the way we move in the css)
    is transform translate X horinzontal we go to css
    so we have to shift the ul tag the parent by 25% each time the button is click */
    // selecting the ul tag so we can be able to shift it when either of the button is clicked with useRef
    // now we can ass the ul tag using the variable slider

    const ul = useRef();
    let tx = 0; /*initial value to display first list and second list tx(translate X) */

    const slideNext = () => {
        if(tx > -50){ /*so the logic is here if tx is greater than -50 which the only way tx can be greater than -50 is when the value of tx is counting donwards because with
            negative numbers increment is counted downwards, so when its -50% the code will not run because it has reach the last list -50 */
            tx -= 25; /*then if the above condition is true its get added with -25 to continue boosting its increment...now we will have to apply the current tx value in the ul element */
        }
        ul.current.style.transform = `translateX(${tx}%)`
    }

    const slideBack = () => {
        if(tx < 0) { /*for backwards now we do if know the current is at -50 the last list and tx(-50) is trully less than 0  */
            tx += 25; /* the tx will be added by 25 subsequently when back button is click to move the image backwards bcos + increment is backward -increment is forward thats why up logic is like that*/
        }
        ul.current.style.transform = `translateX(${tx}%)`
        
    }

    const iconStyle = {
        fontSize : '1rem',
        marginLeft : '2px'
    }
    //https://images.oyoroomscdn.com/uploads/hotel_image/35293/large/eb66059b28d59ec7.jpg
    // https://images.oyoroomscdn.com/uploads/hotel_image/114494/large/ysbggpyhwavd.jpg 
    // https://images.oyoroomscdn.com/uploads/hotel_image/37155/large/gpgpkqojdbuv.jpg
    // <a href="https://www.flaticon.com/free-icons/terrace" title="terrace icons">Terrace icons created by Freepik - Flaticon</a>
  return (
    <>
        {/*the main section */}
        <div className={styles.hero}>
            <div className={`${styles.heroText} ${styles.container}`}>
                <h2>Your Stay, our priority</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus minus esse, distinctio quibusdam fuga perferendis 
                voluptate neque enim eaque!</p>
                <button className='btn btn-primary'>Explore More <FontAwesomeIcon style={iconStyle} icon={faArrowRight} /></button>

            </div>
        

        </div>
        
        <div className={styles.container}>
            {/* hotel section */}
            <div className={styles.title}>
                <p>Gateway to Luxury</p>
                <h3>What We Offer</h3>

            </div>
            <div className={styles.hotels}>
                
                <div className={styles.hotel}>
                    <a href='/about'>
                        <img src={image2} alt=''/>
                        <div className={styles.caption}>
                            <img src={restuarant} alt=''/>
                            <p>PeaceVeil Restuarant</p>
                        </div>
                    </a>
                </div>

                <div className={styles.hotel}>
                    <a href='/about'>
                        <img src={image3} alt=''/>
                        <div className={styles.caption}>
                            <img src={house} alt=''/>
                            <p>PeaceVeil Poolside</p>
                        </div>
                    </a>
                </div>

                <div className={styles.hotel}>
                    <a href='/about'>
                        <img src={image4} alt=''/>
                        <div className={styles.caption}>
                            <img src={terrace} alt=''/>
                            <p>PeaceVeil Terrace</p>
                        </div>
                    </a>
                </div>

            </div>

             {/*ABOUT SECTION this about section will have two column left column will add the image and playicon in the right column we will add description about the hotel */}
            <div className={styles.about}>   
                <div className={styles.aboutLeft}>
                    <img src={about} alt='' className={styles.aboutImg}/>
                    <img src={play_icon} alt='' className={styles.playIcon} onClick={()=>{setplaystate(true)}}/>
                </div>
                <div className={styles.aboutRight}>
                    <h3>ABOUT PEACEVEIL</h3>
                    <h1>Our Commitment to You</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde ex rerum temporibus? Dolores, modi itaque officiis
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, nostrum! Lorem ipsum dolor sit amet consectetur, 
                    . nemo distinctio suscipit quos quidem voluptatibus voluptas?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis dicta adipisci porro asperiores ut doloribus dolor magni
                    tempore vitae. Repellat blanditiis id quas ducimus aspernatur exercitationem rem suscipit distinctio voluptatum.</p>
                   <button className='btn btn-primary'>Learn more...</button>
                </div>
            </div>

            <div className={styles.title}>
                <p>Gallery</p>
                <h3>Our Hotels</h3>
            </div>

            {/*GALLERY SECTION TO DISPLAY HOTEL PHOTOS */}
            <div className={styles.branches}>
                <div className={styles.gallery}>
                   
                    <img src={gallery_4} alt=''/>
                    <img src={gallery_2} alt=''/>
                    <img src={gallery_7} alt=''/>
                    <img src={gallery_5} alt=''/>
                </div>
                <button className='btn btn-primary'>See more here <FontAwesomeIcon style={{color:'white'}} icon={faArrowRight} /></button>

            </div>

            <div className={styles.title}>
                <p>Testimonials</p>
                <h3>Reviews from our Satisfied Guests</h3>
            </div>

            {/* TESTIMONIAL SECTION */}
            <div className={styles.testimonials}>
                <img src={right} alt='' className={styles.nextBtn} onClick={slideNext}/>
                <img src={back} alt='' className={styles.backBtn} onClick={slideBack}/>

                <div className={styles.slider}>{/*done with styling the nextbtn now with the cards */}
                    <ul ref={ul}>
                        <li>
                            <div className={styles.slide}> {/*we will display user information(like username, email gotten from the 
                             localstorage you will create it later like profile(but er are using static variable)) */}
                                <div className={styles.userInfo}>
                                    <img src={profile} alt=''/>
                                    <div> {/*for name and resignation(resides) */}
                                        <h6>William Jackson</h6>
                                        <span>Lagos, Nigeria</span>
                                    </div>
                                    
                                </div>
                                <p>Lorem  quas doloremque, officiis quos eius dolorum ipsam laborum pariatur 
                                quibusdam labore dolorem, delectus iure perferendis maxime itaque minus soluta.</p>

                            </div>
                        </li>

                        <li>
                            <div className={styles.slide}> {/*we will display user information(like username, email gotten from the 
                             localstorage you will create it later like profile(but er are using static variable)) */}
                                <div className={styles.userInfo}>
                                    <img src={woman} alt=''/>
                                    <div> {/*for name and resignation(resides) */}
                                        <h6>William Jackson</h6>
                                        <span>Lagos, Nigeria</span>
                                    </div>
                                    
                                </div>
                                <p>Lorem ipsum dolor sit  quas doloremque, officiis quos eius dolorum ipsam laborum pariatur 
                                quibusdam labore dolorem, delectus iure perferendis maxime itaque minus soluta.</p>

                            </div>
                        </li>
                        <li>
                            <div className={styles.slide}> {/*we will display user information(like username, email gotten from the 
                             localstorage you will create it later like profile(but er are using static variable)) */}
                                <div className={styles.userInfo}>
                                    <img src={woman} alt=''/>
                                    <div> {/*for name and resignation(resides) */}
                                        <h6>William Jackson</h6>
                                        <span>Lagos, Nigeria</span>
                                    </div>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur quas doloremque, officiis quos eius dolorum ipsam laborum pariatur 
                                    quibusdam labore dolorem, delectus iure perferendis maxime itaque minus soluta.</p>

                            </div>
                        </li>

                        <li>
                            <div className={styles.slide}> {/*we will display user information(like username, email gotten from the 
                             localstorage you will create it later like profile(but er are using static variable)) */}
                                <div className={styles.userInfo}>
                                    <img src={profile} alt=''/>
                                    <div> {/*for name and resignation(resides) */}
                                        <h6>William Jackson</h6>
                                        <span>Lagos, Nigeria</span>
                                    </div>
                                   
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur quas doloremque, officiis quos eius dolorum ipsam laborum pariatur 
                                quibusdam labore dolorem, delectus iure perferendis maxime itaque minus soluta.</p>
                            </div>
                            {/*now we are adding the functionality that when we click on this next buttonit should display another user testimonial */}
                        </li>
                        
                    </ul>

                </div>
                
            </div>

            <div className={styles.title}>
                <p>Contact Us</p>
                <h3>Get in Touch</h3>

            </div>
            {/*CONTACT US SECTION */}
            <div className={styles.contact} id='con'>
                {/*we will create two columns in the left column we will display the text and some contact information
                and in the right column we will display one contact form where user can submit the name, phone number and message 
                and that message will be sent to admin email ID */}
                <div className={styles.contactCol}>
                    <h4>Send us a Message <img src={mail} alt=''/></h4>
                    <p>
                        Feel Free to reach out through our contact form or find our contact information
                        below. your feedback, question, and suggestions are important to us as we strive to provide exceptional
                        service to our hospitality community. 
                    </p>
                    <ul>
                        <li><img src={email} alt=''/>Contact@codeblooded.dev</li>
                        <li><img src={phone} alt=''/>+234 (0) 70700 18654</li>
                        <li><img src={location} alt=''/>No.7 fifth Avenue, Independent Layout <br/> MA 02139, Canada</li>
                    </ul>
                </div>
                <div className={styles.contactCol}>
                    <form action="https://formsubmit.co/nnatuanyafrank@gmail.com" method="POST" >
                        <label>Your Name</label>
                        <input type='text' name='name' placeholder='Fullname' required/>
                        <label>Phone Number</label>
                        <input type='tel' name='phone' placeholder='Mobilenumber' required/>
                        <label>Write Your Message</label>
                        <textarea name='message'  rows='6' placeholder='Enter Your Message' required />
                        <button type='submit' className='btn btn-primary'>Submit now  <FontAwesomeIcon style={{color:'white'}} icon={faArrowRight} /></button>
                    </form>
                    <span></span>
                </div>

            </div>

             {/*footer side now later on we will make it a component like nav bar to appear on all screens*/}
            <div className={styles.footer}>
                <p>© 2024 Peaceveil. All rights reserved</p>
                <ul>
                    <li>Terms of Services</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

           
        </div>

         {/* WE WILL DO THE VIDEO PLAYER NOW */}
         <div ref={player} onClick={closePlayer} className={`${styles.videoPlayer} ${playstate? '' : styles.hide } `} > {/*its playing(now to add functionality that when we click on the empty space it will stop playing the video) */}
            <video src={videoPlayer} autoPlay muted controls></video>

        </div>
        
       
    </>
  )
}

export default Homescreen
