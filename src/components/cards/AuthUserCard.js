import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Avatar, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8)
    },
    link: {
        margin: '10px 0',
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    },
    userName: {
        fontWeight: '600',
        margin: '10px 0'
    }
}));

const AuthUserCard = ({ items }) => {
    const classes = useStyles();
    const user = useSelector(({ auth }) => auth.user.data);

    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar} src={user.photoURL} alt={user.firstName} />
            <Typography className={classes.userName} color="textPrimary" variant="body1">
                {user.displayName}
            </Typography>
            <Typography color="textSecondary" variant="body2">
                {user.email}
            </Typography>
            {items?.map((item, index) => (
                <Link className={classes.link} key={index} to={item.path}>
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default AuthUserCard;
