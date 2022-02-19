import React from 'react';

import { makeStyles } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
}));

export default function Loader({ loading = true, ...rest }) {
    const classes = useStyles();

    if (!loading) return null;

    return (
        <div {...rest} className={classes.root}>
            <CircularProgress />
        </div>
    );
}
