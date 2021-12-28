import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

import MenuButton from 'components/menus/MenuButton';

const useStyles = makeStyles((theme) => ({
    menuBtn: {
        color: theme.palette.text.primary,
        '&:focus': {
            outline: 'none'
        }
    },
    mainNavigationListItem: {
        '& .MuiButton-textPrimary': {
            color: theme.palette.text.primary,
            textTransform: 'capitalize',
            '&:focus': {
                outline: 'none'
            }
        }
    },
    subMenu: {
        top: '80px!important'
    },
    drawerList: {
        width: '100vw',
        [theme.breakpoints.up('sm')]: {
            width: 400
        }
    },
    drawerListTitle: {
        margin: '20px',
        fontWeight: '500',
        fontSize: '1.4rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.8rem'
        }
    },
    closeMenuBtn: {
        position: 'absolute',
        right: '10px',
        top: '10px',
        '& .MuiSvgIcon-root': {
            fontSize: '1.4rem',
            [theme.breakpoints.up('sm')]: {
                fontSize: '1.8rem'
            }
        },
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

    const mainNavigationList = () => {
        return (
            <>
                {menuItems?.map((item, index) => (
                    <div key={`${item.path}${index}`}>
                        {item.dropdown ? (
                            <MenuButton items={item.dropdown}>{item.title}</MenuButton>
                        ) : (
                            <Link className={classes.mainNavigationListItem} to={item.path}>
                                <Button variant="text">{item.title}</Button>
                            </Link>
                        )}
                    </div>
                ))}
            </>
        );
    };

    const drawerList = () => (
        <div>
            <Typography className={classes.drawerListTitle} variant="h4">
                {appTitle}
            </Typography>
            <Divider />
            <List className={classes.drawerList}>
                {menuItems?.map((item, index) => (
                    <div key={`${item.path}${index}`}>
                        <ListItem className={classes.listItem} button onClick={() => setNavOpen(false)}>
                            <Link to={item.path}>
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>
                        {item.dropdown && (
                            <List>
                                {item.dropdown.map((ditem, index2) => {
                                    return (
                                        <ListItem
                                            button
                                            className={classes.listItem}
                                            key={`${ditem.path}${index2}`}
                                            onClick={() => setNavOpen(false)}
                                        >
                                            <Link to={ditem.path}>{ditem.title}</Link>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        )}
                    </div>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Hidden mdDown>{mainNavigationList()}</Hidden>

            <Drawer anchor="left" open={navOpen} onClose={() => setNavOpen(false)}>
                <IconButton className={classes.closeMenuBtn} onClick={() => setNavOpen(false)}>
                    <CloseIcon />
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
