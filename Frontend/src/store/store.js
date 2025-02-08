import {configureStore} from '@reduxjs/toolkit'
import mediReducer from './slices/mediSlice'
import authReducer from './slices/authSlice'
const store=configureStore({
    reducer:{
        med:mediReducer,
        auth:authReducer
    }
})

export default store;