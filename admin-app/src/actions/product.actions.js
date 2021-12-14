import axios from '../helpers/axios';



export const AddProduct = (form) => {
    return async dispatch => {
        const res = await axios.post(`product/create`,form);
        console.log(res);
    }
}