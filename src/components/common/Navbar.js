import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Switch from 'components/common/Switch';
import MenuButton from 'components/menus/MenuButton';
import AuthUserCard from 'components/cards/AuthUserCard';
import AuthUserSmallCard from 'components/cards/AuthUserSmallCard';
import Logo from 'components/common/Logo';
import { logoutUser } from 'auth/store/userSlice';
import { themeDark, themeLight } from 'store/uiSlice';
import { parsePath } from 'utils/helpers';

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
            // textTransform: 'uppercase',
            fontWeight: '700',
            fontSize: '.8rem',
            '&:focus': {
                outline: 'none'
            }
        }
    },
    themeButton: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px'
    },
    subMenu: {
        top: '80px!important'
    },
    drawerList: {
        width: '100vw',
        padding: '20px',
        [theme.breakpoints.up('sm')]: {
            width: 300
        }
    },
    drawerListWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
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
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            textTransform: 'capitalize'
        }
    },
    itemLogo: {
        opacity: 0.6,
        marginRight: '5px'
    },
    logoutBtn: {
        color: 'inherit',
        textTransform: 'capitalize'
    }
}));

export default function Navbar({ menuItems = [] }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [navOpen, setNavOpen] = useState(false);
    const appInformation = useSelector(({ ui }) => ui.appInformation);
    const currentTheme = useSelector(({ ui }) => ui.theme);
    const isThemeToggable = useSelector(({ ui }) => ui.isThemeToggable);
    const userLoggedIn = useSelector(({ auth }) => auth.user.authenticated);

    const toggleTheme = () => {
        if (currentTheme === 'light') return dispatch(themeDark());
        dispatch(themeLight());
    };

    const mainNavigationList = () => {
        return (
            <>
                {menuItems?.map((item, index) => {
                    if ((item.onlyLoggedOut && userLoggedIn) || (item.onlyLoggedIn && !userLoggedIn)) return null;
                    if (item.type === 'logout' || item.type === 'user-menu') return null;

                    if (item.dropdown) {
                        return (
                            <MenuButton key={index} items={item.dropdown}>
                                {item.title}
                            </MenuButton>
                        );
                    }

                    return (
                        <Link className={classes.mainNavigationListItem} to={item.path} key={index}>
                            <Button variant="text">{item.title}</Button>
                        </Link>
                    );
                })}

                {isThemeToggable && (
                    <div className={classes.themeButton}>
                        <Icon size="small" className={classes.itemLogo}>
                            {currentTheme === 'dark' ? 'flare' : 'brightness_3'}
                        </Icon>
                        <Switch checked={currentTheme === 'dark'} onClick={toggleTheme} />
                    </div>
                )}
                {userLoggedIn && (
                    <MenuButton
                        component={AuthUserSmallCard}
                        onLogout={() => dispatch(logoutUser())}
                        items={menuItems?.filter((item) => item.type === 'logout' || item.type === 'user-menu')}
                    />
                )}
            </>
        );
    };

    const drawerList = () => (
        <div className={classes.drawerListWrapper}>
            <div>
                <Logo
                    size="small"
                    style={{ margin: '20px' }}
                    title={appInformation?.appTitle}
                    imageSrc={parsePath(appInformation?.appLogo)}
                />
                <Divider />
                {userLoggedIn && (
                    <>
                        <AuthUserCard items={menuItems?.filter((item) => item.type === 'user-menu')} />
                        <Divider />
                    </>
                )}
                <List className={classes.drawerList}>
                    {menuItems?.map((item, index) => {
                        if ((item.onlyLoggedOut && userLoggedIn) || (item.onlyLoggedIn && !userLoggedIn)) return null;

                        if (item.type === 'logout' || item.type === 'user-menu') return null;

                        if (item.dropdown) {
                            return (
                                <List button>
                                    {item.dropdown.map((ditem, index2) => {
                                        return (
                                            <ListItem
                                                className={classes.listItem}
                                                key={index2}
                                                onClick={() => setNavOpen(false)}
                                            >
                                                {ditem.icon && <Icon className={classes.itemLogo}>{ditem.icon}</Icon>}
                                                <Link to={ditem.path}>{ditem.title}</Link>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            );
                        }

                        return (
                            <ListItem className={classes.listItem} button key={index} onClick={() => setNavOpen(false)}>
                                <Link to={item.path}>
                                    {item.icon && <Icon className={classes.itemLogo}>{item.icon}</Icon>}
                                    <ListItemText primary={item.title} />
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </div>

            <div>
                <Divider />

                <List className={classes.drawerList}>
                    {isThemeToggable && (
                        <ListItem className={classes.listItem} button>
                            <Icon size="small" className={classes.itemLogo}>
                                {currentTheme === 'dark' ? 'flare' : 'brightness_3'}
                            </Icon>
                            <Switch size="small" checked={currentTheme === 'dark'} onClick={toggleTheme} />
                        </ListItem>
                    )}
                    {menuItems?.map((item, index) => {
                        if ((item.onlyLoggedOut && userLoggedIn) || (item.onlyLoggedIn && !userLoggedIn)) return null;
                        if (item.type === 'logout') {
                            return (
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    key={index}
                                    onClick={() => {
                                        setNavOpen(false);
                                        return dispatch(logoutUser());
                                    }}
                                >
                                    {item.icon && <Icon className={classes.itemLogo}>{item.icon}</Icon>}
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            );
                        }
                        return null;
                    })}
                </List>
            </div>
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
