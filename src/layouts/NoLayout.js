import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Layouts
import Footer from 'components/common/footer/Footer';
import ScrollTopBtn from 'components/common/ScrollTopBtn';
import ToastMessage from 'components/common/ToastMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default
    }
}));

const NoLayout = ({ children, footer, scrollBtn }) => {
    const classes = useStyles();

    const showBtn = scrollBtn === undefined ? false : scrollBtn;
    const showFooter = footer === undefined ? false : footer;

    return (
        <div className={classes.root}>
            {children}
            {showBtn && <ScrollTopBtn />}
            {showFooter && <Footer />}
            <ToastMessage />
        </div>
    );
};

export default NoLayout;
