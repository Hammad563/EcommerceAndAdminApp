import { ProductConstants } from "../actions/constants"


const initState = {
    products: [],
    productsByPrice: {
        greater600: [],
        allProducts: []
    },
    pageRequest: false,
    page: {},
    error: null,
    productDetails: [],
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
      case ProductConstants.GET_PRODUCTS_SUCCESS:
        state = {
          ...state,
          products: action.payload.products,
          productsByPrice: {
            ...action.payload.productsByPrice,
          },
        };
        break;
        // -----
      case ProductConstants.GET_PAGE_REQUEST:
        state = {
          ...state,
          pageRequest: true
        };
        break;
        case ProductConstants.GET_PAGE_SUCCESS:
        state = {
          ...state,
          page: action.payload.page,
          pageRequest: false
        };
        break;
        case ProductConstants.GET_PAGE_FAILURE:
        state = {
          ...state,
            pageRequest: false,
            error: action.payload.error
        };
        break;

        // -----
        case ProductConstants.GET_PRODUCT_DETAILS_REQUEST:
        state = {
          ...state,
            loading: true
        };
        break;
        case ProductConstants.GET_PRODUCT_DETAILS_SUCCESS:
        state = {
          ...state,
            loading: false,
            productDetails: action.payload.productDetails
        };
        break;
        case ProductConstants.GET_PRODUCT_DETAILS_FAILURE:
        state = {
          ...state,
            loading: false,
            error: action.payload.error
        };
        break;

    }

    return state;
}