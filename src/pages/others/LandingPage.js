import React, { useEffect } from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Grid, makeStyles, Typography } from '@material-ui/core';

import { AuthCard } from 'custom-components';
import MailConfirmPage from 'pages/account/MailConfirmPage';

import { defaultRedirects } from 'config/routesConfig';

const useStyles = makeStyles((theme) => ({
    description: {},
    pageTitle: {
        textAlign: 'center',
        marginBottom: '8vh',
        fontWeight: 800
    },
    step: {
        display: 'flex',
        margin: '1rem 0'
    },
    stepLogo: {
        width: '50px',
        height: '50px',
        flexShrink: 0,
        marginRight: '2rem',
        '& img': {
            width: '100%'
        }
    },
    title: {
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '2rem',
        marginTop: '35px'
    },
    wrapper: {
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignContent: 'center',
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    }
}));

const LandingPage = ({ history, form = 'signup', onSubmit = () => {} }) => {
    const classes = useStyles();

    const { appInformation } = useSelector(({ ui }) => ui);
    const { authenticated, data } = useSelector(({ auth }) => auth.user);
    const content = useSelector(({ ui }) => ui.textContent.authPage);

    useEffect(() => {
        if (authenticated) history.push(defaultRedirects[data?.role] || defaultRedirects.default);
    }, [history, authenticated, data?.role]);

    return (
        <Container component="main" maxWidth="lg" style={{ minHeight: '100vh', padding: '5vh 0' }}>
            <Grid item xs={12}>
                <Typography className={clsx(classes.pageTitle, 'fs-800')} variant="h2">
                    {appInformation?.appTitle}
                </Typography>
            </Grid>
            <Grid className={classes.wrapper} container spacing={4}>
                <Grid component="aside" container item xs={10} sm={8} lg={5}>
                    <Grid item xs={12}>
                        <Typography className={clsx(classes.title, 'fs-400')} variant="h3">
                            {content?.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.description} variant="body1">
                            {content?.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={false} lg={1}></Grid>
                <Grid item xs={10} sm={8} lg={5}>
                    {form === 'login' && <AuthCard form={form} onSubmit={onSubmit} />}
                    {form === 'signup' && <AuthCard form={form} onSubmit={onSubmit} />}
                    {form === 'forgot-pwd' && <AuthCard form={form} onSubmit={onSubmit} />}
                    {form === 'mail-confirmation' && <MailConfirmPage onSubmit={onSubmit} />}
                </Grid>
            </Grid>
        </Container>
    );
};

export default withRouter(LandingPage);
