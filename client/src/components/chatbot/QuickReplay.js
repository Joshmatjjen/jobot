import React from 'react';

const QuickReplay = props => {
  if (props.reply.payload) {
    return (
      <a
        style={{margin: 3}}
        className="btn-floating btn-large wave s-effect waves-light blue"
        onClick={() => props.click(props.reply.payload, props.reply.text)}
      >
        {props.reply.text}
      </a>
    );
  } else {
    return (
      <a
        style={{margin: 3}}
        className="btn-floating btn-large waves-effect waves-light blue"
        href={props.reply.link}
      >
        {props.reply.text}
      </a>
    );
  }
};
export default QuickReplay;
