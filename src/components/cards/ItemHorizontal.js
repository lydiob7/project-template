import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    cardImage: {
        height: '220px',
        width: '290px',
        backgroundSize: 'contain',
        margin: '10px'
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        width: '70%',
        '& .card-content': {
            display: 'flex',
            flexWrap: 'wrap',
            margin: '0 -15px',
            width: '100%',
            '& .card-content-text': {
                flex: '0 0 66.666667%',
                maxWidth: '66.666667%',
                padding: '10px',
                '& .card-meta': {
                    fontSize: '13px',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    position: 'relative',
                    paddingLeft: '39px',
                    color: '#808996',
                    '& a': {
                        color: '#808996'
                    },
                    '& span': {
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        top: '-9px',
                        left: 0,
                        color: '#fff',
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
                    color: theme.palette.secondary.main,
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
                    width: '85%'
                }
            },
            '& .card-content-btn': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '0 0 33.333333%',
                maxWidth: '33.333333%'
            }
        }
    }
}));

const ItemHorizontal = ({ item }) => {
    const classes = useStyles();

    if (!item) return null;

    const { logo, internalURI, category, title, abstract, url, btnText } = item;

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.cardImage} image={logo} />
            <CardContent className={classes.cardContent}>
                <div className="card-content">
                    <div className="card-content-text">
                        <Link to={internalURI}>
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
                    </div>
                    {btnText && (
                        <div className="card-content-btn">
                            <a target="_blank" rel="noreferrer" href={url}>
                                <Button>{btnText}</Button>
                            </a>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ItemHorizontal;
