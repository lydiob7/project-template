import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Layouts
import GeneralHeader from 'components/headings/GeneralHeader';
import Footer from 'components/common/footer/Footer';
import ScrollTopBtn from 'components/common/ScrollTopBtn';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default
    }
}));

const LayoutDefault = ({ children, footer, scrollBtn }) => {
    const classes = useStyles();

    const showBtn = scrollBtn === undefined ? true : scrollBtn;
    const showFooter = footer === undefined ? true : footer;

    return (
        <div className={classes.root}>
            <GeneralHeader />
            {children}
            {showBtn && <ScrollTopBtn />}
            {showFooter && <Footer />}
        </div>
    );
};

export default LayoutDefault;
