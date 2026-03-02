import React from "react";
import "./landerpage.css";
import { Link } from "react-router-dom";
import logoimg from "../assets/almamatterslogo.jpeg" 
import heroimg1 from "../assets/heroimg1.jpeg"
import heroimg2 from "../assets/heroimg2.jpeg"
import heroimg3 from "../assets/heroimg3.jpeg"
import heroimg4 from "../assets/heroimg4.jpeg"
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import image4 from "../assets/image4.jpg"
import heroimg5 from "../assets/almamatterslogowithname.jpeg"
export default function LandingPage() {
  return (
    <div className="page">
      
      <header className="header">
       
        <div className="logo-section">
          <div ><img src={logoimg} alt="almamatterslogo" className="logo"/></div>
          <span className="brand-name">AlmaMatters</span>
        </div>

        
        <nav className="nav-links">

  <Link to="/login">Login</Link>

  <Link to="/signup">SignUp</Link>

  <Link to="/about">About Us</Link>

  <Link to="/contact" className="contact-btn">
    Contact Us
  </Link>

</nav>
      </header>

    
      <main className="main">
        <div className="firstpara">
            <p>“Connecting Students and Alumni. Creating Opportunities That Matter.”</p>
            <p>Join the tribe now!</p>
        </div>
        <div className="heroimage">
            <div className="slider">
              {/* <img src={heroimg1} alt="slide1" />
              <img src={heroimg2} alt="slide2" />
              <img src={heroimg3} alt="slide3" />
              <img src={heroimg4} alt="slide4" /> */}
              <img src={heroimg5} alt="slide5" />
              <img src={image1} alt="slide6" />
              <img src={image2} alt="slide7" />
              <img src={image3} alt="slide8" />
              <img src={image4} alt="slide9" />
            </div>
        </div>
        <div className="trustedby">
          <h4>Trusted By :</h4>
            <div className="collegelogos">
              {/* <img src="https://en.wikipedia.org/wiki/PSG_College_of_Technology" alt="Psgtech" /> */}
              <p>PSG </p>
            </div>
            <div className="collegelogos">
              {/* <img src="https://en.wikipedia.org/wiki/IIT_Madras" alt="IIT Madras" /> */}
              <p>IITM </p>
            </div>
            <div className="collegelogos">
              {/* <img src="https://www.pinterest.com/pin/birla-institute-of-technology-science-logo--967429563686954103/" alt="BITS" /> */}
              <p>BITS </p>
            </div>
            <div className="collegelogos">
              {/* <img src="https://en.wikipedia.org/wiki/Indian_Institute_of_Management_Bangalore" alt="IIMB" /> */}
              <p>IIMB </p>
            </div>
            <div className="collegelogos">
              {/* <img src="https://iisc.ac.in/iisc-logo/" alt="IIsc" /> */}
              <p>IISc </p>
            </div>
        </div>
      </main>
    </div>
  );
}
