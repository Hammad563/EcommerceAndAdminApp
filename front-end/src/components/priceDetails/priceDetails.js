import React from 'react';
import Card from '../UI/Card';
import './priceDetails.css'

const PriceDetails = (props) => {
    return (
        <Card headerLeft= {"price Details"} style={{maxWidth:"380px"}}>
            <div className='PriceContainer'>
                <div className="flexRow sb details">
                    <div>{props.totalItem} Items Selected</div>
                    <div>$ {props.totalPrice}</div>
                </div>

                <div className='flexRow sb details'>
                    <div>Tax/Fees</div>
                    <div>$ {props.tax}</div>
                </div>

                <div className='flexRow sb details'>
                    <div>Delivery Charges</div>
                    <div>FREE</div>
                </div>

                <div className='flexRow sb details'>
                    <div>Total Amount</div>
                    <div>$ {props.finalPrice}</div>
                </div>

            </div>
        </Card>    
    
    );
}

export default PriceDetails
