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
                color: '#808996',
                '& a': {
                    color: '#808996'
                },
                '& span': {
                    fontSize: '20px',
                    position: 'absolute',
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

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.cardImage} image={item?.logo} />
            <CardContent className={classes.cardContent}>
                <div className="card-content">
                    <Link to={`${process.env.PUBLIC_URL}/${item?.internalURI}`}>
                        {item?.categories && (
                            <Typography variant="h5" className="card-meta">
                                <span>{item?.category?.logo || item?.category?.icon}</span> {item?.category?.title}
                            </Typography>
                        )}
                        <Typography variant="h4" className="card-title">
                            {item?.title}
                        </Typography>
                        <Typography variant="body1" className="card-sub">
                            {item?.abstract}
                        </Typography>
                    </Link>
                    {item.btnText && (
                        <a className="card-content-btn" target="_blank" rel="noreferrer" href={item?.url}>
                            <Button>{item.btnText}</Button>
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ItemCard;
