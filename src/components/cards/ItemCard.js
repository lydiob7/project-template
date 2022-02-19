import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

import { Button } from 'custom-components';

import { parsePath } from 'utils/helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    cardImage: {
        height: '150px',
        backgroundSize: 'contain',
        margin: '10px'
    },
    cardContent: {
        width: '100%',
        padding: '10px',
        '& .card-content': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '95%',
            '& .card-meta': {
                fontSize: '13px',
                textTransform: 'capitalize',
                fontWeight: 600,
                position: 'relative',
                paddingLeft: '39px',
                color: theme.palette.text.secondary,
                '& span': {
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    top: '-9px',
                    left: 0,
                    color: theme.palette.background.default,
                    width: '33px',
                    height: '33px',
                    backgroundColor: theme.palette.primary.main,
                    lineHeight: '29px',
                    textAlign: 'center',
                    borderRadius: '50%'
                }
            },
            '& .card-title': {
                fontSize: '18px',
                color: theme.palette.text.primary,
                fontWeight: 600,
                textTransform: 'capitalize',
                marginTop: '24px',
                marginBottom: '5px',
                '& i': {
                    color: '#40cc6f',
                    '& svg': {
                        marginTop: '-3px'
                    }
                }
            },

            '& .card-sub': {
                fontSize: '15px',
                color: '#808996',
                fontWeight: 400,
                height: '70px',
                overflow: 'hidden'
            },
            '& .card-content-btn': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20px'
            }
        }
    }
}));

const ItemCard = ({ item }) => {
    const classes = useStyles();

    if (!item) return null;

    const { logo, internalURI, category, title, abstract, url, btnText } = item;

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.cardImage} image={parsePath(logo)} />
            <CardContent className={classes.cardContent}>
                <div className="card-content">
                    <Link to={parsePath(internalURI)}>
                        {category && (
                            <Typography variant="h5" className="card-meta">
                                <span>{category?.logo || category?.icon}</span> {category?.title}
                            </Typography>
                        )}
                        <Typography variant="h4" className="card-title">
                            {title}
                        </Typography>
                        <Typography variant="body1" className="card-sub">
                            {abstract}
                        </Typography>
                    </Link>
                    {btnText && (
                        <a className="card-content-btn" target="_blank" rel="noreferrer" href={url}>
                            <Button>{btnText}</Button>
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ItemCard;
