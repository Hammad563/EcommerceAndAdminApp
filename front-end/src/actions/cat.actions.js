
import axios from '../helpers/axios';
import { CatConstants } from './constants';



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