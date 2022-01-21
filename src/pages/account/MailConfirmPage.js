import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { showMessage } from 'store/messageSlice';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    bold: {
        fontWeight: '600',
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
    root: {},
    typography: {
        fontSize: '1.2rem',
        textAlign: 'center'
    }
}));

function MailConfirmPage({ history, onSubmit: handleSubmit = () => {} }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    async function onSubmit() {
        const response = await handleSubmit({
            email: history?.location?.state ? history?.location?.state[0]?.email : ''
        });
        if (response?.status === 'done')
            dispatch(showMessage({ message: 'The E-mail has been re-sent', variant: 'success' }));
    }

    return (
        <div className={clsx(classes.root)}>
            <Card>
                <CardContent className={classes.cardContent}>
                    <div className="m-32">
                        <Icon className={classes.icon} color="action">
                            email
                        </Icon>
                    </div>

                    <Typography variant="h5" className={clsx(classes.typography, classes.bold)}>
                        We sent you an E-mail!
                    </Typography>

                    <Typography className={clsx(classes.typography)} color="textSecondary">
                        We have sent a link to{' '}
                        <b>{(history?.location?.state && history?.location?.state[0]?.email) || 'your E-mail'}</b>.
                    </Typography>

                    <Typography className={clsx(classes.typography)} color="textSecondary">
                        Check your inbox and click on the "Reset password" link to update your credentials.
                    </Typography>

                    <Typography className={classes.linkText} variant="body1">
                        Didn't receive the E-mail?&nbsp;&nbsp;&nbsp;<span onClick={onSubmit}>Re-send</span>
                    </Typography>

                    <Typography className={classes.linkText} variant="body1">
                        <Link to={parsePath('/login')}>Go back to Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default withRouter(MailConfirmPage);
