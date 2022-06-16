import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// STATE
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// METHODS
// Register new user
export const register = createAsyncThunk(
    // we can call the following whatever we want
    'auth/register',
    async (user, thunkAPI) => {
        // log user data
        console.log(user)
    }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    console.log(user)
})

// STATE NAME REFERENCE
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
})

export default authSlice.reducer
