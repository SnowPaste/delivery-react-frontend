import React from 'react';
import  { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Restaurant from './Restaurant'
import Cart from './Cart'
import Order from './Order'
import Profile from './Profile';

export default class App extends React.Component {
    render() {
        return (
            <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/restaurants" component={Home}/>
                    <Route exact path="/restaurant/:restaurant_id" component={Restaurant}/>
                    <Route exact path="/customer/:customer_id/cart" component={Cart}/>
                    <Route exact path="/order/:order_id" component={Order}/>
                    <Route exact path="/customer/:customer_id/profile" component={Profile}/>
                </Switch>
            </Router>
            </>
        )
    }
}