import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import { Chip, FormControl, Icon, IconButton, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { SaveOutlined as SaveOutlinedIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    },
    field: (props) => ({
        marginBottom: '16px',
        padding: '0 16px',
        border: props.value ? 'none' : `1px solid ${theme.palette.error.main}`
    }),
    flexBetween: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: '.92rem',
        fontWeight: 500,
        marginBottom: '4px'
    },
    listItem: {
        margin: '.5rem 0'
    },
    requiredSymbol: {
        color: theme.palette.error.main
    }
}));

const ToggableSelect = ({
    control,
    handleSubmit = () => {},
    label,
    multiple,
    name,
    options = [],
    onSubmit = () => {},
    required = false,
    requiredLength = 1,
    style,
    type,
    value
}) => {
    const classes = useStyles({
        value: (required && !value) || (required && value.length < requiredLength) ? false : true
    });

    const [edit, setEdit] = useState(false);

    const contentItem = (item, index) => {
        if (item === '') return null;
        if (type === 'location')
            return (
                <div
                    onClick={() => setEdit(false)}
                    style={{ display: 'flex', alignItems: 'center' }}
                    key={item + index}
                >
                    <Typography>{item}</Typography>
                    <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                        location_on
                    </Icon>
                </div>
            );
        if (type === 'chip')
            return (
                <Chip
                    onClick={() => setEdit(false)}
                    style={{ margin: '8px' }}
                    key={item + index}
                    label={item}
                    color="primary"
                    variant="outlined"
                />
            );
        return (
            <li onClick={() => setEdit(false)} className={classes.listItem} key={item + index}>
                {item}
            </li>
        );
    };

    return (
        <div style={style} className={classes.field} onClick={() => setEdit(true)}>
            <form
                onSubmit={handleSubmit((values) => {
                    setEdit(false);
                    return onSubmit(values);
                })}
            >
                <div className={classes.flexBetween}>
                    <Typography className={classes.label}>
                        {label} {required && <span className={classes.requiredSymbol}>*</span>}
                    </Typography>

                    <div>
                        {edit && (
                            <IconButton type="submit">
                                <SaveOutlinedIcon style={{ fontSize: '1.3rem', margin: '0 4px' }} color="primary" />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={(ev) => {
                                ev.stopPropagation();
                                setEdit(!edit);
                            }}
                        >
                            <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                                {edit ? 'close' : 'edit'}
                            </Icon>
                        </IconButton>
                    </div>
                </div>
                {edit ? (
                    <>
                        <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                            <Controller
                                name={name}
                                control={control}
                                render={({ field }) => (
                                    <Select autoFocus {...field} multiple={Array.isArray(value) && multiple}>
                                        {options.map((option, index) => (
                                            <MenuItem key={option + index} value={option.value}>
                                                {option.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </>
                ) : Array.isArray(value) ? (
                    value.map(contentItem)
                ) : (
                    <Typography variant="body1">{value}</Typography>
                )}
            </form>
        </div>
    );
};

export default ToggableSelect;
