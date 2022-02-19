import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';

import { Button } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        padding: '10px 0',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-end'
        },
        '& .MuiButton-textPrimary': {
            color: theme.palette.text.secondary
        }
    }
}));

function CopyrightMenu({ menus }) {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container item alignItems="center">
            {menus?.map((link, index) => {
                return (
                    <Link to={link.path} key={index}>
                        <Button variant="text">{link.title}</Button>
                    </Link>
                );
            })}
        </Grid>
    );
}

export default CopyrightMenu;
