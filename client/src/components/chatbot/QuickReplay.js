import React from 'react';
import './QuickReply.styles.css';

const QuickReplay = props => {
  if (props.reply.payload) {
    return (
      <a
        style={{margin: 3}}
        className="ans-btn"
        onClick={() => props.click(props.reply.payload, props.reply.text)}
      >
        {props.reply.text}
      </a>
    );
  } else {
    return (
      <a className="ans-btn-more" href={props.reply.link}>
        {props.reply.text}
      </a>
    );
  }
};
export default QuickReplay;
