import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';

// Layouts
import { Footer, GeneralHeader, ScrollTopBtn, ToastMessage } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    headerFixed: {
        paddingTop: '130px',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '80px'
        }
    },
    pageWrapper: {
        minHeight: 'calc(90vh - 50px)'
    },
    root: {
        backgroundColor: theme.palette.background.default
    },
    skipAnchor: {
        position: 'absolute',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        padding: '5px 10px',
        zIndex: 9999,
        top: '3vh',
        transform: 'translateX(-120%)',
        transition: 'transform .3s ease-in-out',
        '&:focus': {
            border: `2px solid ${theme.palette.primary.main}`,
            transform: 'translateX(3vw)'
        }
    }
}));

const LayoutDefault = ({ children, footer, scrollBtn }) => {
    const internalClasses = useStyles();

    const headerFixed = useSelector(({ ui }) => ui.headerSettings.fixed);
    const textProvider = useSelector(({ ui }) => ui.textContent.general);

    const showBtn = scrollBtn === undefined ? true : scrollBtn;
    const showFooter = footer === undefined ? true : footer;

    return (
        <div className={internalClasses.root}>
            <HashLink className={internalClasses.skipAnchor} to="#main-wrapper">
                {textProvider?.skipNavigationAnchor}
            </HashLink>
            <GeneralHeader fixed={headerFixed} />
            <div
                id="main-wrapper"
                className={clsx(internalClasses.pageWrapper, headerFixed && internalClasses.headerFixed)}
            >
                {children}
            </div>
            {showBtn && <ScrollTopBtn />}
            {showFooter && <Footer />}
            <ToastMessage fixed={headerFixed} />
        </div>
    );
};

export default LayoutDefault;
