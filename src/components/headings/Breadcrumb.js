import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '80px 0 80px 0',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        '& .breadcrumb-content': {
            textAlign: 'center',
            '& .breadcrumb__title': {
                fontSize: '36px',
                textTransform: 'capitalize',
                fontWeight: 700,
                marginBottom: '22px',
                [theme.breakpoints.up('sm')]: {
                    fontSize: '40px'
                }
            },
            '& .breadcrumb__list li': {
                display: 'inline-block',
                textTransform: 'capitalize',
                fontSize: '15px',
                fontWeight: 500,
                position: 'relative',
                paddingRight: '8px',
                [theme.breakpoints.up('md')]: {
                    fontSize: '16px'
                },
                '&:last-child': {
                    paddingRight: 0
                },
                '& a': {
                    transition: 'all 0.3s',
                    color: theme.palette.text.primary,
                    '&:hover': {
                        color: theme.palette.primary.main
                    }
                },
                '&.active__list-item:after': {
                    position: 'absolute',
                    content: '-',
                    top: 0,
                    right: 0,
                    padding: '0 7px',
                    fontSize: '18px'
                }
            },
            '& .contact-form-action form': {
                '& .form-control': {
                    paddingLeft: '25px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    borderRadius: '30px'
                },
                '& .form-group .submit-btn': {
                    borderRadius: '0 30px 30px 0',
                    color: theme.palette.secondary.main,
                    backgroundColor: 'rgba(128, 137, 150, 0.2)',
                    paddingRight: '25px',
                    paddingLeft: '25px',
                    top: '1px',
                    right: 0,
                    lineHeight: '64px'
                },
                '.form-group .submit-btn:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff'
                }
            }
        },
        '& .category-icon svg': {
            fontSize: '4rem!important'
        }
    }
}));

function Breadcrumb({ currentPgIcon, currentPgTitle, divider = '-', parentPgTitle, parentPgLink, children }) {
    const classes = useStyles();

    return (
        <Paper component="header" className={classes.root}>
            <div className="breadcrumb-wrap">
                <Container maxWidth="md">
                    <Grid container justifyContent="center">
                        <Grid item lg={12}>
                            <div className="breadcrumb-content">
                                {currentPgIcon && <div className="category-icon">{currentPgIcon}</div>}
                                <Typography variant="h2" className="breadcrumb__title">
                                    {currentPgTitle}
                                </Typography>
                                <ul className="breadcrumb__list">
                                    <li className="active__list-item">
                                        <Link to={process.env.PUBLIC_URL}>home</Link>
                                    </li>

                                    {parentPgTitle && <li>{divider}</li>}
                                    {parentPgTitle && (
                                        <li className="active__list-item">
                                            <Link to={`${process.env.PUBLIC_URL}${parentPgLink}`}>{parentPgTitle}</Link>
                                        </li>
                                    )}

                                    <li>{divider}</li>
                                    <li>{currentPgTitle || 'Current page'}</li>
                                </ul>
                            </div>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Paper>
    );
}

export default Breadcrumb;
