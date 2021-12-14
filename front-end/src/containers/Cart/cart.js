import React, { useEffect, useState } from 'react'
import { IoMdCard } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/layout';
import Card from '../../components/UI/Card';
import CartItem from './cartItem';
import { addToCart, getCartItems } from '../../actions/cart.actions';
import './cart.css'
import { MaterialButton } from '../../components/MaterialUI/material';
import PriceDetails from '../../components/priceDetails/priceDetails';

const Cart = (props) => {

    const cart = useSelector(state => state.cart)
    const auth = useSelector(state => state.auth)
    //const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect( () => {
      setCartItems(cart.cartItems)
    },[cart.cartItems])

    useEffect( () => {
      if(auth.authenticate){
        dispatch(getCartItems());
      }
    },[auth.authenticate])

    const onQuantityIncre = (_id, qty) => {

      const { name, price, img} = cartItems[_id];
      dispatch(addToCart({_id,name,price, img}, 1))
    }
    const onQuantityDecre = (_id, qty) => {
      const { name, price, img} = cartItems[_id];
      dispatch(addToCart({_id,name,price, img}, -1))
    }

    
  const totalPrice = Object.keys(cart.cartItems).reduce( (totalPrice,key) => {
        const {price, qty} = cart.cartItems[key];
        return totalPrice + price * qty;
        },0)
  const tax = totalPrice * 0.13;

  if(props.onlyCartItems){
    return(
      <>
      {
        Object.keys(cartItems).map( (key, index) =>
        <CartItem
          key={index}
          cartItem= {cartItems[key]}
          onQuantityIncre = {onQuantityIncre}
          onQuantityDecre = {onQuantityDecre}
        > 
        </CartItem>
        )
      }
      </>    
    );
  }

    return (
      <Layout>
        <div className="cartContainer" style={{alignItems: 'flex-start'}}>
          <Card headerLeft={`My Cart`} headerRight={<div>Deliver to</div>}>
            {
              Object.keys(cartItems).map( (key, index) =>
              <CartItem
                key={index}
                cartItem= {cartItems[key]}
                onQuantityIncre = {onQuantityIncre}
                onQuantityDecre = {onQuantityDecre}
              > 
              </CartItem>
              )
            }


            <div className='placeOrderContainer'>
              <div className="placeOrderButton">
                <MaterialButton
                title="Place Order"
                bgColor="#1d1057"
                textColor="white"
                onClick={ () => props.history.push(`/checkout`)}
                >
                </MaterialButton>
              </div>
            </div>
          </Card>

            <PriceDetails
            totalItem = {Object.keys(cart.cartItems).reduce(function(qty,key){
                return qty + cart.cartItems[key].qty
            },0)}
            totalPrice= {totalPrice}
            tax = {tax}
            finalPrice = {totalPrice + tax}
            ></PriceDetails>
          
        </div>
      </Layout>
    );
}

export default Cart

// <Card headerLeft='Price' style={{ width: "500px" }}></Card>