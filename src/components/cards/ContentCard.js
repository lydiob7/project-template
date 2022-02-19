import React from 'react';

import { AppBar, Card, CardContent, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? '#DADADA' : '#121212',
        color: theme.palette.type === 'light' ? '#333333' : '#DADADA'
    },
    root: {
        width: '100%',
        marginBottom: '32px',
        borderRadius: '8px',
        boxShadow: theme.shadows[1]
    }
}));

const ContentCard = ({ children, className, style, title }) => {
    const classes = useStyles();

    return (
        <div className={className} style={style}>
            <Grid item component={Card} xs={12} className={classes.root}>
                <AppBar className={classes.cardHeader} position="static" elevation={0}>
                    <Toolbar>
                        <Typography variant="subtitle1" color="inherit" className="flex-1 px-12 font-medium">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <CardContent>{children}</CardContent>
            </Grid>
        </div>
    );
};

export default ContentCard;
