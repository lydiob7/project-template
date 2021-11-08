import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const slice = createSlice({
    name: 'custom-slice',
    initialState: {
        searchParams: {
            searchText: ''
        },
        list: [],
        current: null,
        loading: false,
        lastFetch: null
    },
    reducers: {
        dataRequested: (data, action) => {
            data.loading = true;
        },

        dataReceived: (data, action) => {
            data.list = action.payload;
            data.loading = false;
            data.lastFetch = Date.now();
        },

        dataRequestFailed: (data, action) => {
            data.loading = false;
        },

        setDataSearchText: (data, action) => {
            data.searchParams.searchText = action.payload;
        },

        clearSearchParams: (data, action) => {
            data.searchParams.searchText = '';
        }
    }
});

export const { dataReceived, dataRequestFailed, dataRequested, setDataSearchText, clearSearchParams } = slice.actions;

const url = '/data';

export const loadData = (dispatch, getState) => {
    return dispatch(
        apiCallBegan({
            apiId: 'main',
            url,
            onStart: dataRequested.type,
            onSuccess: dataReceived.type,
            onError: dataRequestFailed.type
        })
    );
};

export default slice.reducer;
