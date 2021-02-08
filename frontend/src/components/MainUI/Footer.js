import React, { useState } from 'react';
import './Footer.css';
import Modal from './Modal';

const Footer = (props) => {
  //Bit order <-> Display order (Right-to-left)
  const [modalBits, setmodalBits] = useState(0);
	console.log(modalBits);
  const openModalK = (kthbit) => {
    setmodalBits(2 ** kthbit);
  };
  const closeModals = () => {
	setmodalBits(0b000);
  };

  return (
    <React.Fragment>
      <Modal
        header="About"
        isOpen={modalBits & 0b1}
        toggle={closeModals}
      >
        <div>
          <p>
            I have always been amazed at the songs recommended to me by Spotify. 
            When I dug deeper I saw that every single song has been analyzed with its every feature quantified.
            These features include: positivity, danceability, energy, popularity, acousticness, liveness and more <a>here</a>.
          </p>
          <p>
            With mySoundJourney I aim to visualize and analyze the numbers behind your music completely on your device to preserve your <a href="" onClick={(e)=> {e.preventDefault(); openModalK(1);}}>privacy</a> and my running costs. 
          </p>
          <p>
            Read more and see the code for yourself on the <a href="github.com/sanjayalwani/mysoundjourney">Github repository</a>
          </p>
        </div>
      </Modal>

      <Modal
        header="Privacy"
        isOpen={modalBits & 0b10}
        toggle={closeModals}
      >
        <div>
          <p>mySoundJourney does not store any user data</p>
          
          <h4>Why?</h4>
          <ul>
            <li>I value personal privacy</li>
            <li>It costs money to store data</li>            
            <li>I've got enough stuff to worry about</li>
          </ul>

          <h4>How does it work?</h4>
          <p>
            mySoundJourney delivers the code for the web application right to your browser
            and when you connect, an expiring cookie 🍪 is created to access Spotify using 
            <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow">
              this authorization scheme.
            </a>
          </p>
          <p>
            Check out the <a href="https://github.com/sanjayalwani/mysoundjourney">source code</a> to see how it all works under the hood.
          </p>
        </div>
      </Modal>

      <footer className="main-footer">
        <span className="main-footer-author">© 2020 Sanjay Alwani</span>
        <span className="main-footer-nav">
          <span style={{ color: "#EEE" }} onClick={()=>{openModalK(0)}}>
            	About
          </span>
          <span style={{ color: "#EEE" }} onClick={()=>{openModalK(1)}}>
              Privacy
          </span>
          {/*<span>Feedback</span>*/}
        </span>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
