import React from 'react';
import Chatbot from '../chatbot/Chatbot';
import './Shop.styles.css';

const Shop = () => (
  <div className="shop" style={{textAlign: 'center', height: '100%', width: '100%'}}>
    <div className="About-content">
      <div className="welcome-text">
        <h1>Looking for an Item?</h1>
        <h6 className="wel-content">
          <a
            href=""
            class="typewrite"
            data-period="2000"
            data-type='[ "Recommend a course for me", "Recommendations", "What are the best courses?", "Give me recommendations", "Give me recommendations" ]'
          >
            <span class="wrap"></span>
          </a>
        </h6>
      </div>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/woman-shopping-online-938021.png"
        alt=""
      />
    </div>
    <Chatbot />
  </div>
);

export default Shop;
