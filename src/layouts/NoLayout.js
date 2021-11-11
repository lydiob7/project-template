import React from 'react';
// Layouts
import Footer from 'components/common/footer/Footer';
import ScrollTopBtn from 'components/common/ScrollTopBtn';

const NoLayout = ({ children, footer, scrollBtn }) => {
    const showBtn = scrollBtn === undefined ? false : scrollBtn;
    const showFooter = footer === undefined ? false : footer;

    return (
        <>
            {children}
            {showBtn && <ScrollTopBtn />}
            {showFooter && <Footer />}
        </>
    );
};

export default NoLayout;
