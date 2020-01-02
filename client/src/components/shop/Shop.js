import React from 'react';
import Chatbot from '../chatbot/Chatbot';
import './Shop.styles.css';

const TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  const i = this.loopNum % this.toRotate.length;
  const fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  let that = this;
  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  const elements = document.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-type');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  const css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
  document.body.appendChild(css);
};

const Shop = () => (
  <div className="shop" style={{textAlign: 'center', height: '100%', width: '100%'}}>
    <div className="About-content">
      <div className="welcome-text">
        <h2>Looking for an online course?</h2>
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
