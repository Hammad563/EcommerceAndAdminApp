import catReducer from './cat.reducer';
import productReducer from './product.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
     category: catReducer,
     product: productReducer,
     auth: authReducer,
     cart: cartReducer,
     user: userReducer
})

export default rootReducer;