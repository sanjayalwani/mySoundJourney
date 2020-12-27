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
				Privacy is something I value greatly, and it feels like something harder to find on the Web each day.
				I have made this project open source on 
				<a href="github.com/sanjayalwani/mysoundjourney">Github</a> so you can see how it works.
			</p>
			<p>
				Motivations behind privacy
				<ul>
					<li>
						Complies with Spotify's API use terms and conditions
					</li>
					<li>
						All processing and data on the client (your device) saves me server costs.
					</li>
					<li>
						Complies with my ethos on privacy.
					</li>
				</ul>
			</p>
			<p>
				A consequence of this privacy-driven approach is that I will not be able to make deeper insights and models tailored to you.
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
