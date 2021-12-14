import axiosInstance from "../helpers/axios"
import { CartConstants, userConstants } from "./constants";

export const getAddress = () => {
    return async dispatch => {
        try{
            const res = await axiosInstance.post(`/user/getaddress`);
            dispatch({type: userConstants.USER_REGISTER_REQUEST});
            if(res.status === 200) {
                const{userAddress:{address}} = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_SUCCESS,
                    payload: {address}
                });
            }
            else{
                const {error} = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: {error}
                });
            }
        }catch(error){
            console.log(error)
        }
    }
}

export const addAddress = (payload) => {
    return async dispatch =>{
        try{
                const res = await axiosInstance.post(`/user/address/create`, {payload});
                dispatch({type: userConstants.ADD_USER_ADDRESS_REQUEST});
                if(res.status === 201){
                    console.log(res);
                    const{address:{address}} = res.data;
                    dispatch({
                        type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                        payload: {address}
                    })
                }else{
                    const {error} = res.data;
                    dispatch({
                        type: userConstants.ADD_USER_ADDRESS_FAILURE,
                        payload: {error}
                    })
                }

        }catch(error){
            console.log(error)
        }
    }
}



export const addOrder = (payload) => {
    return async dispatch =>{
        try{
               const res = await axiosInstance.post(`/addOrder`,payload)
                dispatch({type: userConstants.ADD_USER_ORDER_REQUEST});
                if(res.status === 201){
                    console.log(res);  
                    const {order} = res.data;
                    dispatch({
                        type: CartConstants.RESET_CART
                    });
                    dispatch({
                        type: userConstants.ADD_USER_ORDER_SUCCESS,
                        payload: {order}
                    })     
                }else{
                    const {error} = res.data;
                    dispatch({
                        type: userConstants.ADD_USER_ORDER_FAILURE,
                        payload: {error}
                    })
                }

        }catch(error){
            console.log(error)
        }
    }
}

export const getOrder = () => {
    return async dispatch =>{
        try{
                const res = await axiosInstance.get(`/getOrder`);
                dispatch({type: userConstants.GET_USER_ORDER_REQUEST});
                if(res.status === 200){
                    console.log("res is",res);    
                    const {order} = res.data
                    dispatch({
                        type: userConstants.GET_USER_ORDER_SUCCESS,
                        payload: {order}
                    })
                }else{
                    const {error} = res.data;
                    dispatch({
                        type: userConstants.GET_USER_ORDER_FAILURE,
                        payload: {error}
                    })
                }

        }catch(error){
            console.log(error)
        }
    }
}


export const getOrderDetails = (payload) => {
    return async dispatch => {
        try{
            const res = await axiosInstance.post('/getOrderStatus', payload);
            dispatch({type: userConstants.GET_ORDER_DETAILS_REQUEST});
            if(res.status === 200){
                console.log(res);
                const{order} = res.data;
                dispatch({
                    type: userConstants.GET_ORDER_DETAILS_SUCCESS,
                    payload: {order}
                })
            }else{
                const {error} = res.data;
                dispatch({
                    type: userConstants.GET_ORDER_DETAILS_FAILURE,
                    payload: {error}
                })
            }
        }catch(error){
            console.log(error)
        }
    }
}

