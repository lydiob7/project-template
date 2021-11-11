import React from 'react';
// Layouts
import GeneralHeader from 'components/headings/GeneralHeader';
import Footer from 'components/common/footer/Footer';
import ScrollTopBtn from 'components/common/ScrollTopBtn';

const LayoutDefault = ({ children, footer, scrollBtn }) => {
    const showBtn = scrollBtn === undefined ? true : scrollBtn;
    const showFooter = footer === undefined ? true : footer;

    return (
        <>
            <GeneralHeader />
            {children}
            {showBtn && <ScrollTopBtn />}
            {showFooter && <Footer />}
        </>
    );
};

export default LayoutDefault;
