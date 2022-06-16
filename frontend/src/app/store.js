import { configureStore } from '@reduxjs/toolkit'
// we need to bring here any reducer we create
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})
