import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import { ExpandLess as ExpandLessIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        right: '30px',
        bottom: '40px',
        zIndex: 999,
        '& .back-to-top': {
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            textAlign: 'center',
            lineHeight: '37px',
            background: theme.palette.background.default,
            borderRadius: '50%',
            boxShadow: '0 10px 40px rgba(82, 85, 90, 0.2)',
            padding: 0,
            border: 'none',
            color: theme.palette.secondary.main,
            fontSize: '20px',
            transition: 'all 0.4s',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default
            },
            '&.show-back-to-top': {
                right: '30px',
                opacity: 1,
                visibility: 'visible'
            }
        }
    }
}));

function ScrollTopBtn() {
    const classes = useStyles();

    useEffect(() => {
        /* ======= Back to Top Button and Navbar Scrolling control ======= */
        const scrollToTopBtn = document.querySelector('.back-to-top');
        const rootElement = document.documentElement;

        function handleScroll() {
            // do something on scroll
            if (rootElement.scrollTop > 200) {
                //show button
                scrollToTopBtn.style.display = 'flex';
            } else {
                //hide button
                scrollToTopBtn.style.display = 'none';
            }
        }

        function scrollToTop() {
            //scroll to top logic
            rootElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        scrollToTopBtn.addEventListener('click', scrollToTop);
        document.addEventListener('scroll', handleScroll);
    });
    return (
        <div className={classes.root}>
            <div className="back-to-top show-back-to-top">
                <ExpandLessIcon />
            </div>
        </div>
    );
}

export default ScrollTopBtn;
