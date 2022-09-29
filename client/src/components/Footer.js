import React from "react";
import "./Footer.css";
import facebook from "../assets/facebook-logo.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";

const date = new Date().getFullYear();

const Footer = () => (
  <footer className="footers">
    <div class="copyright">
      <p>
        JoBot. &copy;{date} All Right Reserved by{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/joshmatjjen/"
          class="linked"
          rel="noreferrer"
        >
          <p>Joshmat</p>
        </a>{" "}
      </p>
    </div>
    <div class="social">
      <a
        target="_blank"
        href="https://github.com/Joshmatjjen"
        class="face"
        rel="noreferrer"
      >
        <img src={github} alt="" />
      </a>
      <a
        target="_blank"
        href="https://www.instagram.com/joshmatjjen/"
        class="insta"
        rel="noreferrer"
      >
        <img src={instagram} alt="" />
      </a>
      {/* <a target="_blank" href="https://twitter.com/Joshmat_jjen" class="tweet">
        <img src={twitter} alt="" />
      </a> */}
      <a
        target="_blank"
        href="https://www.linkedin.com/in/joshmatjjen/"
        class="linked"
        rel="noreferrer"
      >
        <img src={linkedin} alt="" />
      </a>
    </div>
  </footer>
);

export default Footer;
