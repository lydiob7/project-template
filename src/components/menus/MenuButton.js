import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon, makeStyles, Menu, MenuItem } from '@material-ui/core';

import { Button } from 'custom-components';

import { authRoles } from 'auth';

const useStyles = makeStyles((theme) => ({
    root: {},
    dropdown: {
        top: '65px!important',
        minWidth: '150px',
        '& a, & div': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            '& li:hover': {
                backgroundColor: theme.palette.background.default
            },
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.background.default
            }
        }
    },
    link: {
        color: theme.palette.text.primary
    },
    itemIcon: {
        opacity: 0.6,
        marginRight: '5px'
    }
}));

function MenuButton({ children: title, component: Component = Button, items, onLogout, role }) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const listItems = items?.map((link, index) => {
        if (link.roles && !link.roles?.includes(authRoles[role])) return null;

        if (onLogout && link.type === 'logout')
            return (
                <div key={index}>
                    {link.icon && <Icon className={classes.itemIcon}>{link.icon}</Icon>}
                    <MenuItem onClick={onLogout}>{link.title}</MenuItem>
                </div>
            );
        else
            return (
                <Link key={index} className={classes.link} to={link.path}>
                    {link.icon && <Icon className={classes.itemIcon}>{link.icon}</Icon>}
                    <MenuItem onClick={handleClose}>{link.title}</MenuItem>
                </Link>
            );
    });

    return (
        <div className={classes.root}>
            <Component onClick={handleMenu} variant="text">
                {title}
            </Component>
            <Menu
                classes={{ paper: classes.dropdown }}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
            >
                {listItems}
            </Menu>
        </div>
    );
}

export default MenuButton;
