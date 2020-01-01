import React from 'react';
import Chatbot from '../chatbot/Chatbot';
import './About.styles.css';
const About = () => {
  return (
    <div class="home" style={{textAlign: 'center', height: '100%', width: '100%'}}>
      <div className="About-content">
        <div className="welcome-text">
          <h1>Do you want to learn more about me?</h1>
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQF8aRS3T25h4XKDC9ZcREfYdjQVru3o0kbebrCn2oitq79tCtO"
          alt=""
        />
      </div>
      <Chatbot />
    </div>
  );
};

export default About;
