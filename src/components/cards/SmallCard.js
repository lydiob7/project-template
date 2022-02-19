import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        textAlign: 'center',
        padding: '18px 20px 12px 20px',
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'capitalize',
        borderRadius: '8px',
        transition: 'all 0.3s',
        position: 'relative',
        [theme.breakpoints.up('xs')]: {
            width: '150px',
            margin: '0 5px 5px 5px'
        },
        '& .icon': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            lineHeight: '50px',
            textAlign: 'center',
            margin: '0 auto 10px auto',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
            fontSize: '24px',
            transition: 'all 0.3s',
            color: theme.palette.background.default
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            transform: 'translateY(-4px)',
            '& a': {
                color: '#fff'
            },
            '& .icon': {
                color: theme.palette.primary.main,
                backgroundColor: '#fff'
            }
        }
    }
}));

const SmallCard = (props) => {
    const classes = useStyles();

    const { icon, url, title } = props;

    return (
        <Paper component={Link} to={url} className={classes.root}>
            <div>
                {icon && <span className="icon">{icon}</span>}
                <Typography variant="body2">{title}</Typography>
            </div>
        </Paper>
    );
};

export default SmallCard;
