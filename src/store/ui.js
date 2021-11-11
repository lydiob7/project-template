import { createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'config/navigationConfig';
import englishContent from 'store/englishContent';

const slice = createSlice({
    name: 'ui',
    initialState: {
        appInformation: englishContent.general,
        footerContent: {
            general: englishContent.footerdata,
            menuItems: navigationConfig.footermenu
        },
        sidebar: {
            menuItems: navigationConfig.headermenu
        },
        textContent: englishContent.content,
        theme: 'light'
    },
    reducers: {
        themeDark: (state, action) => {
            state.theme = 'dark';
        },

        themeLight: (state, action) => {
            state.theme = 'light';
        }
    }
});

export const { themeDark, themeLight } = slice.actions;

export default slice.reducer;
