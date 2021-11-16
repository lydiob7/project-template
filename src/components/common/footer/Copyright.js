import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        padding: '10px 0',
        [theme.breakpoints.up('lg')]: {
            textAlign: 'left'
        },
        '& .MuiTypography-body2': {
            color: theme.palette.text.secondary,
            fontWeight: '500'
        }
    }
}));

function Copyright({ rightsOwner, rightsOwnerWebsite, version, year }) {
    const classes = useStyles();
    const lastYearWithRights = year ? year : new Date().getFullYear();

    return (
        <Grid item lg={12} className={classes.root}>
            <Typography variant="body2">
                &copy; All rights reserved.{' '}
                <a style={{ color: 'inherit' }} target="_blank" rel="noreferrer" href={rightsOwnerWebsite}>
                    {rightsOwner}
                </a>{' '}
                {lastYearWithRights}. {version && `v${version}`}
            </Typography>
        </Grid>
    );
}

export default Copyright;
