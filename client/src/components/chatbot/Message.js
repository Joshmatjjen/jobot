import React, {useState, Component} from 'react';
import person from '../../assets/person.png';
import man from '../../assets/bots.png';
import bot from '../../assets/parrot.png';
import Linkify from 'react-linkify';
// import {Image} from 'react-bootstrap';
import './Message.styles.css';

// const Message = props => {
// let avat = props.text;

// const [msg, setMsg] = useState('');
// if (props.speaks === 'me' && props.text === 'male') {
//   setAvatar(man);
// } else {
//   setAvatar(person);
// }
// const [avatar, setAvatar] = useState(person);
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: person,
    };
  }

  // componentWillUpdate() {
  //   if (this.props.text === 'male') {
  //     this.setState({avatar: man});
  //   }
  // }
  render() {
    return (
      <div className="container">
        <div className="content m-2">
          <div className="row p-2">
            <div style={{padding: '5px'}}>
              {this.props.speaks === 'bot' && <img width="50" height="50" src={bot} />}
            </div>
            <div className="col msg-data">
              <span className="black-text">
                <Linkify>{this.props.text}</Linkify>
              </span>
            </div>
            <div>
              {this.props.speaks === 'me' && (
                <img width="50" height="50" src={this.state.avatar} />
              )}
              {/* {avat.text === 'male' ? setAvatar(person) : null} */}
              {/* {(if(me == 'f'){setAvatar(person)})} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
