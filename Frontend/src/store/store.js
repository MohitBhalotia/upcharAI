import {configureStore} from '@reduxjs/toolkit'
import mediReducer from './slices/mediSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
const store=configureStore({
    reducer:{
        med:mediReducer,
        auth:authReducer,
        cart:cartReducer
    }
})

export default store;