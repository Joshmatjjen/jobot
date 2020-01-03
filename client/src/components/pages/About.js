import React from 'react';
import Chatbot from '../chatbot/Chatbot';
import './About.styles.css';
const About = () => {
  return (
    <div class="home" style={{textAlign: 'center', height: '100%', width: '100%'}}>
      <div className="About-content">
        <div className="welcome-text">
          <h2>Do you want to learn more about me?</h2>
          <h6 className="wel-content">
            <a
              href=""
              class="typewrite"
              data-period="2000"
              data-type='[ "Who am i?", "Who is Joshmat?", "Who is Joshmat best friend?", "What is Joshmat best food?", "Does Joshmat have a girlfriend" ]'
            >
              <span class="wrap"></span>
            </a>
          </h6>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzRF5rl3rj9USI3JpelxYZI3jISrvOUzJJogxxJKPmVHw4wCAh"
          alt=""
        />
      </div>
      <Chatbot />
    </div>
  );
};

export default About;
