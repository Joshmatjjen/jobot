import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Landing from './pages/Landing';
import Shop from './shop/Shop';
import About from './pages/About';
import './App.css';

const App = () => (
  <div className="main">
    <BrowserRouter>
      <div style={{scrollbarColor: 'red yellow'}}>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/about" component={About} />
        <Footer />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
