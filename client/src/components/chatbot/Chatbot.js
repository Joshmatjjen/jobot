import React, {Component} from 'react';
import axios from 'axios/index';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';

import Message from './Message';
import Card from './Card';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnds;
  talkInput;

  constructor(props) {
    super(props);

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.state = {
      messages: [],
      showBot: true,
      shopWelcomeSent: false,
    };

    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), {path: '/'});
    }
  }

  async df_text_query(text) {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: text,
        },
      },
    };

    this.setState({messages: [...this.state.messages, says]});
    try {
      const res = await axios.post('/api/df_text_query', {
        text: text,
        userID: cookies.get('userID'),
      });

      for (let msg of res.data.fulfillmentMessages) {
        says = {
          speaks: 'bot',
          msg: msg,
        };
        this.setState({messages: [...this.state.messages, says]});
      }
    } catch (error) {
      says = {
        speaks: 'bot',
        msg: {
          text: {
            text: "I'm having trobles, I need to terminate. will be back later",
          },
        },
      };
      this.setState({messages: [...this.state.messages, says]});
      let that = this;
      setTimeout(function() {
        that.setState({showBot: false, messages: []});
      }, 3000);
    }
  }

  async df_event_query(event) {
    try {
      const res = await axios.post('/api/df_event_query', {event});

      for (let msg of res.data.fulfillmentMessages) {
        let says = {
          speaks: 'bot',
          msg: msg,
        };
        this.setState({messages: [...this.state.messages, says]});
      }
    } catch (error) {
      let says = {
        speaks: 'bot',
        msg: {
          text: {
            text: "I'm having trobles. I need to terminate. will be back later",
          },
        },
      };
      this.setState({messages: [...this.state.messages, says]});
      let that = this;
      setTimeout(function() {
        that.setState({showBot: false, messages: []});
      }, 3000);
    }
  }

  resolveAfterXSeconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, x * 1000);
    });
  }

  async componentDidMount() {
    this.df_event_query('Welcome');

    if (window.location.pathname === '/shop' && !this.state.shopWelcomeSent) {
      await this.resolveAfterXSeconds(2);
      this.df_event_query('WELCOME_SHOP');
      this.setState({shopWelcomeSent: true, showBot: true});
    }

    this.props.history.listen(() => {
      if (
        this.props.history.location.pathname === '/shop' &&
        !this.state.shopWelcomeSent
      ) {
        this.df_event_query('WELCOME_SHOP');
        this.setState({shopWelcomeSent: true, showBot: true});
      }
    });
  }

  componentDidUpdate() {
    this.messagesEnds.scrollIntoView({behaviour: 'smooth'});
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  show() {
    this.setState({showBot: true});
    // this.componentDidMount();
    this.df_event_query('Welcome');
  }

  hide() {
    this.setState({showBot: false, messages: []});
  }

  _handleQuickReplyPayload(payload, text) {
    // event.preventDefault();
    // event.stopPropagation();

    switch (payload) {
      case 'recommended_yes':
        this.df_event_query('SHOW_RECOMMENDATIONS');
        break;
      default:
        this.df_text_query(text);
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessages(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
    } else if (message.msg && message.msg.payload.fields.cards) {
      return (
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{overflow: 'hidden'}}>
              <div className="col s2">
                <a className="btn-floating btn-large waves-effect waves-light red">
                  {message.speaks}
                </a>
              </div>
              <div style={{overflow: 'auto', overflowY: 'scroll'}}>
                <div
                  style={{
                    height: 300,
                    width: message.msg.payload.fields.cards.listValue.values.length * 270,
                  }}
                >
                  {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(returnedMessages) {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return this.renderOneMessages(message, i);
      });
    } else {
      return null;
    }
  }

  _handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.df_text_query(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        <div
          style={{
            minHeight: 400,
            maxHeight: 500,
            width: 400,
            position: 'absolute',
            bottom: 0,
            right: 0,
            border: '1px solid light-grey',
          }}
        >
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">JoBot</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a onClick={this.hide}>Close</a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            id="jobot"
            style={{minHeight: 340, maxHeight: 340, width: '100%', overflow: 'auto'}}
          >
            {this.renderMessages(this.state.messages)}
            <div
              ref={el => {
                this.messagesEnds = el;
              }}
              style={{float: 'left', clear: 'both'}}
            ></div>
          </div>
          <div className="row" style={{marginBottom: 0}}>
            <div className="input-field col s12">
              <input
                style={{marginBottom: 0}}
                placeholder="type a message: "
                type="text"
                ref={input => {
                  this.talkInput = input;
                }}
                onKeyPress={this._handleInputKeyPress}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            height: 40,
            width: 400,
            position: 'absolute',
            bottom: 0,
            right: 0,
            border: '1px solid lightgrey',
          }}
        >
          <nav>
            <div className="nav-wrapper">
              <a className="brand-logo">JoBot</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a onClick={this.show}>Show</a>
                </li>
              </ul>
            </div>
          </nav>
          <div
            ref={el => {
              this.messagesEnds = el;
            }}
            style={{float: 'left', clear: 'both'}}
          ></div>
        </div>
      );
    }
  }
}

export default withRouter(Chatbot);