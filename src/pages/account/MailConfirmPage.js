import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { showMessage } from 'store/messageSlice';

import { Card, CardContent, Icon, makeStyles, Typography } from '@material-ui/core';

import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    bold: {
        margin: '1.4rem 0'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    },
    icon: {
        fontSize: '3rem'
    },
    linkText: {
        marginTop: '16px',
        textAlign: 'center',
        '& a, span': {
            color: theme.palette.primary.main,
            cursor: 'pointer'
        }
    },
    resendLink: {
        color: theme.palette.primary.main,
        cursor: 'pointer'
    },
    root: {}
}));

function MailConfirmPage({ history, onSubmit: handleSubmit = () => {} }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const textProvider = useSelector(({ ui }) => ui.textContent.landingPage.authCard.mailConfirmationMessage);

    async function onSubmit() {
        const response = await handleSubmit({
            email: history?.location?.state ? history?.location?.state[0]?.email : ''
        });
        if (response?.status === 'done')
            dispatch(showMessage({ message: textProvider.mailResentMessage, variant: 'success' }));
    }

    const yourEmailDefault = textProvider.yourEmailDefault;

    return (
        <div className={clsx(classes.root)}>
            <Card>
                <CardContent className={classes.cardContent}>
                    <div className="m-32">
                        <Icon className={classes.icon} color="action">
                            email
                        </Icon>
                    </div>

                    <Typography variant="h3" className={clsx(classes.bold, 'fs-200 fw-600')}>
                        {textProvider.title}
                    </Typography>

                    <Typography className="fs-200 text-center" color="textSecondary">
                        {textProvider.sentLinkTo}{' '}
                        <b>{(history?.location?.state && history?.location?.state[0]?.email) || yourEmailDefault}</b>.
                    </Typography>

                    <Typography className="fs-200 text-center" color="textSecondary">
                        {textProvider.checkInbox}
                    </Typography>

                    <Typography className={classes.linkText} variant="body1">
                        {textProvider.didntReceiveEmailText}&nbsp;&nbsp;&nbsp;
                        <span onClick={onSubmit}>{textProvider.didntReceiveEmailLink}</span>
                    </Typography>

                    <Typography className={classes.linkText} variant="body1">
                        <Link to={parsePath('/login')}>{textProvider.goBackToLoginLink}</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default withRouter(MailConfirmPage);
