import React from 'react';
import Chatbot from '../chatbot/Chatbot';
import './Landing.styles.css';

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
const Landing = () => (
  <div className="home" style={{textAlign: 'center', height: '100%', width: '100%'}}>
    <div className="Land-content">
      <div className="welcome-text">
        <h1>Welcome To JoBot.</h1>
        <h6 className="wel-content">
          <a
            href=""
            class="typewrite"
            data-period="2000"
            data-type='[ "Hi, Im Joshmat.", "I am Creative.", "I Love Design.", "I Love to Develop.", "JoBot is an interractive, smart and funny AI ChatBot built to put smile on the faces of his creator friends 😊" ]'
          >
            <span class="wrap"></span>
          </a>
        </h6>
      </div>
      <img
        src="https://cdn.dribbble.com/users/579758/screenshots/6514423/16_iso_artificial_intelegence_or_15_2x.jpg"
        alt=""
      />
    </div>

    <Chatbot />
  </div>
);

export default Landing;
