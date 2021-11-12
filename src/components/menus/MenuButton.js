import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class MenuButton extends React.Component {
    state = {
        anchorEl: null
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const title = this.props.children;
        const listItems = this.props.items?.map((link) => (
            <Link to={link.path}>
                <MenuItem onClick={this.handleClose}>{link.title}</MenuItem>
            </Link>
        ));

        return (
            <div>
                <Button onClick={this.handleMenu} variant="text">
                    {title}
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    {listItems}
                </Menu>
            </div>
        );
    }
}

export default MenuButton;
