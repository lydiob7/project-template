import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: theme.palette.text.primary,
        marginTop: '2vh',
        '& .title': {
            textTransform: 'capitalize',
            marginBottom: 0,
            fontWeight: '700',
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
                textAlign: 'left'
            }
        },
        '& .sub-title': {
            marginTop: '15px',
            maxWidth: '700px',
            lineHeight: 'inherit',
            textAlign: 'center',
            [theme.breakpoints.up('md')]: {
                textAlign: 'left'
            }
        }
    }
}));

export default function Title({ className, title, size, subtitle, subtitleSize, style }) {
    const classes = useStyles();
    return (
        <div className={className} style={style}>
            <div className={classes.root}>
                <Box>
                    <Typography variant={size === 'small' ? 'h4' : 'h3'} className="title">
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography
                            variant={subtitleSize === 'large' ? 'h6' : 'body1'}
                            color="textSecondary"
                            className="sub-title"
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>
            </div>
        </div>
    );
}
