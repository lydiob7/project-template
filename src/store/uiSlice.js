import { createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'config/navigationConfig';

import appInformation from 'config/appInformation';
import englishContent from 'config/languages/englishContent';
import socialLinks from 'config/socialLinks';

const slice = createSlice({
    name: 'ui',
    initialState: {
        appInformation,
        footerContent: {
            socialLinks,
            menuItems: navigationConfig(englishContent).footermenu
        },
        headerSettings: {
            fixed: true
        },
        isPreferredThemeCheckTriggered: false,
        isThemeToggable: false,
        mantainanceMode: false,
        sidebar: {
            menuItems: navigationConfig(englishContent).headermenu
        },
        textContent: englishContent,
        theme: 'light'
    },
    reducers: {
        themeDark: (state, action) => {
            state.theme = 'dark';
        },

        themeLight: (state, action) => {
            state.theme = 'light';
        },

        setThemePreferredCheckOn: (state, action) => {
            state.isPreferredThemeCheckTriggered = true;
        },

        setThemePreferredCheckOff: (state, action) => {
            state.isPreferredThemeCheckTriggered = false;
        },

        setThemeToggableOn: (state, action) => {
            state.isThemeToggable = true;
        },

        setThemeToggableOff: (state, action) => {
            state.isThemeToggable = false;
        },

        mantainanceModeEnabled: (state, action) => {
            state.mantainanceMode = true;
        },

        mantainanceModeDisabled: (state, action) => {
            state.mantainanceMode = false;
        },

        setEnglishLanguage: (state, action) => {
            state.textContent = englishContent;
            state.footerContent.menuItems = navigationConfig(englishContent).footermenu;
            state.sidebar.menuItems = navigationConfig(englishContent).headermenu;
        }
    }
});

export const {
    themeDark,
    themeLight,
    setThemePreferredCheckOn,
    setThemePreferredCheckOff,
    setThemeToggableOn,
    setThemeToggableOff,
    mantainanceModeEnabled,
    mantainanceModeDisabled,
    setEnglishLanguage
} = slice.actions;

export default slice.reducer;
