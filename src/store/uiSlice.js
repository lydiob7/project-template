import { createSlice } from '@reduxjs/toolkit';

import { appInformation, navigationConfig, socialLinks, supportedLanguages } from 'config';

const slice = createSlice({
    name: 'ui',
    initialState: {
        appInformation,
        appSettings: {
            currentLanguage: 'es',
            isLanguageCheckTriggered: true,
            isPreferredThemeCheckTriggered: true,
            isLanguageToggable: true,
            isThemeToggable: true,
            mantainanceMode: false,
            supportedLanguages: Object.keys(supportedLanguages).slice(0, -1),
            theme: 'light'
        },
        footer: {
            isMenuItemsListVisible: true,
            isSocialLinksListVisible: true,
            isVisible: true,
            menuItems: navigationConfig(supportedLanguages['default']).footermenu,
            socialLinks
        },
        headerSettings: {
            fixed: true
        },
        sidebar: {
            menuItems: navigationConfig(supportedLanguages['default']).headermenu
        },
        textContent: supportedLanguages['default']
    },
    reducers: {
        themeDark: (state, action) => {
            state.appSettings.theme = 'dark';
        },

        themeLight: (state, action) => {
            state.appSettings.theme = 'light';
        },

        setThemePreferredCheckOn: (state, action) => {
            state.appSettings.isPreferredThemeCheckTriggered = true;
        },

        setThemePreferredCheckOff: (state, action) => {
            state.appSettings.isPreferredThemeCheckTriggered = false;
        },

        setThemeToggableOn: (state, action) => {
            state.appSettings.isThemeToggable = true;
        },

        setThemeToggableOff: (state, action) => {
            state.appSettings.isThemeToggable = false;
        },

        mantainanceModeEnabled: (state, action) => {
            state.appSettings.mantainanceMode = true;
        },

        mantainanceModeDisabled: (state, action) => {
            state.appSettings.mantainanceMode = false;
        },

        languageChanged: (state, action) => {
            state.appSettings.currentLanguage = action.payload;
            state.textContent = supportedLanguages[action.payload] || supportedLanguages['default'];
            state.footer.menuItems = navigationConfig(
                supportedLanguages[action.payload] || supportedLanguages['default']
            ).footermenu;
            state.sidebar.menuItems = navigationConfig(
                supportedLanguages[action.payload] || supportedLanguages['default']
            ).headermenu;
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
    languageChanged,
    mantainanceModeEnabled,
    mantainanceModeDisabled
} = slice.actions;

export default slice.reducer;
