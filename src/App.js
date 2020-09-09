import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {

	const [loggedInUser, setLoggedInUser] = useState({});

	return (
		<UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="App">
			<h3>{loggedInUser.email}</h3>
			<BrowserRouter>
			<Header />
				<Switch>
					<Route exact path="/"><Shop /></Route>
					<Route path="/shop"><Shop /></Route>
					<Route path="/review"><Review /></Route>
					<Route path="/inventory"><Inventory /></Route>
					<Route path="/product/:product_key"><ProductDetails /></Route>
					<Route path="/place_order"><PlaceOrder /></Route>
					<PrivateRoute path="/shipment"><Shipment /></PrivateRoute>
					<Route path="/login"><Login /></Route>

					<Route path="*"><NotFound /></Route>
				</Switch>
			</BrowserRouter>

		</UserContext.Provider>
	);
}

export default App;
