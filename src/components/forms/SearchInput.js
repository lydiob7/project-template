import React, { useState } from 'react';

import { InputBase, makeStyles, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import { Button } from 'custom-components';

const useStyles = makeStyles((theme) => ({
    search: {
        padding: '20px 25px'
    },
    searchIcon: {
        marginRight: '10px'
    },
    form: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '10px',
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '10fr 2fr',
            gridTemplateRows: '1fr',
            gap: '20px'
        }
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: '1px solid rgba(128,137,150,.3)',
        padding: '12px 20px'
    },
    inputRoot: {
        width: '100%'
    },
    inputInput: {
        width: '100%'
    },
    searchBtn: {}
}));

const SearchInput = ({
    className,
    id,
    style,
    placeholder = 'Search...',
    onSubmit = () => {},
    onChange = () => {},
    searchIcon = true,
    searchBtn = true,
    searchBtnText = 'Search',
    ...rest
}) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (ev) => {
        ev?.preventDefault();
        onSubmit(searchValue);
    };

    const handleChange = (ev) => {
        setSearchValue(ev?.target?.value);
        onChange(ev);
    };

    return (
        <div className={className} id={id} style={style}>
            <Paper className={classes.search}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.inputWrapper}>
                        {searchIcon && (
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                        )}
                        <InputBase
                            placeholder={placeholder}
                            onChange={handleChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            {...rest}
                        />
                    </div>
                    {searchBtn && (
                        <Button classes={{ root: classes.searchBtn }} type="submit">
                            {searchBtnText}
                        </Button>
                    )}
                </form>
            </Paper>
        </div>
    );
};

export default SearchInput;
