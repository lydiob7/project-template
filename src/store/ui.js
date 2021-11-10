import { createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'config/navigationConfig';
import englishContent from 'store/englishContent';

const slice = createSlice({
    name: 'ui',
    initialState: {
        sidebar: {
            menuItems: navigationConfig.headermenu
        },
        appInformation: englishContent.general,
        textContent: englishContent.content,
        footerContent: {
            general: englishContent.footerdata,
            menuItems: navigationConfig.footermenu
        }
    },
    reducers: {}
});

// export const {} = slice.actions;

export default slice.reducer;
