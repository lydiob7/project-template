import React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

const SimpleCard = ({ title, btnText, icon, img, href }) => {
    const classes = useStyles();

    return (
        <Grid container justifyContent="center" item xs={12} sm={6} md={4} lg={3}>
            <figure className={classes.root}>
                <figcaption>
                    <Link to={href}>
                        <div className={classes.icon}>{icon}</div>

                        <Typography className={classes.title} variant="body1">
                            {title}
                        </Typography>
                        <div className={classes.btn}>{btnText}</div>
                    </Link>
                </figcaption>
            </figure>
        </Grid>
    );
};

export default SimpleCard;
