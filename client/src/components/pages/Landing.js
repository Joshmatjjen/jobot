import React from 'react';
import Chatbot from '../chatbot/Chatbot';
import './Landing.styles.css';

const Landing = () => (
  <div className="home" style={{textAlign: 'center', height: '100%', width: '100%'}}>
    <div className="Land-content">
      <h1>Welcome To JOBot</h1>
      <img
        src="https://cdn.dribbble.com/users/579758/screenshots/6514423/16_iso_artificial_intelegence_or_15_2x.jpg"
        alt=""
      />
    </div>

    <Chatbot />
  </div>
);

export default Landing;
