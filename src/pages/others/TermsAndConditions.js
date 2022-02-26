import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container, Grid, makeStyles } from '@material-ui/core';

import { Button, Title } from 'custom-components';

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

const TermsAndConditions = () => {
    const classes = useStyles();

    const textProvider = useSelector(({ ui }) => ui.textContent.termsAndConditions);

    return (
        <Container component="main" className={classes.root}>
            <Grid container justifyContent="center">
                <Grid container spacing={4} justifyContent="center" item xs={12} sm={6}>
                    <Grid item xs={12}>
                        <Title title={textProvider?.title} subtitle={textProvider?.content} variant="h4" />
                    </Grid>
                    <Grid container justifyContent="center" item xs={12}>
                        <Link to={parsePath()}>
                            <Button>{textProvider?.actionButton}</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TermsAndConditions;
