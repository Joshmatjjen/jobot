import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Platform from 'react-platform-js';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// When ready...
// console.log('Platform is = :', Platform.OS);

if (Platform.OS == 'Android' || Platform.OS === 'iOS') {
  //For iPhone and Andriod To remove Address bar when viewing website on Safari Mobile
  // When ready...
  window.addEventListener('load', function() {
    // Set a timeout...
    setTimeout(function() {
      // Hide the address bar!
      window.scrollTo(1, 0);
    }, 0);
  });
}
serviceWorker.unregister();
