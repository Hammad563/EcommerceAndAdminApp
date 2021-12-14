import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useEffect} from 'react';
import Layout from './components/Layout/Layout';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/home/Home';
import SignIn from './containers/signin/SignIn';
import SignUp from './containers/signup/SignUp';
import PrivateRoute from './components/HOC/privateRoute';
import {useDispatch, useSelector} from 'react-redux';
import {isUserLoggedIn} from './actions/auth.actions';
import Orders from './containers/orders/orders';
import Category from './containers/cat/cat';
import Products from './containers/products/products';
import Page from './containers/page/page';
import { getAllCategory} from './actions/';
import { getInitialData } from './actions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect( () => {
    if(!auth.authenticate){
        dispatch(isUserLoggedIn());
    }   
    if(auth.authenticate){
      dispatch(getInitialData());   
    }
    
}, [auth.authenticate]);


  return (
    <div className="App">
      
        <Switch>
          <PrivateRoute path="/" exact component={Home}></PrivateRoute>
          <PrivateRoute path="/page" exact component={Page}></PrivateRoute>
          <PrivateRoute path="/products"  component={Products}></PrivateRoute>
          <PrivateRoute path="/orders"  component={Orders}></PrivateRoute>
          <PrivateRoute path="/cat"  component={Category}></PrivateRoute>

          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
        </Switch>
    
      
    </div>
  );
}

export default App;
