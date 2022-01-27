import React from 'react';
import { useSelector } from 'react-redux';
import { parsePath } from 'utils/helpers';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '60px',
        minHeight: '100vh',
        '& img': {
            width: '100%'
        }
    },
    title: {
        fontSize: '1.5rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '3rem'
        }
    },
    content: {
        fontSize: '0.88rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1rem'
        }
    }
}));

function MantainancePage({ mantainanceimg = '/images/mantainance.svg' }) {
    const classes = useStyles();

    const appInformation = useSelector(({ ui }) => ui.appInformation);

    return (
        <main className={classes.root}>
            <Container>
                <Grid container justifyContent="center">
                    <Grid container spacing={4} justifyContent="center" item xs={12} sm={6}>
                        <Grid item xs={12}>
                            <img src={parsePath(mantainanceimg)} alt="Mantainance" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} variant="h3" color="textPrimary">
                                This site is under mantainance.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.content} variant="body1">
                                We are making some updates to bring you the best experience. Sorry for the
                                inconvenience, we'll be back very soon!
                                {/* You can check out our{' '}
                                    <Link to="/faq" className="color-text">
                                        Help Center
                                    </Link> */}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="center" item xs={12}>
                            <Button href={appInformation?.creatorWebsite}>Visit our Website</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}

export default MantainancePage;
