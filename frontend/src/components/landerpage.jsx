import React from "react";
import "./landerpage.css";
import logoimg from "../assets/almamatterslogo.jpeg" 
import heroimg1 from "../assets/heroimg1.jpeg"
import heroimg2 from "../assets/heroimg2.jpeg"
import heroimg3 from "../assets/heroimg3.jpeg"
import heroimg4 from "../assets/heroimg4.jpeg"
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
          <a href="#student-login">Student Login</a>
          <a href="#alumni-login">Alumni Login</a>
          <a href="#admin-login">Admin Login</a>
          <a href="#about">About Us</a>
          <a href="#contact" className="contact-btn">Contact Us</a>
        </nav>
      </header>

    
      <main className="main">
        <div className="firstpara">
            <p>“Connecting Students and Alumni. Creating Opportunities That Matter.”</p>
            <p>Join the tribe now!</p>
        </div>
        <div className="heroimage">
            <div className="slider">
              <img src={heroimg1} alt="slide1" />
              <img src={heroimg2} alt="slide2" />
              <img src={heroimg3} alt="slide3" />
              <img src={heroimg4} alt="slide4" />
              <img src={heroimg5} alt="slide5" />
            </div>
        </div>
        <div className="trustedby">
            <div className="collegelogos">
              <img src="" alt="Psgtech" />
              <p>PSG</p>
            </div>
            <div className="collegelogos">
              <img src="" alt="IIT Madras" />
              <p>IITM</p>
            </div>
            <div className="collegelogos">
              <img src="" alt="BITS" />
              <p>BITS</p>
            </div>
            <div className="collegelogos">
              <img src="" alt="IIMB" />
              <p>IIMB</p>
            </div>
            <div className="collegelogos">
              <img src="" alt="IIsc" />
              <p>IIIsc</p>
            </div>
        </div>
      </main>
    </div>
  );
}
