import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { languageChanged } from 'store/uiSlice';

const LanguageCheck = ({ children }) => {
    const dispatch = useDispatch();

    const { appSettings } = useSelector(({ ui }) => ui);

    useLayoutEffect(() => {
        if (appSettings?.isLanguageCheckTriggered) {
            const lang = navigator?.language?.split('-')[0];
            if (appSettings?.supportedLanguages.includes(lang)) dispatch(languageChanged(lang));
            else dispatch(languageChanged('default'));
        }
    }, [dispatch, appSettings?.isLanguageCheckTriggered, appSettings?.supportedLanguages]);

    return <>{children}</>;
};

export default LanguageCheck;
