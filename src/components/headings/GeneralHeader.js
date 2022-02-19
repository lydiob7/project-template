import React from 'react';
import { useSelector } from 'react-redux';

import { Grid, makeStyles, Paper } from '@material-ui/core';

import { Logo, Navbar } from 'custom-components';

import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '80px',
        zIndex: '1199',
        minWidth: '100vw',
        padding: '0 5vw'
    },
    logo: {
        justifyContent: 'center',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-start'
        }
    },
    navbar: {
        position: 'absolute',
        [theme.breakpoints.up('lg')]: {
            position: 'relative',
            justifyContent: 'flex-end'
        }
    }
}));

export default function GeneralHeader() {
    const classes = useStyles();
    const menuItems = useSelector(({ ui }) => ui.sidebar.menuItems);
    const appInformation = useSelector(({ ui }) => ui.appInformation);

    return (
        <Paper component={Grid} container className={classes.root}>
            <Grid container className={classes.logo} item xs={12} lg={6}>
                <Logo
                    style={{ transform: 'translateX(5vw)' }}
                    title={appInformation?.appTitle}
                    imageSrc={parsePath(appInformation?.appLogo)}
                />
            </Grid>
            <Grid className={classes.navbar} item container lg={6} alignItems="center">
                <Navbar appTitle={appInformation?.appTitle} menuItems={menuItems} />
            </Grid>
        </Paper>
    );
}
