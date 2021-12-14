import React, { useEffect, useState } from 'react';
import './checkout.css';
import {useSelector, useDispatch} from 'react-redux'
import { getAddress } from '../../actions/user.actions';
import Layout from '../../components/Layout/layout';
import { MaterialButton, MaterialInput } from '../../components/MaterialUI/material';
import AddressForm from './addressForm';
import { getCartItems, addOrder } from '../../actions';
import Cart from '../Cart/cart';
import Card from '../../components/UI/Card';



const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && "active"}`} onClick={props.onClick}>
                <div>
                    <span className='stepNumber'>{props.stepNumber}</span>
                    <span className='stepTitle'>{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    )
};

const Address = ({adr, selectAddress, enableAddressEditForm, confirmDeliveryAddress, onAddressSubmit }) =>{
    return(
        <div className="flexRow addressContainer">
            <div>
                <input name='address' onClick={ () => selectAddress(adr)} type="radio" />
            </div>
        </div>
    )
}


const CheckoutPage = (props) => {
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setselectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirm, setOrderConfirm] = useState(false);
    const [payment, setPayment] = useState(false);
    const [finalOrder, setfinalOrder] = useState(false);

    const dispatch = useDispatch();



    const onAddressSubmit = (addr) => {
        setselectedAddress(addr);
        setConfirmAddress(true);
    }


    const selectAddress = (addr) => {
     const updatedAddress = address.map(adr => adr._id === addr._id ? {...adr, selected: true} : {...adr, selected:false});
     setAddress(updatedAddress);
    }

    const enableAddressEditForm =(addr) =>{
        const updatedAddress = address.map( (adr) => adr._id === addr._id ? {...adr, edit:true} : {...adr, edit:false});
        setAddress(updatedAddress);
    }

    {/* Show selected Address only */}
    const confirmDelivery= (addr) => {
        setselectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }

    const orderConfirmation = () => {
        setConfirmAddress(true);
        setOrderSummary(false);
        setPayment(true)
    }

    const onConfirmOrder = () => {

        const items = Object.keys(cart.cartItems).map(key => ( {
            productId: key,
            payablePrice: cart.cartItems[key].price,
            purchasedQty: cart.cartItems[key].qty
        }))
        const payload = {
            addressId : selectedAddress._id,
            totalAmount : totalPrice+tax,
            items,
            paymentStatus: "pending",
            paymentType: "cod"
        }
      dispatch(addOrder(payload));

        console.log(payload)
        setPayment(false);
        setfinalOrder(true);
    }



    useEffect( () => {
      auth.authenticate && dispatch(getAddress());
      auth.authenticate && dispatch(getCartItems());
    },[auth.authenticate])

    useEffect ( () => {
        const address = user.address.map(adr =>({...adr, selected: false, edit: false}))
            setAddress(address);
           
    },[user.address])

    console.log(Object.keys(cart.cartItems).length)



    const totalItems = Object.keys(cart.cartItems).reduce(function(qty,key){
        return qty + cart.cartItems[key].qty
    },0)

    const totalPrice = Object.keys(cart.cartItems).reduce( (totalPrice,key) => {
        const {price, qty} = cart.cartItems[key];
        return totalPrice + price * qty;
        },0)
    const tax = totalPrice * 0.13;
    
    const totalAmount = totalPrice + tax
    


    

    
    if(finalOrder){
        return(
            <Layout>
                <Card>
                    <div>Thank You!</div>
                </Card>
            </Layout>
        )
    }


    return(
        <Layout>
            <div className="cartContainer">
                <div className="checkoutContainer">

                {/* 1. Check if user is logged in */}
                <CheckoutStep
                    stepNumber= {"1"}
                    title={"Login"}
                    active= {!auth.authenticate}
                    body = 
                        {
                            auth.authenticate ?
                            <div className='loggedInId'>
                                <span>{auth.user.fullName}</span>
                                <span>{auth.user.email}</span>
                             </div> :
                             <div>
                                 <MaterialInput
                                    label="Email"
                                 ></MaterialInput>
                             </div>
                        }
                       
                    
                >
                 </CheckoutStep>

                    {/* 2. Delivery Address  */}
                <CheckoutStep
                stepNumber={'2'}
                title={'Delivery Address'}
                active={!confirmAddress && auth.authenticate}
                body ={
                    <>
                   
                     {
                         confirmAddress ? (<div>{`${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>)
                        : address.map(adr => 
                            <div className="flexRow addressContainer">
                                <div>
                                    <input onClick={() => selectAddress(adr)} type="radio" name='address' />
                                </div>

                                <div className="flexRow sb addressinfo">
                                    {
                                        !adr.edit ? (
                                         <div className='AddressInfoContainer'>
                                            <div className='addressDetail'>

                                                <div>
                                                    <span className='addressName'>{adr.name}</span>
                                                    <span className='addressType'>{adr.addressType}</span>
                                                    <span className='addressMobile'>{adr.mobileNumber}</span>
                                                </div>

                                                {
                                                    adr.selected && (
                                                    <button className='EditButton' onClick={() => enableAddressEditForm(adr)}>Edit</button>
                                                    )
                                                }

                                            </div> 
                                            
                                            <div className='fullAddress'>
                                                
                                                    {adr.address} <br></br>{" "}
                                                    {`${adr.state} - ${adr.pinCode}`}
                                            </div>

                                            {
                                                adr.selected && (
                                                    <MaterialButton
                                                    title="Deliver Here"
                                                    onClick={() => confirmDelivery(adr)}
                                                    ></MaterialButton>
                                                )
                                            }

                                        </div>
                                        ):  (
                                            <AddressForm
                                            onSubmitForm={onAddressSubmit}
                                            initialData = {adr}
                                            onCancel={() => {}}
                                            ></AddressForm>
                                        )
                                    }
                                    
                                    
                                </div>
                            </div>  
                        )
                     }
                    </>
                    
                }
                ></CheckoutStep>


                {
                    confirmAddress ? null :
                    newAddress ?
                    <AddressForm
                        onSubmitForm = {onAddressSubmit}
                        onCancel = { () => {}}
                    ></AddressForm> :
                        <CheckoutStep
                            stepNumber= {"+"}
                            title= {'Add New Address'}
                            active = {false}
                            onClick= {() => setNewAddress(true)}
                        ></CheckoutStep>
                }

                <CheckoutStep
                stepNumber={"3"}
                title={"Order Summary"}
                active = {orderSummary}
                body= {
                    orderSummary ? <Cart onlyCartItems ={true}></Cart> : orderConfirm ? (<div>{Object.keys(cart.cartItems).length}</div>) : null
                }
                ></CheckoutStep>

                
                   {
                       orderSummary ?  <div className='Confirm flexRow sb'>
                       <p>Order confirmation email will be sent to {auth.user.email}</p>
                       <button  onClick={orderConfirmation} className='ContinueBtn'>Continue</button>
                   </div> : <div>Total items ordered are {totalItems}</div>
                   }
                

                <CheckoutStep
                stepNumber={"4"}
                title={"Payment Options"}
                active = {payment}
                body= {
                    payment &&
                     <div className='paymentOptions'>
                         <input type="radio" name='paymentOption' value="cod" />
                         <div>Cash on Delivery</div>
                         <MaterialButton
                         title="Confirm Order"
                         onClick={onConfirmOrder}
                         ></MaterialButton>
                     </div>
                }
                ></CheckoutStep>

                </div>
            </div>
        </Layout>
    )
}






export default CheckoutPage