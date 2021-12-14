import { userConstants } from "../actions/constants"


const initState = {
    address: [],
    order: [],
    orderDetails: [],
    error: null,
    loading: false,
    orderLoading: false,
}

export default (state= initState, action) => {
    switch (action.type) {
      case userConstants.GET_USER_ADDRESS_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case userConstants.GET_USER_ADDRESS_SUCCESS:
        state = {
          ...state,
          address: action.payload.address,
          loading: false,
        };
        break;
      case userConstants.GET_USER_ADDRESS_FAILURE:
        state = {
          ...state,
          loading: false,
          error: action.payload.error,
        };
        break;

      case userConstants.ADD_USER_ADDRESS_REQUEST:
        state = {
          ...state,
          loading: true,
        };
        break;
      case userConstants.ADD_USER_ADDRESS_SUCCESS:
        state = {
          ...state,
          loading: false,
          address: action.payload.address,
        };
        break;
      case userConstants.ADD_USER_ADDRESS_FAILURE:
        state = {
          ...state,
          loading: false,
          error: action.payload.error,
        };
        break;

      case userConstants.GET_USER_ORDER_REQUEST:
        state = {
          ...state,
          orderLoading: true,
        };
        break;
      case userConstants.GET_USER_ORDER_SUCCESS:
        state = {
          ...state,
          order: action.payload.order,
          orderLoading: false
        };
        break;
      case userConstants.GET_USER_ORDER_FAILURE:
        state = {
          ...state,
            orderLoading: false,
            error: action.payload.error
        };
        break;
      case userConstants.GET_ORDER_DETAILS_REQUEST:
       break;
       case userConstants.GET_ORDER_DETAILS_SUCCESS:
         state= {
           ...state,
           orderDetails: action.payload.order
         }
         break;
        case userConstants.GET_ORDER_DETAILS_FAILURE:
          break;
  
    }
    return state;
}