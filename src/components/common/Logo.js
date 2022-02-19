import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';

import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '250px',
        position: 'relative',
        zIndex: '1199',
        '& a': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            '& img': {
                width: '30px',
                height: '30px'
            },
            '& h2': {
                display: 'inline',
                color: theme.palette.text.primary,
                marginLeft: '10px'
            }
        }
    }
}));

export default function Logo({ imageSrc, className, title }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Link to={parsePath()} className={className}>
                {imageSrc && <img src={imageSrc} alt={`${title} Logo`} />}
                &nbsp;<h2>{title}</h2>
            </Link>
        </div>
    );
}
