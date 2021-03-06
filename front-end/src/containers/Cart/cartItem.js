import React, { useState } from 'react'
import { generatePublicUrl } from '../../urlConfig'
import './cartItem.css'

const CartItem = (props) => {

    const {_id, name, price, img} = props.cartItem
    const [qty, setQty] = useState(props.cartItem.qty)

    const onQuantityIncrement = () => {
        setQty(qty + 1);
        props.onQuantityIncre(_id, qty + 1);
    }

    const onQuantityDecrement = () => {
        if(qty <= 1) return;

        setQty(qty - 1);
        props.onQuantityDecre(_id, qty - 1);
    }

    return (
        <div className='cartItemContainer'>
            <div className="flexRow">
                    <div className="cartProImgContainer">
                        <img src={generatePublicUrl(img)} alt={''} />
                    </div>
                    <div className="cartItemDetails">
                         <div>
                             <p>{name}</p>
                             <p>$. {price}</p>
                         </div>
                         <div>Delivery in 3-5 Days</div>
                    </div>
            </div>
            <div style={{display: 'flex', margin: '5px 0'}}>
                    <div className="quantityControl">
                        <button onClick={onQuantityDecrement}>-</button>
                        <input value={qty} readOnly />
                        <button onClick={onQuantityIncrement}>+</button>
                    </div>
                    <button className='cartActionBtn'>Save for Later</button>
                    <button className='cartActionBtn'>Remove</button>
            </div>
        </div>
    )
}

export default CartItem