import React from 'react'
import axios from '../helpers/axios';
import { CatConstants } from './constants';



export const addCategory = (form) => {
    return async dispatch => {
        dispatch({type: CatConstants.ADD_NEW_CAT_REQUEST});

        try{
                const res = await axios.post(`/category/create`, form);
                if(res.status === 201){
                dispatch({
                    type: CatConstants.ADD_NEW_CAT_SUCCESS,
                    payload: {category: res.data.category } 
                });
                }else {
                dispatch({
                    type: CatConstants.ADD_NEW_CAT_FAILURE,
                    payload: res.data.error
                });
            }
        }catch(error){
            console.log(error.response)
        }
    }
}



 
const getAllCategory = () => {

    return async dispatch => {
        dispatch({ type: CatConstants.GET_ALL_CAT_REQUEST});

        const res = await axios.get(`category/get`);
        console.log(res);
        if(res.status === 200){
            const { categoryList} = res.data;
            dispatch({
                type: CatConstants.GET_ALL_CAT_SUCCESS,
                payload: {categories: categoryList}
            });
        }else {
            dispatch({
                type: CatConstants.GET_ALL_CAT_FAILURE,
                payload: {error: res.data.error}
            });
        }
        
    }
}
export {getAllCategory}



export const updateCategory = (form) => {
    return async dispatch => {
                dispatch( {type: CatConstants.UPDATE_CAT_REQUEST});
        
                const res = await axios.post(`/category/update`, form);
                if(res.status === 201){
                    dispatch( {type: CatConstants.UPDATE_CAT_SUCCESS});
                    dispatch(getAllCategory());
                }else {
                   const {error} = res.data
                   dispatch( {type: CatConstants.UPDATE_CAT_FAILURE, payload: {error}  })
                }
    }
}


export const deleteCatAction = (ids) => {
    return async dispatch => {
        dispatch( {type: CatConstants.DELETE_CAT_REQUEST});
        const res = await axios.post(`/category/delete`, {
            payload: {
                ids
            }
        });
        if(res.status == 200){
            dispatch( {type: CatConstants.DELETE_CAT_SUCCESS});
            dispatch(getAllCategory());
        }
        else{

            dispatch({type: CatConstants.DELETE_CAT_FAILURE, payload: {error: res.data.error}})
        }
    }
}