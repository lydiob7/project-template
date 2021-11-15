import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '45px',
        height: '4px',
        borderRadius: '30px',
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        marginTop: '10px',
        '&::after': {
            position: 'absolute',
            content: '""',
            bottom: 0,
            right: '13px',
            width: '5px',
            height: '5px',
            backgroundColor: theme.palette.background.default
        }
    }
}));

const TitleDecoration = ({ className, id, style }) => {
    const classes = useStyles();
    return (
        <div className={className} id={id} style={style}>
            <div className={classes.root}></div>
        </div>
    );
};

export default TitleDecoration;
