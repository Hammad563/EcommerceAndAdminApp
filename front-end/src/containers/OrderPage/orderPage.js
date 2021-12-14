import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions';
import Layout from '../../components/Layout/layout';
import Card from '../../components/UI/Card';
import {Link} from 'react-router-dom'
import { generatePublicUrl } from '../../urlConfig';
import './order.css'


const OrderPage = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect( () => {
        dispatch(getOrder());
    },[])
    console.log("user.order",user.order)

    return (
       <Layout>
           {
                  user.order.map( (order) => {
                      return order.items.map((item) => (
                        <Card>
                          <Link to={`/order_details/${order._id}`}>
                            <div className="orderItemContainer">
                              <div className="imgContainer">
                                <img
                                  src={generatePublicUrl(
                                    item.productId.productPicture[0].img
                                  )}
                                  alt=""
                                />
                              </div>
                              <div>{item.productId.name}</div>
                              <div className="pricee">{item.payablePrice}</div>
                              <div>{order.paymentStatus}</div>
                            </div>
                          </Link>
                        </Card>
                      ));
                  })
                      
               }
       </Layout>
    )
}

export default OrderPage;
