import { CatConstants, InitalConstants, orderConstants, productConstants } from "./constants";
import axios from '../helpers/axios';

export const getInitialData = () => {
    return async dispatch => {
    
        const res = await axios.post(`/initialdata`)
        if(res.status === 200) {
            const{categories, products, orders} = res.data;
            dispatch({
                type: CatConstants.GET_ALL_CAT_SUCCESS,
                payload: {categories}
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {products}
            })

            dispatch({
                type: orderConstants.GET_ORDER_SUCCESS,
                payload: {orders}
            })
        } 
        console.log(res)
    }
}