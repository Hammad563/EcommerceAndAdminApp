
import './App.css';
import Home from './containers/HomePages/home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProductListPage from './containers/Products/productListPage';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { isUserLoggedIn } from './actions';
import ProductDetails from './containers/productDetails/productDetails';
import Cart from './containers/Cart/cart';
import { updateCart } from './actions/cart.actions';
import CheckoutPage from './containers/checkoutPage/checkout';
import OrderPage from './containers/OrderPage/orderPage';
import OrderDetails from './containers/orderDetails/orderDetails';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect( () => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate])

  useEffect( () => {
    dispatch(updateCart());
  },[auth.authenticate]);



  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/cart"  component={Cart}></Route>
          <Route path="/checkout"  component={CheckoutPage}></Route>
          <Route path="/accounts/orders"  component={OrderPage}></Route>
          <Route path="/order_details/:orderId"  component={OrderDetails}></Route>
          <Route path="/:productSlug/:productId/p"  component={ProductDetails}></Route>
          <Route path="/:slug"  component={ProductListPage}></Route>
        </Switch>
      </Router>
    </div>
  

    
  );
}

export default App;
