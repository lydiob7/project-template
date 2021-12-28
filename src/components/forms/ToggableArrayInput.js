import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    field: (props) => ({
        marginBottom: '16px',
        paddingLeft: '16px',
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

const ToggableArrayInput = ({
    control = () => {},
    handleSubmit = () => {},
    label,
    multiline,
    name,
    onSubmit = () => {},
    placeholder = '',
    required = false,
    requiredLength = 1,
    style,
    type,
    value
}) => {
    const classes = useStyles({
        value: (required && !value) || (required && value.split(',').length < requiredLength) ? false : true
    });
    const [edit, setEdit] = useState(false);

    const contentItem = (item, index) => {
        if (item === '') return null;
        if (type === 'location')
            return (
                <div onClick={() => setEdit(true)} style={{ display: 'flex', alignItems: 'center' }} key={item + index}>
                    <Typography>{item}</Typography>
                    <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                        location_on
                    </Icon>
                </div>
            );
        if (type === 'chip')
            return (
                <Chip
                    onClick={() => setEdit(true)}
                    style={{ margin: '8px' }}
                    key={item + index}
                    label={item}
                    color="primary"
                    variant="outlined"
                />
            );
        return (
            <li onClick={() => setEdit(true)} className={classes.listItem} key={item + index}>
                {item}
            </li>
        );
    };

    return (
        <div style={style} className={classes.field}>
            <form onSubmit={handleSubmit((values) => onSubmit(values))}>
                <div className={classes.flexBetween}>
                    <Typography className={classes.label}>
                        {label} {required && <span className={classes.requiredSymbol}>*</span>}
                    </Typography>

                    <div>
                        {edit && (
                            <IconButton type="submit">
                                <SaveAltIcon style={{ fontSize: '1rem', margin: '0 4px' }} color="action" />
                            </IconButton>
                        )}
                        <IconButton onClick={() => setEdit(!edit)}>
                            <Icon style={{ fontSize: '1rem', margin: '0 4px' }} color="action">
                                {edit ? 'close' : 'edit'}
                            </Icon>
                        </IconButton>
                    </div>
                </div>
                {edit ? (
                    <>
                        <Typography variant="body2" color="textSecondary">
                            Separate each item with a comma (,)
                        </Typography>
                        <FormControl style={{ margin: '8px 0 16px 0' }} required fullWidth>
                            <Controller
                                name={name}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        style={{ width: '100%' }}
                                        placeholder={placeholder}
                                        multiline={multiline}
                                    />
                                )}
                            />
                        </FormControl>
                    </>
                ) : (
                    value?.split(',').map(contentItem)
                )}
            </form>
        </div>
    );
};

export default ToggableArrayInput;
