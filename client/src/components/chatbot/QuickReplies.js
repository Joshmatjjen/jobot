import React, {Component} from 'react';
import QuickReply from './QuickReplay';
import './QuickReplies.styles.css';
import Linkify from 'react-linkify';

import bot from '../../assets/parrot.png';

class QuickReplies extends Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(payload, text) {
    this.props.replyClick(payload, text);
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this._handleClick} reply={reply} />;
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="content m-2">
          <div className="row ">
            <div style={{padding: 5}}>
              {/* <a className="btn-floating btn-large waves-effect waves-light black">
                {this.props.speaks}
              </a> */}
              <img style={{float: 'left'}} src={bot} width="50px" height="50px" />
            </div>
            <Linkify>
              <div id="quick-replies" className="col s10">
                {this.props.text && <p>{this.props.text}</p>}
                {this.renderQuickReplies(this.props.payload)}
              </div>
            </Linkify>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickReplies;
