import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2vh',
        '& .title': {
            textTransform: 'capitalize',
            marginBottom: 0,
            fontWeight: '700'
        },
        '& .sub-title': {
            marginTop: '15px',
            maxWidth: '700px',
            lineHeight: 'inherit'
        }
    }
}));

export default function Title({ title, subtitle }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Box>
                <Typography variant="h3" className="title">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body1" color="text-secondary" className="sub-title">
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </div>
    );
}
