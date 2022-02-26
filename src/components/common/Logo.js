import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles, Typography } from '@material-ui/core';

import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    appTitle: {
        display: 'inline',
        color: theme.palette.text.primary,
        marginLeft: '10px',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.3rem'
        }
    },
    root: {
        maxWidth: '350px',
        position: 'relative',
        zIndex: '1199',
        '& a': {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            '& img': {
                width: '30px',
                height: '30px'
            }
        },
        [theme.breakpoints.up('md')]: {}
    }
}));

export default function Logo({ imageSrc, className, style, title }) {
    const internalClasses = useStyles();

    return (
        <div className={clsx(internalClasses.root, className)} style={style}>
            <Link to={parsePath()}>
                {imageSrc && <img src={imageSrc} alt={`${title} Logo`} />}
                &nbsp;
                <Typography className={clsx(internalClasses.appTitle, 'fs-500 fw-600')} variant="h1">
                    {title}
                </Typography>
            </Link>
        </div>
    );
}
