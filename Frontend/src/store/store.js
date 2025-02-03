import {configureStore} from '@reduxjs/toolkit'
import mediReducer from './slices/mediSlice'
const store=configureStore({
    reducer:{
        med:mediReducer
    }
})

export default store;