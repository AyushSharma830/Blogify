//this slice is used to check if the user is authenticated or not. So we will check that from store using reducers.
import { createSlice } from '@reduxjs/toolkit'      //as createSlice is provided by redux-toolkit

//initial state of the store
const initialState = {
    status: false,
    userData: null
}

export const authSlice = createSlice({          //an object is passed in createSLice so we ky, value pairs
    name: "auth",   // name of the state
    initialState,
    reducers: {     //reducers that can make changes in store and the value of the reducers key is an object again
        login: (state, action) => {    //value of login key is a function; state is used to access the current store and action.payload contains the parameter paased while calling these reducers
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;      //all reducers must be exported inidividually as any of them can be required in any component

export default authSlice.reducer;   //not reducers