import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '45px',
        height: '3px',
        borderRadius: '30px',
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        marginTop: '10px'
    }
}));

const TitleDecoration = ({ className, ...props }) => {
    const internalClasses = useStyles();
    return <div className={clsx(internalClasses.root, className)} {...props}></div>;
};

export default TitleDecoration;
