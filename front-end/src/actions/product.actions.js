import axiosInstance from "../helpers/axios"
import { ProductConstants } from "./constants";


export const getProducts = (slug) => {
    return async dispatch => {
        const res = await axiosInstance.get(`/products/${slug}`);
        
        if(res.status === 200) {
            dispatch({
                type: ProductConstants.GET_PRODUCTS_SUCCESS,
                payload: res.data
            });
        }
        else{
            
        }

    }
}

export const getProductPage = (payload) => {

    return async dispatch => {

        const {cid, type} = payload.params;
        const res = await axiosInstance.get(`/page/${cid}/${type}`);
        console.log(res)
        dispatch({type: ProductConstants.GET_PAGE_REQUEST})

        if(res.status === 200) {
            const {page} = res.data;
           dispatch({
               type: ProductConstants.GET_PAGE_SUCCESS,
               payload: {page}
           });
        }
        else{
            const{error} = res.data;
            dispatch({
               type: ProductConstants.GET_PAGE_FAILURE,
                payload: {error}
            })
        }

    }
}


export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: ProductConstants.GET_PRODUCT_DETAILS_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axiosInstance.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: ProductConstants.GET_PRODUCT_DETAILS_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);

            dispatch({
                type: ProductConstants.GET_PRODUCT_DETAILS_FAILURE,
                payload: { error }
            });
        }

    }
}