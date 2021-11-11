import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'components/common/Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '120px 0 80px 0',
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
                paddingRight: '22px',
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
        '& .category-icon': {
            fontSize: '4rem'
        }
    }
}));

function Breadcrumb({ CurrentPgIcon, CurrentPgTitle, MenuPgTitle, MenuPgLink, img, children, ParentCategory }) {
    const classes = useStyles();

    const [parentCategoryTitle, setParentCategoryTitle] = useState(null);
    const categoryLoading = useSelector(({ entities }) => entities.categories.currentCategoryLoading);
    const categoriesList = useSelector(({ entities }) => entities.categories.list);

    useEffect(() => {
        const category = categoriesList?.filter((category) => category.id?.toString() === ParentCategory?.toString());
        if (category && category.length > 0) setParentCategoryTitle(category[0].title);
    }, [categoriesList, ParentCategory]);

    return (
        <Paper component="header" className={classes.root}>
            <div className="breadcrumb-wrap">
                <Loader style={{ minHeight: '20vh' }} loading={categoryLoading} />
                {!categoryLoading && (
                    <Container maxWidth="md">
                        <Grid container justifyContent="center">
                            <Grid item lg={12}>
                                <div className="breadcrumb-content">
                                    {CurrentPgIcon && <div className="category-icon">{CurrentPgIcon}</div>}
                                    <Typography variant="h2" className="breadcrumb__title">
                                        {CurrentPgTitle}
                                    </Typography>
                                    <ul className="breadcrumb__list">
                                        <li className="active__list-item">
                                            <Link to={process.env.PUBLIC_URL}>home</Link>
                                        </li>
                                        {MenuPgTitle && (
                                            <li className="active__list-item">
                                                <Link to={`${process.env.PUBLIC_URL}${MenuPgLink}`}>{MenuPgTitle}</Link>
                                            </li>
                                        )}
                                        {parentCategoryTitle && (
                                            <li className="active__list-item">
                                                <Link to={`${process.env.PUBLIC_URL}/categories/${ParentCategory}`}>
                                                    {parentCategoryTitle}
                                                </Link>
                                            </li>
                                        )}

                                        <li>{CurrentPgTitle}</li>
                                    </ul>
                                </div>
                                {children}
                            </Grid>
                        </Grid>
                    </Container>
                )}
            </div>
        </Paper>
    );
}

export default Breadcrumb;
