import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { languageChanged } from 'store/uiSlice';

const LanguageCheck = ({ children }) => {
    const { appSettings } = useSelector(({ ui }) => ui);

    useLayoutEffect(() => {
        if (appSettings?.isLanguageCheckTriggered) {
            const lang = navigator?.language?.split('-')[0];
            if (appSettings?.supportedLanguages.includes(lang)) languageChanged(lang);
            else languageChanged('default');
        }
    }, [appSettings?.isLanguageCheckTriggered, appSettings?.supportedLanguages]);

    return <>{children}</>;
};

export default LanguageCheck;
