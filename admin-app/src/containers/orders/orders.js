import React, { useState } from "react";
import Card from "../../components/UI/Input/card";
import Layout from "../../components/Layout/Layout";
import "./orders.css";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions/order.actions";

const Orders = (props) => {

    const order = useSelector( state => state.order)
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    console.log(order);
  
    const updateOrderFunc = (orderId) => {
      const payload ={
        orderId,
        type
      };
      dispatch(updateOrder(payload))
    }

    const formatDate = (date) => {
      if(date) {
        const d = new Date(date);
        return `${d.getFullYear()} - ${d.getMonth() + 1} - ${d.getDate()}`
      }
    }

  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <Card headerLeft={orderItem._id} key={index}>
          <div className="orderInformation">
            <div>
              <div className="title">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value">{item.productId.name}</div>
              ))}
            </div>
          </div>
          {console.log("orderItem", orderItem)}
          <div>
            <span>Total Price</span>
            <span> {orderItem.totalAmount}</span>
          </div>

          <div>
            <span>Payment Type</span>
            <span> {orderItem.paymentType}</span>
          </div>

          <div>
            <span>Payment Status</span>
            <span> {orderItem.paymentStatus}</span>
          </div>

          <div className="container1">
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div className={`orderStatus ${status.isCompleted ? "active" : ""}`}>
                  <div className={`point ${status.isCompleted ? "active" : ""}`}></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}

            </div>

            <div className="select">
              <select onChange={(e) => setType(e.target.value)}>
                <option value=""> Select order status</option>
                {orderItem.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>

            <div className="confirm">
              <button onClick={() => updateOrderFunc(orderItem._id)}>
                confirm
              </button>
            </div>
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Orders;
