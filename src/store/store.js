import { configureStore } from '@reduxjs/toolkit'   //making store using redux
import authSlice from './authSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
});

export default store;