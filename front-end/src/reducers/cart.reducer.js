import { CartConstants } from "../actions/constants";

const initState = {
        cartItems: {

        },
        updatingCart: false,
        error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case CartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart:true
            }
            break;
        case CartConstants.ADD_TO_CART_SUCCESS:
            state= {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case CartConstants.ADD_TO_CART_FAILURE:
            state= {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case CartConstants.RESET_CART:
            state= {
                ...initState
            }
            break;
    }
    return state;
}