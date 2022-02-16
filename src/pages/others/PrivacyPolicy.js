import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from 'components/common/Button';
import Title from 'components/headings/Title';
import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '60px',
        minHeight: '70vh',
        '& img': {
            width: '100%'
        }
    }
}));

const PrivacyPolicy = () => {
    const classes = useStyles();

    const textProvider = useSelector(({ ui }) => ui.textContent.privacyPolicy);

    return (
        <main className={classes.root}>
            <Container>
                <Grid container justifyContent="center">
                    <Grid container spacing={4} justifyContent="center" item xs={12} sm={6}>
                        <Grid item xs={12}>
                            <Title title={textProvider?.title} subtitle={textProvider.content} variant="h4" />
                        </Grid>
                        <Grid container justifyContent="center" item xs={12}>
                            <Link to={parsePath()}>
                                <Button>{textProvider?.actionButton}</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
};

export default PrivacyPolicy;
