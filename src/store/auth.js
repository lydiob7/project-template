import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authenticated: false,
    user: {
        role: [],
        data: {
            displayName: 'User',
            email: 'user@email.com'
        },
        language: 'EN'
    }
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => (state.user = action.payload),
        userLoggedOut: (state, action) => initialState
    }
});

export const { setUser, userLoggedOut } = slice.actions;

export default slice.reducer;
