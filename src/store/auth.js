import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        user: null
    },
    reducers: {}
});

export default slice.reducer;
