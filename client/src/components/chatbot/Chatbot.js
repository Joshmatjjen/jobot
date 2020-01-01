import React, {Component} from 'react';
import axios from 'axios/index';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {v4 as uuid} from 'uuid';
import Linkify from 'react-linkify';

import Message from './Message';
import Card from './Card';
import QuickReplies from './QuickReplies';

import bot from '../../assets/bot.png';
import bots from '../../assets/bots.png';
import chat from '../../assets/chat.png';
import './Chatbot.style.css';

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
    this._handleSendBtn = this._handleSendBtn.bind(this);
    this.state = {
      messages: [],
      showBot: false,
      shopWelcomeSent: false,
      welcomeSent: false,
      clientToken: false,
      regenerateToken: 0,
      inputValue: '',
      sentText: 'Waiting for bot...',
      online_status: '#ff0000',
    };

    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), {path: '/'});
    }
  }

  //   😂
  //   😁 😊
  //   😊 Let me tell you a joke:
  // 🥰  😍
  // 💕  😘
  // 🤗
  // 😕  😢
  // 🤪   👨‍💻
  // 😌
  // 🤐
  // 🦜
  // 🤓

  // 😎
  // 🙂
  // 😐
  // 🤖

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
    const request = {
      queryInput: {
        text: {
          text: text,
          languageCode: 'en-US',
        },
      },
    };
    this.setState({sentText: 'Sending Message...'});
    await this.df_client_call(request);
  }

  async df_event_query(event) {
    const request = {
      queryInput: {
        event: {
          name: event,
          languageCode: 'en-US',
        },
      },
    };

    await this.df_client_call(request);
  }

  async df_client_call(request) {
    try {
      if (this.state.clientToken === false) {
        const res = await axios.get('/api/get_client_token');
        this.setState({clientToken: res.data.token});
      }

      var config = {
        headers: {
          Authorization: 'Bearer ' + this.state.clientToken,
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
      const res = await axios.post(
        'https://dialogflow.googleapis.com/v2/projects/' +
          process.env.REACT_APP_GOOGLE_PROJECT_ID +
          '/agent/sessions/' +
          process.env.REACT_APP_DF_SESSION_ID +
          cookies.get('userID') +
          ':detectIntent',
        request,
        config
      );
      console.log(process.env.REACT_APP_GOOGLE_PROJECT_ID);

      let says = {};
      this.setState({sentText: 'Parrot Typing.....', online_status: '#00fa00'});
      await this.resolveAfterXSeconds(3);
      this.setState({sentText: ''});
      console.log(this.state.sentText);
      if (res.data.queryResult.fulfillmentMessages) {
        for (let msg of res.data.queryResult.fulfillmentMessages) {
          says = {
            speaks: 'bot',
            msg: msg,
          };
          this.setState({
            messages: [...this.state.messages, says],
          });
          await this.resolveAfterXSeconds(2);
        }
        this.setState({sentText: ''});
      }

      this.setState({regenerateToken: 0});
    } catch (e) {
      if (e.response && this.state.regenerateToken < 1) {
        if (e.response.status === 401 && this.state.regenerateToken < 1) {
          this.setState({clientToken: false, regenerateToken: 1});
          this.df_client_call(request);
        }
      } else {
        this.setState({online_status: '#ff0000'});
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
  }

  resolveAfterXSeconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, x * 1000);
    });
  }

  async componentDidMount() {
    if (this.state.showBot === false) {
      await this.resolveAfterXSeconds(5);
      this.setState({showBot: true});
    }

    if (window.location.pathname === '/') {
      await this.df_event_query('Welcome');
      this.setState({sentText: 'Parrot Typing.....'});
      this.df_event_query('WelcomeName');
    } else if (window.location.pathname === '/shop') {
      await this.resolveAfterXSeconds(1);
      this.df_event_query('SHOW_RECOMMENDATIONS');
      this.setState({shopWelcomeSent: true, showBot: true});
    } else if (window.location.pathname === '/about') {
      await this.resolveAfterXSeconds(1);
      this.df_event_query('ABOUT_JOSHMAT');
      this.setState({showBot: true});
    }
    this.props.history.listen(async () => {
      if (this.props.history.location.pathname === '/shop') {
        this.df_event_query('SHOW_RECOMMENDATIONS');
        this.setState({shopWelcomeSent: true, showBot: true});
      }
    });
  }

  async componentDidUpdate() {
    this.messagesEnds.scrollIntoView({behaviour: 'smooth'});
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  async show() {
    this.setState({sentText: 'Waiting for bot...'});
    await this.setState({showBot: true});
    if (this.state.showBot === true) {
      this.componentDidMount();
    }
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      showBot: false,
      shopWelcomeSent: false,
      online_status: '#ff0000',
      messages: [],
    });
  }

  async _handleQuickReplyPayload(payload, text) {
    switch (payload) {
      case 'recommended_yes':
        this.df_event_query('SHOW_RECOMMENDATIONS');
        break;
      default:
        await this.df_text_query(text);
        await this.resolveAfterXSeconds(5);
        console.log('done waiting');
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card} />);
  }

  renderOneMessages(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
    } else if (message.msg && message.msg.payload && message.msg.payload.cards) {
      return (
        <div key={i}>
          <div className="card-box">
            <div style={{overflow: 'hidden'}}>
              <div className="col s2">
                <img
                  style={{float: 'left', clear: 'both'}}
                  src={bot}
                  width="50px"
                  height="50px"
                />
              </div>
              <div style={{overflowX: 'scroll'}}>
                <div
                  style={{
                    height: 240,
                    width: message.msg.payload.cards.length * 270,
                  }}
                >
                  {this.renderCards(message.msg.payload.cards)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (message.msg && message.msg.payload && message.msg.payload.quick_replies) {
      return (
        <QuickReplies
          text={message.msg.payload.text ? message.msg.payload.text : null}
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.quick_replies}
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
      if (e.target.value === '') {
        console.log('Empty message');
      } else {
        this.df_text_query(e.target.value);
        this.setState({inputValue: ''});
      }
    }
  }

  _handleSendBtn() {
    this.talkInput = this.state.inputValue;
    if (this.state.inputValue === '') {
      console.log('Empty Message');
    } else {
      this.setState({inputValue: ''});
      this.df_text_query(this.talkInput);
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        <div className="chatbox">
          <nav className="chat-nav">
            <div className="nav-image">
              <img width="50" height="50" src={bots} />
              <span
                className="dot"
                style={{backgroundColor: this.state.online_status}}
              ></span>
              <p>{this.state.sentText}</p>
            </div>
            <div className="nav-close">
              <a style={{fontSize: '25px'}} onClick={this.hide}>
                &#10005;
              </a>
            </div>
          </nav>

          <div className="msg-box">
            <div className="msg-box-content">
              <Linkify>{this.renderMessages(this.state.messages)}</Linkify>
            </div>

            <div
              ref={el => {
                this.messagesEnds = el;
              }}
              style={{float: 'left', clear: 'both'}}
            ></div>
          </div>
          <div className="input-msg">
            <input
              placeholder="Type a message...."
              type="text"
              ref={input => {
                this.talkInput = input;
              }}
              value={this.state.inputValue}
              onKeyPress={this._handleInputKeyPress}
              onChange={event => this.setState({inputValue: event.target.value})}
            />
            <div className="send">
              <div onClick={this._handleSendBtn} className="send-btn">
                &#10147;
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <img
          className="chat-icon"
          src={chat}
          width="60px"
          height="60px"
          onClick={this.show}
          ref={el => {
            this.messagesEnds = el;
          }}
          style={{position: 'fixed', right: 20, bottom: 50, clear: 'both'}}
        />
      );
    }
  }
}

export default withRouter(Chatbot);
