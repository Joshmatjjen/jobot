import React from 'react';
import ItemList from './ItemList';
import Chatbot from '../chatbot/Chatbot';

const Shop = () => (
  <div style={{textAlign: 'center', height: '100%', width: '100%'}}>
    <h2>Shop</h2>
    <p>I am the best</p>
    <ItemList />
    <Chatbot />
  </div>
);

export default Shop;
