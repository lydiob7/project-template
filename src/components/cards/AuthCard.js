import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles, Paper, Typography } from '@material-ui/core';

import ForgotPassword from 'pages/account/ForgotPassword';
import { LoginForm, SignupForm, TitleDecoration } from 'custom-components';

import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '40px 8%'
    },
    titleWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '32px',
        '& img': {
            height: '40px',
            marginRight: '16px'
        }
    },
    linkText: {
        marginTop: '16px',
        textAlign: 'center',
        '& a': {
            color: theme.palette.primary.main
        }
    },
    linkTextWrapper: {
        margin: '2rem 0'
    }
}));

const AuthCard = ({ form = 'login', onSubmit = () => {} }) => {
    const classes = useStyles();

    const appInformation = useSelector(({ ui }) => ui.appInformation);
    const textProvider = useSelector(({ ui }) => ui.textContent.landingPage.authCard);

    return (
        <Paper className={classes.root}>
            <div className={classes.titleWrapper}>
                {appInformation?.appLogo && (
                    <img src={parsePath(appInformation?.appLogo)} alt={appInformation?.appTitle} />
                )}
                <div>
                    {form === 'forgot-pwd' && (
                        <Typography variant="h3" className="fs-500">
                            {textProvider.forgotPwdTitle}
                        </Typography>
                    )}
                    {form === 'login' && (
                        <Typography variant="h3" className="fs-500">
                            {textProvider.loginTitle}
                        </Typography>
                    )}
                    {form === 'signup' && (
                        <Typography variant="h3" className="fs-500">
                            {textProvider.registerTitle}
                        </Typography>
                    )}
                    <TitleDecoration />
                </div>
            </div>
            {form === 'forgot-pwd' && (
                <>
                    <ForgotPassword onSubmit={onSubmit} />
                    <Typography className={classes.linkText} variant="body1">
                        <Link to={parsePath('/login')}>{textProvider.goBackToLoginLink}</Link>
                    </Typography>
                </>
            )}
            {form === 'signup' && (
                <>
                    <SignupForm onSubmit={onSubmit} />
                    <Typography className={classes.linkText} variant="body1">
                        {textProvider.alreadyHaveAccountText}&nbsp;&nbsp;&nbsp;
                        <Link to={parsePath('/login')}>{textProvider.alreadyHaveAccountLink}</Link>
                    </Typography>
                </>
            )}
            {form === 'login' && (
                <>
                    <LoginForm onSubmit={onSubmit} />
                    <div className={classes.linkTextWrapper}>
                        <Typography className={classes.linkText} variant="body1">
                            {textProvider.forgotPwdText}&nbsp;&nbsp;&nbsp;
                            <Link to={parsePath('/forgot-password')}>{textProvider.forgotPwdLink}</Link>
                        </Typography>
                    </div>
                    <Typography className={classes.linkText} variant="body1">
                        {textProvider.dontHaveAccountText}&nbsp;&nbsp;&nbsp;
                        <Link to={parsePath('/register')}>{textProvider.dontHaveAccountLink}</Link>
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default AuthCard;
