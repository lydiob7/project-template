import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { setEnglishLanguage, setSpanishLanguage } from 'store/uiSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        padding: '10px 0',
        [theme.breakpoints.up('lg')]: {
            textAlign: 'left'
        },
        '& .MuiTypography-body2': {
            color: theme.palette.text.secondary,
            fontWeight: '500'
        }
    }
}));

function Copyright({ rightsOwner, rightsOwnerWebsite, version, year }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lastYearWithRights = year ? year : new Date().getFullYear();

    const textProvider = useSelector(({ ui }) => ui.textContent.footer);

    return (
        <Grid item lg={12} className={classes.root}>
            <Typography variant="body2">
                <a style={{ color: 'inherit' }} target="_blank" rel="noreferrer" href={rightsOwnerWebsite}>
                    {rightsOwner}
                </a>{' '}
                <span onClick={() => dispatch(setEnglishLanguage())}>&copy;</span>{' '}
                <span onClick={() => dispatch(setSpanishLanguage())}>{lastYearWithRights}.</span>{' '}
                {textProvider?.copyright}. {version && `v${version}`}
            </Typography>
        </Grid>
    );
}

export default Copyright;
