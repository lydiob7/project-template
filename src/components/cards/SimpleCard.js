import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .category-item': {
            marginBottom: '10px',
            display: 'block',
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.background.default,
            padding: '18px 12px 12px 12px',
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'capitalize',
            textAlign: 'center',
            borderRadius: '8px',
            transition: 'all 0.3s',
            position: 'relative',
            [theme.breakpoints.up('sm')]: {
                marginBottom: '10px'
            },
            [theme.breakpoints.up('md')]: {
                display: 'block'
            },
            [theme.breakpoints.up('lg')]: {
                margin: '0 5px 5px 5px'
            },
            '& a': {
                color: theme.palette.secondary.main,
                transition: 'all 0.3s'
            },
            '& .cat-svg': {
                fill: theme.palette.secondary.main,
                width: '50px',
                transition: 'all 0.3s'
            },
            '&:hover': {
                transform: 'translateY(-4px)',
                '& a': {
                    color: theme.palette.background.default
                },
                '& .icon-element': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.background.default
                },
                '& .icon-element:after': {
                    backgroundColor: theme.palette.primary.main
                }
            },
            '& .category-fig': {
                position: 'relative',
                zIndex: 1,
                borderRadius: '4px',
                transition: 'all 0.3s',
                '& .cat-img': {
                    width: '100%',
                    borderRadius: '4px'
                },
                '& .icon-element': {
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.primary.dark,
                    '&:after': {
                        display: 'none'
                    }
                },
                '& .fig-caption': {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0,
                    zIndex: 1,
                    '& .cat-fig-box': {
                        position: 'absolute',
                        top: '50%',
                        width: '100%',
                        transform: 'translateY(-50%)',
                        textAlign: 'center',
                        color: theme.palette.background.default,
                        display: 'block'
                    },
                    '& .cat__title': {
                        fontSize: '16px',
                        margin: '16px 0',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                    },
                    '& .badge': {
                        backgroundColor: 'transparent',
                        padding: '6px 11px',
                        fontWeight: 600,
                        border: `2px solid ${theme.palette.primary.main}`,
                        borderRadius: '30px',
                        transition: 'all 0.3s',
                        fontSize: '13px'
                    },
                    '&::after': {
                        position: 'absolute',
                        content: '""',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.8,
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '4px',
                        zIndex: -1,
                        transition: 'all 0.3s'
                    }
                },
                '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: '0 10px 40px rgba(82, 85, 90, 0.4)'
                }
            }
        }
    }
}));

const SimpleCard = ({ title, btnText, icon, img, href }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.root}>
            <div className="category-item">
                <figure className="category-fig">
                    <img src={img} alt="category" className="cat-img" />
                    <figcaption className="fig-caption">
                        <Link to={href} className="cat-fig-box">
                            <div className="icon-element">{icon}</div>
                            <div className="cat-content">
                                <h4 className="cat__title">{title}</h4>
                                <span className="badge">{btnText}</span>
                            </div>
                        </Link>
                    </figcaption>
                </figure>
            </div>
        </Grid>
    );
};

export default SimpleCard;
