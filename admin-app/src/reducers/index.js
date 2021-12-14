
import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import catReducer from './cat.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import pageReducer from './page.reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: catReducer,
    product: productReducer,
    order: orderReducer,
    page: pageReducer
})

export default rootReducer;