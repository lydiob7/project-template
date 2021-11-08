import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '140px',
        position: 'relative',
        zIndex: '1199',
        '& a': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& img': {
                width: '30px',
                height: '30px'
            },
            '& h2': {
                display: 'inline',
                color: theme.palette.background.default,
                marginLeft: '10px'
            }
        }
    }
}));

export default function Logo({ imageSrc, className, title }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Link to={process.env.PUBLIC_URL} className={className}>
                <img src={imageSrc} alt={`${title} Logo`} />
                &nbsp;<h2>{title}</h2>
            </Link>
        </div>
    );
}
