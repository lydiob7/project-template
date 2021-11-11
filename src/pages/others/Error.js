import React from 'react';
import { Link } from 'react-router-dom';
import { parsePath } from 'utils/helpers';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        paddingTop: '140px',
        '& img': {
            width: '100%'
        }
    }
}));

function Error({ errorimg = '/images/404.svg' }) {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <section>
                <Container>
                    <Grid container justifyContent="center">
                        <Grid container spacing={4} justifyContent="center" item xs={6}>
                            <Grid item xs={12}>
                                <img src={parsePath(errorimg)} alt="error" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h3" color="textPrimary">
                                    Oops! Page not found.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    The page you are looking for might have been removed, had its name changed, or is
                                    temporarily unavailable.
                                    {/* You can check out our{' '}
                                    <Link to="/faq" className="color-text">
                                        Help Center
                                    </Link> */}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center" item xs={12}>
                                <Link to={parsePath()}>
                                    <Button>Back to Home</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </main>
    );
}

export default Error;
