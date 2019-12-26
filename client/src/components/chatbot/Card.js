import React from 'react';
import './Card.styles.css';

const Card = props => (
  <div style={{float: 'left', paddingRight: 20, width: 250}}>
    <div className="card-layout">
      <div className="card-img">
        <img alt={props.payload.header} src={props.payload.image} />
        <span className="card-title">{props.payload.header}</span>
      </div>
      <div className="card-contents">
        <p>{props.payload.description} </p>
        <p>
          <a>{props.payload.price}</a>
        </p>
      </div>
      <div className="card-action">
        <a target="_blank" rel="noopener noreferrer" href={props.payload.link}>
          GET NOW
        </a>
      </div>
    </div>
  </div>
);

export default Card;
