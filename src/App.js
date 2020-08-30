import React from 'react';
import logo from './logo.svg';
import {BrowserRouter , Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';

function App() {
  return (
    <div className="App">
    <Header/>
      <BrowserRouter>
          <Switch>
            <Route exact path="/"><Shop/></Route>
            <Route path="/shop"><Shop/></Route>
            <Route path="/review"><Review/></Route>
            <Route path="/inventory"><Inventory/></Route>
            <Route path="/product/:product_key"><ProductDetails/></Route>
            <Route path="/place_order"><PlaceOrder/></Route>

            <Route path="*"><NotFound/></Route>

          </Switch>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
