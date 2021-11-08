import { createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'config/navigationConfig';
import englishContent from 'store/englishContent';

const slice = createSlice({
    name: 'ui',
    initialState: {
        sidebar: {
            menuItems: navigationConfig.headermenu
        },
        textContent: englishContent
    },
    reducers: {}
});

// export const {} = slice.actions;

export default slice.reducer;
