import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

import { FormControl, Icon, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { SaveOutlined as SaveOutlinedIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
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
    link: {
        color: theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main
    },
    requiredSymbol: {
        color: theme.palette.error.main
    }
}));

const ToggableInput = ({
    adornment,
    control,
    handleSubmit = () => {},
    InputLabelProps,
    label,
    multiline,
    name,
    onSubmit = () => {},
    placeholder = '',
    required = false,
    style,
    type,
    value
}) => {
    const classes = useStyles({
        value: required && !value ? false : true
    });

    const [edit, setEdit] = useState(false);

    const content = () => {
        if (type === 'link')
            return (
                <a className={classes.link} target="_blank" rel="noreferrer" href={value}>
                    <Typography>{value}</Typography>
                </a>
            );
        if (type === 'tel')
            return (
                <a className={classes.link} target="_blank" rel="noreferrer" href={`tel:${value}`}>
                    <Typography>{value}</Typography>
                </a>
            );
        if (type === 'email')
            return (
                <a target="_blank" rel="noreferrer" className={classes.link} href={`mailto:${value}`}>
                    <Typography>{value}</Typography>
                </a>
            );
        if (type === 'date' && value)
            return (
                <Typography onClick={() => setEdit(true)}>
                    {new Date(value).toLocaleString('en-EN', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    })}
                </Typography>
            );
        if (type === 'location' && value)
            return (
                <div onClick={() => setEdit(true)} style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{value}</Typography>
                    <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                        location_on
                    </Icon>
                </div>
            );
        return (
            <Typography onClick={() => setEdit(true)}>
                {adornment ? adornment + ' ' : ''}
                {value}
            </Typography>
        );
    };

    return (
        <div style={style} className={classes.field} onClick={() => setEdit(true)}>
            <form
                onSubmit={handleSubmit((values) => {
                    onSubmit(values);
                    setEdit(false);
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
                    <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                        <Controller
                            name={name}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoFocus
                                    type={type === 'date' ? 'date' : 'text'}
                                    InputLabelProps={InputLabelProps}
                                    multiline={multiline}
                                    placeholder={placeholder}
                                    InputProps={{
                                        startAdornment: adornment ? (
                                            <InputAdornment position="start">{adornment}</InputAdornment>
                                        ) : null
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                ) : (
                    content()
                )}
            </form>
        </div>
    );
};

export default ToggableInput;
