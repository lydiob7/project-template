import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
import Grid from '@material-ui/core/Grid';
import Logo from './Logo';
import logosrc from '../../assets/images/ss-web-36.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        minHeight: '80px',
        zIndex: '1199',
        minWidth: '100vw',
        padding: '0 5vw',
        '&::after': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            opacity: 0.9,
            backgroundColor: theme.palette.secondary.main
        }
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
    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.logo} item xs={12} lg={6}>
                <Logo style={{ transform: 'translateX(5vw)' }} imageSrc={logosrc} title="Top3" />
            </Grid>
            <Grid className={classes.navbar} item container lg={6} alignItems="center">
                <Navbar appTitle="Top3" menuItems={menuItems} />
            </Grid>
        </Grid>
    );
}
