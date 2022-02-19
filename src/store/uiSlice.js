import { createSlice } from '@reduxjs/toolkit';

import { appInformation, englishContent, navigationConfig, socialLinks, spanishContent } from 'config';

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
        isPreferredThemeCheckTriggered: true,
        isThemeToggable: true,
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
        },

        setSpanishLanguage: (state, action) => {
            state.textContent = spanishContent;
            state.footerContent.menuItems = navigationConfig(spanishContent).footermenu;
            state.sidebar.menuItems = navigationConfig(spanishContent).headermenu;
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
    setEnglishLanguage,
    setSpanishLanguage
} = slice.actions;

export default slice.reducer;
