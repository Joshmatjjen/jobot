import React from 'react';
import './Footer.css';
import facebook from '../assets/facebook-logo.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';
import linkedin from '../assets/linkedin.png';

const date = new Date().getFullYear();

const Footer = () => (
  <footer className="footers">
    <div class="copyright">
      <p>JoBot. &copy;{date} All Right Reserved</p>
    </div>
    <div class="social">
      <a target="_blank" href="https://www.facebook.com/JoshmatJjen" class="face">
        <img src={facebook} alt="" />
      </a>
      <a target="_blank" href="https://www.instagram.com/joshmatjjen/" class="insta">
        <img src={instagram} alt="" />
      </a>
      <a target="_blank" href="https://twitter.com/Joshmat_jjen" class="tweet">
        <img src={twitter} alt="" />
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/joshmat-jjen-245771161/"
        class="linked"
      >
        <img src={linkedin} alt="" />
      </a>
    </div>
  </footer>
);

export default Footer;
