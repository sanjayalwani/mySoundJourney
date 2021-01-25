import React, { useState } from "react";
import "./Footer.css";
import Modal from "./Modal";

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
        show={modalBits & 0b1}
		onCancel={closeModals}
      >
        <div>
			<p>
				I have always been amazed at the songs recommended to me by
				Spotify. Looking through their API documentation I saw
				that they track so many features for every single track.
				Features include: positivity, danceability, energy, popularity, acousticness, liveness and more <a>(here)[link]</a>.
			</p>
			<p>
				With mySoundJourney I aim to visualize and analyze the numbers behind your music completely using your devices processing power to preserve your <a href="" onClick={(e)=> {e.preventDefault(); openModalK(1);}}>privacy</a> and my running costs. 
			</p>
			<p>
				Read more and see the code for yourself on the <a href="github.com/sanjayalwani/mysoundjourney">Github repo</a>
			</p>
		</div>
      </Modal>
      <Modal
        header="Privacy"
        show={modalBits & 0b10}
		onCancel={closeModals}
      >
        <div>
			<p>
				mySoundJourney does not store any user data.
			</p>
			<h4>How does it work?</h4>
			<p>
				mySoundJourney delivers the code for the web app to run to your browser
				and gets a token to access Spotify using <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow">
					this authorization scheme.
				</a>

				Check out the <a href="github.com/sanjayalwani/mysoundjourney">source code</a> to see how mySoundJourney works.
			</p>
			<h2>The Data flow</h2>
			<p>
				When you click connect to Spotify you will be redirected to spotify.com to
				authorize mySoundJourney with a list of permissions.
				If you accept, Spotify will send me a short-lived token with these permissions
				that gets sent with every request so they know who you are and what app you're using.
				That token is stored as a <b>cookie</b> on your device, and all further data
				flows between your device and Spotify.
			</p>
			<p>
				The only data stored is the number of people that use the app. This saves me
				the cost and the worry of keeping your data.
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
