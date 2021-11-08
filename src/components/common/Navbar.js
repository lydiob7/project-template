import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    menuBtn: {
        color: theme.palette.background.default,
        '&:focus': {
            outline: 'none'
        }
    },
    mainNavigationListItem: {
        '& .MuiButton-textPrimary': {
            color: theme.palette.background.default,
            textTransform: 'capitalize',
            '&:focus': {
                outline: 'none'
            }
        }
    },
    drawerList: {
        width: 400
    },
    drawerListTitle: {
        margin: '20px',
        fontWeight: '500'
    },
    closeMenuBtn: {
        position: 'absolute',
        right: '10px',
        top: '10px',
        '&:focus': {
            outline: 'none'
        }
    },
    listItem: {
        '& a': {
            color: 'inherit',
            textTransform: 'capitalize'
        }
    }
}));

export default function Navbar({ appTitle = '', menuItems = [] }) {
    const classes = useStyles();
    const [navOpen, setNavOpen] = useState(false);

    const mainNavigationList = () => (
        <>
            {menuItems.map((item, index) => (
                <Link className={classes.mainNavigationListItem} to={item.path} key={index}>
                    <Button variant="text">{item.title}</Button>
                </Link>
            ))}
        </>
    );

    const drawerList = () => (
        <div>
            <Typography className={classes.drawerListTitle} variant="h4">
                {appTitle}
            </Typography>
            <Divider />
            <List className={classes.drawerList}>
                {menuItems.map((item, index) => (
                    <>
                        <ListItem className={classes.listItem} button key={index} onClick={() => setNavOpen(false)}>
                            <Link to={item.path}>
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>
                        {item.dropdown && (
                            <List button>
                                {item.dropdown.map((ditem, index2) => {
                                    return (
                                        <ListItem
                                            className={classes.listItem}
                                            key={index2}
                                            onClick={() => setNavOpen(false)}
                                        >
                                            <Link to={ditem.path}>{ditem.title}</Link>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}
                    </>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Hidden mdDown>{mainNavigationList()}</Hidden>

            <Drawer anchor="left" open={navOpen} onClose={() => setNavOpen(false)}>
                <IconButton className={classes.closeMenuBtn} onClick={() => setNavOpen(false)}>
                    <CloseIcon fontSize="large" />
                </IconButton>
                {drawerList()}
            </Drawer>

            <Hidden lgUp>
                <IconButton className={classes.menuBtn} onClick={() => setNavOpen(!navOpen)}>
                    <MenuIcon fontSize="large" />
                </IconButton>
            </Hidden>
        </>
    );
}
