import React from 'react';
import { Link } from 'react-router-dom';

import { alpha } from '@material-ui/core/styles';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '200px',
        maxWidth: '260px',
        flexGrow: 1,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.3)}`,
        borderRadius: '5px',
        transition: 'all .3s ease',
        '& a': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.palette.text.primary
        },
        '&:hover': {
            transform: 'scale(1.04)',
            boxShadow: theme.shadows[1],
            '& a': {
                '&>div:nth-of-type(2)': {
                    backgroundColor: theme.palette.primary.main
                },
                '& .MuiSvgIcon-root': {
                    color: `${theme.palette.primary.dark}!important`
                }
            }
        }
    },
    icon: {
        '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main,
            fontSize: '2.5rem',
            transition: 'all .3s ease'
        }
    },
    title: {
        margin: '20px 0'
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '999px',
        padding: '2px 20px',
        transition: 'all .3s ease'
    }
}));

const SimpleCard = ({ title, btnText, icon, href }) => {
    const classes = useStyles();

    let Wrapper = ({ children }) => <div>{children}</div>;

    if (href) Wrapper = Link;

    return (
        <figure className={classes.root}>
            <figcaption>
                <Wrapper to={href}>
                    <div className={classes.icon}>{icon}</div>

                    <Typography className={classes.title} variant="body1">
                        {title}
                    </Typography>
                    {btnText && <div className={classes.btn}>{btnText}</div>}
                </Wrapper>
            </figcaption>
        </figure>
    );
};

export default SimpleCard;
