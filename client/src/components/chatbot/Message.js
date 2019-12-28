import React from 'react';
import person from '../../assets/Programmer-512.png';
import bot from '../../assets/bot.png';
import Linkify from 'react-linkify';
// import {Image} from 'react-bootstrap';
import './Message.styles.css';

const Message = props => (
  <div className="container">
    <div className="content m-2">
      <div className="row p-2">
        <div style={{padding: '5px'}}>
          {props.speaks === 'bot' && <img width="50" height="50" src={bot} />}
        </div>
        <div className="col msg-data">
          <span className="black-text">
            <Linkify>{props.text}</Linkify>
          </span>
        </div>
        <div>{props.speaks === 'me' && <img width="50" height="50" src={person} />}</div>
      </div>
    </div>
  </div>
);

export default Message;
