import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid rgba(128, 137, 150, 0.2)',
        padding: '40px 30px 50px 30px',
        borderRadius: '4px'
    }
}));

function WidgetWrapper({ children }) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>{children}</div>
        </>
    );
}

export default WidgetWrapper;
